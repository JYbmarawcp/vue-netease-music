
export const remBase = 14


// 根据基准字号计算
// 用于静态样式
export function toRem(px) {
  return `${px / remBase}rem`
}