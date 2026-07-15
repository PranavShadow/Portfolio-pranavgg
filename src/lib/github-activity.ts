import { ActivityData, ActivityWeek, buildMonthLabels } from "./activity-types";

/**
 * Fetches a user's GitHub contribution calendar via the GraphQL API.
 *
 * Requires a GITHUB_TOKEN env var (classic PAT with no scopes needed for
 * public contribution data, or a fine-grained token with "read:user").
 * This must run server-side only — never expose the token to the client.
 */

const LEVEL_MAP: Record<string, 0 | 1 | 2 | 3 | 4> = {
    NONE: 0,
    FIRST_QUARTILE: 1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE: 3,
    FOURTH_QUARTILE: 4,
};

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

export async function getGithubActivity(username: string): Promise<ActivityData | null> {
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
        console.error(
            "[github-activity] Missing GITHUB_TOKEN env var — add one in .env.local to load GitHub activity."
        );
        return null;
    }

    try {
        const res = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: QUERY, variables: { login: username } }),
            // Cache for an hour so we don't hammer the API on every request.
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            throw new Error(`GitHub API responded with ${res.status}`);
        }

        const json = await res.json();

        if (json.errors) {
            throw new Error(json.errors[0]?.message ?? "GitHub GraphQL error");
        }

        const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar;
        if (!calendar) {
            throw new Error("Unexpected GitHub API response shape");
        }

        const weeks: ActivityWeek[] = calendar.weeks.map((week: {
            contributionDays: { date: string; contributionCount: number; contributionLevel: string }[];
        }) => ({
            days: week.contributionDays.map((day) => ({
                date: day.date,
                count: day.contributionCount,
                level: LEVEL_MAP[day.contributionLevel] ?? 0,
            })),
        }));

        return {
            weeks,
            totalContributions: calendar.totalContributions,
            monthLabels: buildMonthLabels(weeks),
        };
    } catch (err) {
        console.error("[github-activity] Failed to fetch:", err);
        return null;
    }
}