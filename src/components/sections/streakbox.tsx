import { getGithubActivity } from "@/lib/github-activity";
import { getLeetcodeActivity } from "@/lib/leetcode-activity";
import { ActivityCalendar } from "@/components/streakbox/activity-calendar";

// This is a server component (no "use client") — both API calls run on the
// server, so the GitHub token never reaches the browser, and both requests
// happen in parallel.

const GITHUB_USERNAME = "PranavShadow";
const LEETCODE_USERNAME = "PranavShadow";

// Grayscale, driven by the theme's own foreground token so it flips with dark/light mode.
const GITHUB_COLORS: [string, string, string, string, string] = [
    "bg-foreground/10",
    "bg-foreground/25",
    "bg-foreground/45",
    "bg-foreground/70",
    "bg-foreground",
];

// A warm accent to visually separate LeetCode from GitHub, still restrained.
const LEETCODE_COLORS: [string, string, string, string, string] = [
    "bg-foreground/10",
    "bg-amber-900/60",
    "bg-amber-700/70",
    "bg-amber-500/80",
    "bg-amber-400",
];

export async function StreakBoxSection() {
    const [github, leetcode] = await Promise.all([
        getGithubActivity(GITHUB_USERNAME),
        getLeetcodeActivity(LEETCODE_USERNAME),
    ]);

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Background Elements — matches Experience/Timeline sections */}
            <div className="absolute top-0 right-0 p-20 opacity-20 transform translate-x-1/2 -translate-y-1/2">
                <div className="w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
            </div>
            <div className="absolute bottom-0 left-0 p-20 opacity-20 transform -translate-x-1/2 translate-y-1/2">
                <div className="w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="max-w-2xl mx-auto text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                        Streakbox
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Day-to-day activity across GitHub and LeetCode.
                    </p>
                </div>

                <div className="flex flex-col gap-6">
                    <ActivityCalendar
                        title="LeetCode Activity"
                        profileUrl={`https://leetcode.com/${LEETCODE_USERNAME}`}
                        data={leetcode?.activity ?? null}
                        colorScale={LEETCODE_COLORS}
                        totalLabel="submissions in the last year"
                        streak={
                            leetcode
                                ? { current: leetcode.currentStreak, totalActiveDays: leetcode.totalActiveDays }
                                : undefined
                        }
                    />

                    <ActivityCalendar
                        title="GitHub Activity"
                        profileUrl={`https://github.com/${GITHUB_USERNAME}`}
                        data={github}
                        colorScale={GITHUB_COLORS}
                        totalLabel="contributions in the last year"
                    />
                </div>
            </div>
        </section>
    );
}