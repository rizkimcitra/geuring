// variabel keys merupakan object yang berisi angka, ya benar namun fungsinya untuk me-metakan arrow keyboard, yaitu up, left, bottom, dan right

const keys = { 37: 1, 38: 1, 39: 1, 40: 1 }

// membuat fungsi global yaitu melarang browser untuk dapat scroll
function prevScroll(e) {
  e.preventDefault()
}

// fungsi ini hanya duplikasi dari fungsi sebelumnya, namun fungsi ini hanya akan dijalankan ketika arrow key ditekan pada keyboard
function prevScrollKeys(e) {
  if (keys[e.keyCode]) {
    prevScroll(e)
    return false
  }
}

const supportsPassive = true

const wheelOpt = supportsPassive ? { passive: false } : false
const wheelEvent = "onwheel" in document.body ? "wheel" : "mousewheel"

// menjalankan fungsi disable scroll, dimana event scroll pada mouusewheel, dan arrow keys tidak akan berfungsi, fungsi ini akan melakukan 4 fungsi lagi didalamnya
export function disableScroll() {
  window.addEventListener("DOMMouseScroll", prevScroll, false)
  window.addEventListener(wheelEvent, prevScroll, wheelOpt)
  window.addEventListener("touchmove", prevScroll, wheelOpt)
  window.addEventListener("keydown", prevScrollKeys, false)
}

// fungsi ini merupakan kebalikan dari disableScroll,
export function enableScroll() {
  window.removeEventListener("DOMMouseScroll", prevScroll, false)
  window.removeEventListener(wheelEvent, prevScroll, wheelOpt)
  window.removeEventListener("touchmove", prevScroll, wheelOpt)
  window.removeEventListener("keydown", prevScrollKeys, false)
}
