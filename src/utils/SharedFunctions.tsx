export function dateConverter(date: string) {
    const postedDate = new Date(date)

    return postedDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}
