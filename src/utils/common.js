// export function pad(num, n=2) {
//   let len
// }

export function isDef(v) {
  return v !== undefined && v !== null
}

export function formatNumber(number) {
  number = Number(number) || 0
  return number > 100000 ? `${Math.round(number / 10000)}万` : number
}