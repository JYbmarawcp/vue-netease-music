

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