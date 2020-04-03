function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

module.exports = function merge(target, obj) {
  const destination = {}

  Object.keys(target).forEach(key => {
    if (key in obj) {
      if (isPlainObject(obj[key])) {
        destination[key] = merge(target[key], obj[key])
      } else {
        destination[key] = obj[key]
      }
    } else {
      destination[key] = target[key]
    }
  })

  Object.keys(obj).forEach(key => {
    if (!Object.keys(target).includes(key)) {
      destination[key] = obj[key]
    }
  })

  return destination
}