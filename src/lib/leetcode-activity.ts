import { ActivityData, ActivityWeek, buildMonthLabels, buildRecentActivityWeeks } from "./activity-types";

/**
 * Fetches a user's LeetCode submission calendar via LeetCode's (unofficial,
 * but widely used) public GraphQL endpoint. No auth token required.
 *
 * Note: this is an undocumented API — if LeetCode changes its schema this
 * will need updating. Runs server-side to avoid CORS issues in the browser.
 */

export interface LeetcodeActivity {
    activity: ActivityData;
    currentStreak: number;
    totalActiveDays: number;
}

const QUERY = `
  query userProfileCalendar($username: String!) {
    matchedUser(username: $username) {
      userCalendar {
        streak
        totalActiveDays
        submissionCalendar
      }
    }
  }
`;

// Tune these to taste — LeetCode doesn't expose quartile levels like GitHub does,
// so we bucket raw submission counts into 5 levels ourselves.
function countToLevel(count: number): 0 | 1 | 2 | 3 | 4 {
    if (count <= 0) return 0;
    if (count < 3) return 1;
    if (count < 6) return 2;
    if (count < 10) return 3;
    return 4;
}

export async function getLeetcodeActivity(username: string): Promise<LeetcodeActivity | null> {
    try {
        const res = await fetch("https://leetcode.com/graphql", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: QUERY, variables: { username } }),
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            throw new Error(`LeetCode API responded with ${res.status}`);
        }

        const json = await res.json();
        const calendar = json?.data?.matchedUser?.userCalendar;
        if (!calendar) {
            throw new Error("Unexpected LeetCode API response shape (user not found?)");
        }

        const submissionMap: Record<string, number> = JSON.parse(calendar.submissionCalendar || "{}");
        const weeks = buildRecentActivityWeeks(buildWeeksFromMap(submissionMap));
        const totalContributions = weeks.reduce(
            (sum, week) => sum + week.days.reduce((weekSum, day) => weekSum + day.count, 0),
            0
        );

        return {
            activity: {
                weeks,
                totalContributions,
                monthLabels: buildMonthLabels(weeks),
            },
            currentStreak: calendar.streak ?? 0,
            totalActiveDays: calendar.totalActiveDays ?? 0,
        };
    } catch (err) {
        console.error("[leetcode-activity] Failed to fetch:", err);
        return null;
    }
}

/** Builds a GitHub-style week grid (Sunday-start columns) for the trailing ~53 weeks. */
function buildWeeksFromMap(submissionMap: Record<string, number>): ActivityWeek[] {
    const DAY_MS = 86_400_000;
    const now = new Date();
    const todayUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

    let startUTC = todayUTC - 371 * DAY_MS; // ~53 weeks back
    startUTC -= new Date(startUTC).getUTCDay() * DAY_MS; // align back to Sunday

    const weeks: ActivityWeek[] = [];
    let week: ActivityWeek["days"] = [];

    for (let t = startUTC; t <= todayUTC; t += DAY_MS) {
        const timestampSec = Math.floor(t / 1000).toString();
        const count = submissionMap[timestampSec] ?? 0;
        const d = new Date(t);

        week.push({
            date: d.toISOString().slice(0, 10),
            count,
            level: countToLevel(count),
        });

        if (d.getUTCDay() === 6) {
            weeks.push({ days: week });
            week = [];
        }
    }

    if (week.length) weeks.push({ days: week });
    return weeks;
}