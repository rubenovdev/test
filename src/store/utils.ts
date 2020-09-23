export const arrayToMap = <T extends { _id: string }>(
  arr: Array<T>
): { [key: string]: T } =>
  arr.reduce((map: { [key: string]: T }, item: T) => {
    return {
      ...map,
      [item._id]: item,
    }
  }, {})
