const keys = { 37: 1, 38: 1, 39: 1, 40: 1 }

function prevScroll(e) {
  e.preventDefault()
}

function prevScrollKeys(e) {
  if (keys[e.keyCode]) {
    prevScroll(e)
    return false
  }
}

const supportsPassive = true
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true
      },
    }),
  )
} catch (e) {}

const wheelOpt = supportsPassive ? { passive: false } : false
const wheelEvent = "onwheel" in document.body ? "wheel" : "mousewheel"

export function disableScroll() {
  window.addEventListener("DOMMouseScroll", prevScroll, false)
  window.addEventListener(wheelEvent, prevScroll, wheelOpt)
  window.addEventListener("touchmove", prevScroll, wheelOpt)
  window.addEventListener("keydown", prevScrollKeys, false)
}

export function enableScroll() {
  window.removeEventListener("DOMMouseScroll", prevScroll, false)
  window.removeEventListener(wheelEvent, prevScroll, wheelOpt)
  window.removeEventListener("touchmove", prevScroll, wheelOpt)
  window.removeEventListener("keydown", prevScrollKeys, false)
}
