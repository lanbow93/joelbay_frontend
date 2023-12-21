export function dateConverter(date: string) {
    const postedDate = new Date(date)

    return postedDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

type listingObject = {
    brand: string
    category: string
    condition: string
}
export function uniqueObjectArrayList(
    objectArrayToCheck: Array<listingObject>,
    keyToCheck: 'brand' | 'category' | 'condition'
) {
    let arrayOfUniques: string[] = []
    for (let i = 0; i < objectArrayToCheck.length; i++) {
        if (!arrayOfUniques.includes(objectArrayToCheck[i][keyToCheck])) {
            arrayOfUniques.push(objectArrayToCheck[i][keyToCheck])
        }
    }
    return arrayOfUniques
}
