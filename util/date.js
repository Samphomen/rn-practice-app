// export function getFormattedDate(date) {
//     return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
// }

export function getFormattedDate(date) {
    return date.toIsoString().slice(0, 10)
}

export function getDateMinusDays(date, days){
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}