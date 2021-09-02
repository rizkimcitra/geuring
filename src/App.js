import axios from "axios"
import Theme from "./util/Theme"

export default function App() {
  const baseURL = "https://disease.sh/v3/covid-19"

  const getCase = async () => {
    try {
      const response = await axios.get(`${baseURL}/all`)
      renderData(response.data)
    } catch (err) {
      const statusCode = err.response.status
      let message
      if (statusCode === 404) {
        console.log(
          `error: cannot found the data provided. \n error code: ${statusCode}`,
        )
        message = "tidak dapat menemukan data yang diminta🤨"
        renderError(message)
        document.body.classList.add("overflow-y-hidden")
      } else {
        message = "oops. ada sesuatu yang terjadi 😭, mohon ulangi lagi"
        renderError(message)
        document.body.classList.add("overflow-y-hidden")
      }
    }
  }

  const searchCase = async (country) => {
    if (country.length > 0) {
      try {
        const response = await axios.get(`${baseURL}/countries/${country}`)
        console.log(response.data)
      } catch (err) {
        const statusCode = err.response.status
        let message
        if (statusCode === 404) {
          console.log(
            `error: cannot found the data provided. \n error code: ${statusCode}`,
          )
          message = "tidak dapat menemukan data yang diminta🤨"
          renderError(message)
          document.body.classList.add("overflow-y-hidden")
        } else {
          message = "oops. ada sesuatu yang terjadi 😭, mohon ulangi lagi"
          renderError(message)
          document.body.classList.add("overflow-y-hidden")
        }
      }
    }
  }

  const renderData = (data) => {
    console.log(data)
  }

  const renderError = (message) => {
    const modal = document.getElementById("modal")
    modal.classList.toggle("scale-0")
    modal.innerHTML = ` <div>
      <div class="text-center text-3xl md:text-4xl lg:text-5xl animate-pulse text-red-500 dark:text-red-400">
        <i class='bx bx-error-circle'></i>
      </div>
      <h1 class="text-center text-sm sm:text-base md:text-lg lg:text-xl font-semibold leading-5 my-4 text-gray-700 dark:text-gray-200">${message}</h1>
      <button id="closeModal" class="grid place-items-center py-1 px-4 mx-auto text-sm sm:text-base lg:text-lg rounded-lg text-center bg-purple-500 dark:bg-gray-600 text-white dark:text-gray-200">close</button>
    </div>`
  }

  document.addEventListener("DOMContentLoaded", async () => {
    Theme()
    await getCase()
  })
}
