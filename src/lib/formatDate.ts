export function formatDateTimeWithAt(date: Date): string {
    const weekday = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date)
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date)
    const day = new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(date)
    const year = new Intl.DateTimeFormat("en-US", { year: "numeric" }).format(date)
    const time = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    }).format(date)

    return `${weekday}, ${month} ${day}, ${year} at ${time}`
}
export function shorthandFormatDateTime(date: Date): string {
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date)
    const day = new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(date)
    const year = new Intl.DateTimeFormat("en-US", { year: "numeric" }).format(date)
    const time = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    }).format(date)

    return `${month} ${day}, ${year} at ${time}`
}
