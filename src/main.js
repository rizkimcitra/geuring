import axios from "axios"
import Theme from "./util/Theme"
import "./tailwind.css"
import "./component/Card.js"
;(function App() {
  const baseURL = "https://disease.sh/v3/covid-19"

  const getCase = async () => {
    try {
      const response = await axios.get(`${baseURL}/all`)
      renderData(response.data)
    } catch (err) {
      if (err) {
        if (err.response) {
          if (err.response.status === 404) {
            console.log(
              `error: tidak dapat menemukan data yang diminta🤨. \n error code: ${err.response.status}`,
            )
          } else {
            console.log(
              "error: oops.. ada sesuatu yang terjadi diserver saat ini 😭.\nmohon ulangi lagi nanti",
            )
          }
        } else {
          console.log(
            "error: tidak ada koneksi internet \nmohon periksa koneksi internet anda 😭",
          )
        }
      }
    }
  }

  const searchCase = async (country) => {
    if (country.length > 0) {
      try {
        const response = await axios.get(`${baseURL}/countries/${country}`)
        console.log(response.data)
      } catch (err) {
        let message
        if (err) {
          if (err.response) {
            if (err.response.status === 404) {
              message = "tidak dapat menemukan data yang diminta🤨"
              renderError(message)
              document.body.classList.add("overflow-y-hidden")
            } else if (err.response.status >= 500) {
              message =
                "oops. ada sesuatu yang terjadi pada server 😭, mohon ulangi lagi"
              renderError(message)
              document.body.classList.add("overflow-y-hidden")
            }
          } else {
            message =
              "oops 😭. tidak dapat tersambung dengan server. periksa koneksi internet anda"
            renderError(message)
            document.body.classList.add("overflow-y-hidden")
          }
        }
      }
    } else {
      return
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
      <span class="block text-center text-sm sm:text-base md:text-lg lg:text-xl font-semibold leading-5 my-4 text-gray-700 dark:text-gray-200">${message}</span>
      <button id="closeModal" class="grid place-items-center py-1 px-4 mx-auto text-sm sm:text-base lg:text-lg rounded-lg text-center bg-purple-500 dark:bg-gray-500 text-white dark:text-gray-200">close</button>
    </div>`
  }

  document.addEventListener("DOMContentLoaded", () => {
    Theme()
    searchCase("Indo")
    getCase()
  })
})()
