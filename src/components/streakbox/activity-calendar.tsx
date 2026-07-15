import { ExternalLink } from "lucide-react";
import { ActivityData } from "@/lib/activity-types";

interface StreakStat {
    current: number;
    totalActiveDays: number;
}

interface ActivityCalendarProps {
    title: string;
    profileUrl: string;
    data: ActivityData | null;
    /** 5 Tailwind background classes, index 0 (no activity) -> 4 (most active). */
    colorScale: [string, string, string, string, string];
    totalLabel: string;
    streak?: StreakStat;
}

const DAY_CELL = "w-[10px] h-[10px] rounded-[2px]";

export function ActivityCalendar({
    title,
    profileUrl,
    data,
    colorScale,
    totalLabel,
    streak,
}: ActivityCalendarProps) {
    return (
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/20 transition-all duration-300">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                <div>
                    <a
                        href={profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-base font-semibold text-foreground hover:text-primary transition-colors"
                    >
                        {title}
                        <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                    </a>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        {data ? `${data.totalContributions.toLocaleString()} ${totalLabel}` : "Activity unavailable"}
                    </p>
                </div>

                {streak && (
                    <div className="flex gap-4 text-right">
                        <div>
                            <p className="text-lg font-semibold text-foreground leading-none">{streak.current}</p>
                            <p className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">
                                Day streak
                            </p>
                        </div>
                        <div>
                            <p className="text-lg font-semibold text-foreground leading-none">
                                {streak.totalActiveDays}
                            </p>
                            <p className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">
                                Active days
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {!data ? (
                <p className="text-sm text-muted-foreground py-8 text-center">
                    Couldn&apos;t load activity right now — check back later.
                </p>
            ) : (
                <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    <div className="inline-block min-w-full">
                        {/* Month labels */}
                        <div className="flex gap-[3px] mb-1">
                            {data.weeks.map((_, i) => {
                                const label = data.monthLabels.find((m) => m.weekIndex === i);
                                return (
                                    <div
                                        key={i}
                                        className="w-[10px] shrink-0 text-[10px] text-muted-foreground whitespace-nowrap overflow-visible"
                                    >
                                        {label ? label.name : ""}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Grid */}
                        <div className="flex gap-[3px]">
                            {data.weeks.map((week, wi) => (
                                <div key={wi} className="flex flex-col gap-[3px]">
                                    {week.days.map((day) => (
                                        <div
                                            key={day.date}
                                            className={`group/day relative ${DAY_CELL} ${colorScale[day.level]} transition-transform duration-150 hover:scale-125`}
                                        >
                                            <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 whitespace-nowrap rounded-md bg-popover text-popover-foreground border border-border/50 text-[11px] px-2 py-1 opacity-0 group-hover/day:opacity-100 transition-opacity duration-150 z-20 shadow-lg">
                                                {day.count} {day.count === 1 ? "activity" : "activities"} ·{" "}
                                                {formatDate(day.date)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* Legend */}
                        <div className="flex items-center gap-1.5 mt-4 text-[11px] text-muted-foreground">
                            <span>Less active</span>
                            {colorScale.map((c, i) => (
                                <div key={i} className={`${DAY_CELL} ${c}`} />
                            ))}
                            <span>More active</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function formatDate(iso: string) {
    return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
    });
}