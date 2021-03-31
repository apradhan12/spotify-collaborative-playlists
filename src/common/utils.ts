const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;

export function secondsToMinutesString(seconds: number) {
    return `${Math.floor(seconds / SECONDS_PER_MINUTE)}:${(seconds % SECONDS_PER_MINUTE).toString().padStart(2, "0")}`;
}

export function secondsToHoursString(seconds: number) {
    return `${Math.floor(seconds / (SECONDS_PER_MINUTE * MINUTES_PER_HOUR))} hr ${(Math.floor(seconds % (SECONDS_PER_MINUTE * MINUTES_PER_HOUR) / SECONDS_PER_MINUTE))} min`;
}

export function sum(nums: number[]) {
    return nums.reduce((a, b) => a + b, 0)
}
