/**
 * 引用类型的深拷贝 
 * */ 
export function deepCopy (obj) {
  if (obj) {
    let temp = obj.constructor === Array ? [] : {}
    for (let val in obj) {
      temp[val] = typeof obj[val] == 'object' ? deepCopy(obj[val]) : obj[val]
    }
    return temp
  }
}