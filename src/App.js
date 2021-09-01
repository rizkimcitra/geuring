import axios from "axios"
import Theme from "./util/Theme"

export default function App() {
  Theme()

  const baseURL = "https://disease.sh/v3/covid-19"

  const getCase = async () => {
    try {
      const responses = await axios.get(`${baseURL}/all`)
      console.log(responses.data)
    } catch (err) {
      console.log(err)
    }
  }

  const renderRecipe = (recipes) => {
    const elem = document.getElementById("food__list")

    recipes.map((recipe) => {
      const { id, name, image, content } = recipe

      elem.innerHTML += `<div data-recipeID="${id}" class="w-full shadow-md rounded-md bg-white dark:bg-gray-700">
        <div class="grid place-items-center w-full p-2 overflow-hidden">
          <img
            class="w-full rounded-md transform translate-y-1/2 opacity-0 transition-all duration-1000"
            data-lazy="${image}"
            alt="image_recipe"
          />
        </div>
        <div class="w-full px-2 pb-2">
          <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-100">${name}</h2>
          <p class="text-sm font-normal text-gray-600 dark:text-gray-200">
            ${content}
          </p>
        </div>
      </div>`
    })
  }

  const imageOptimization = () => {
    const target = document.querySelectorAll("img")

    const lazyLoad = (target) => {
      const lazyImage = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target
            const src = img.getAttribute("data-lazy")
            img.setAttribute("src", src)
            img.classList.remove("translate-y-1/2")
            img.classList.add("translate-y-0")
            img.classList.remove("opacity-0")

            observer.disconnect()
          }
        })
      })
      lazyImage.observe(target)
    }
    target.forEach(lazyLoad)
  }

  document.addEventListener("DOMContentLoaded", async () => {
    await getCase()
  })
}
