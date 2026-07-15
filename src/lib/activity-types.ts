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