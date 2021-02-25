export function groupBy<T>(arr: T[], getKey: (item: T) => string): [string, T[]][] {
  return Object.entries(arr.reduce((result: { [key: string]: T[] }, item) => {
    const key = getKey(item)

    result[key] = result[key] || []

    result[key].push(item)

    return result
  }, {}))
}
