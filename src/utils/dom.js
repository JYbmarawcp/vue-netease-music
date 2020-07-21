

let elementStyle = document.createElement('div').style

let vendor = ( () => {
  let transformNames = {
    // safari浏览器
    webkit: 'webkitTransform',
    // Firefox浏览器
    Moz: 'MozTransform',
    // Opera浏览器
    O: 'OTransform',
    // IE
    ms: 'msTransform',
    standard: 'transform'
  }
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

export function hasParent(dom, parentDom) {
  parentDom = Array.isArray(parentDom) ? parentDom : [parentDom]
  while(dom) {
    if (parentDom.find(p => p === dom)) {
      return true
    } else {
      dom = dom.parentNode
    }
  }
}

export function scrollInto(dom) {
  dom.scrollIntoView({ behavior: "smooth" })
}

export const EMPTY_IMG = "data:image/gif;base64, R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"