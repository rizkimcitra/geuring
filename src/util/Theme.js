export default function Theme() {
  const themeSwitcher = document.getElementById("darkModeToggle");
  const themeSwitcherIcon = document.getElementById("toggleIcon");
  const changeTheme = () => {
    const color = localStorage.getItem("theme");
    if (color) {
      document.documentElement.classList.add(color);
      themeSwitcherIcon.classList.remove("bx-moon");
      themeSwitcherIcon.classList.add("bx-sun");
    } else {
      document.documentElement.classList.remove("dark");
      themeSwitcherIcon.classList.add("bx-moon");
      themeSwitcherIcon.classList.remove("bx-sun");
    }
  };

  changeTheme();

  themeSwitcher.addEventListener("click", function () {
    const color = localStorage.getItem("theme");
    if (color) {
      localStorage.removeItem("theme");
      changeTheme();
    } else {
      localStorage.setItem("theme", "dark");
      changeTheme();
    }
  });
}
