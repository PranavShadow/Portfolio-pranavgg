export type ActivityLevel = 0 | 1 | 2 | 3 | 4;

export interface ActivityDay {
    date: string; // YYYY-MM-DD
    count: number;
    level: ActivityLevel;
}

export interface ActivityWeek {
    days: ActivityDay[];
}

export interface MonthLabel {
    name: string;
    weekIndex: number;
}

export interface ActivityData {
    weeks: ActivityWeek[];
    totalContributions: number;
    monthLabels: MonthLabel[];
}

export const MONTH_NAMES = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** Keeps only the last N months of activity and includes a small partial week at the start for calendar alignment. */
export function buildRecentActivityWeeks(weeks: ActivityWeek[], monthsBack = 6): ActivityWeek[] {
    const DAY_MS = 86_400_000;
    const now = new Date();
    const todayUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

    const rangeStart = new Date(todayUTC);
    rangeStart.setUTCMonth(rangeStart.getUTCMonth() - monthsBack);
    const rangeStartUTC = Date.UTC(
        rangeStart.getUTCFullYear(),
        rangeStart.getUTCMonth(),
        rangeStart.getUTCDate()
    ) - 7 * DAY_MS;

    return weeks
        .map((week) => ({
            ...week,
            days: week.days.filter((day) => {
                const dayDate = new Date(`${day.date}T00:00:00Z`);
                const dayUTC = Date.UTC(
                    dayDate.getUTCFullYear(),
                    dayDate.getUTCMonth(),
                    dayDate.getUTCDate()
                );
                return dayUTC >= rangeStartUTC && dayUTC <= todayUTC;
            }),
        }))
        .filter((week) => week.days.length > 0);
}

/** Builds month labels positioned at the first week-column each month starts in. */
export function buildMonthLabels(weeks: ActivityWeek[]): MonthLabel[] {
    const labels: MonthLabel[] = [];
    let lastMonth = -1;

    weeks.forEach((week, i) => {
        const firstDay = week.days[0];
        if (!firstDay) return;
        const month = new Date(`${firstDay.date}T00:00:00Z`).getUTCMonth();
        if (month !== lastMonth) {
            labels.push({ name: MONTH_NAMES[month], weekIndex: i });
            lastMonth = month;
        }
    });

    return labels;
}