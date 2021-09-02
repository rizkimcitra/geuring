import axios from "axios"
import Theme from "./util/Theme"
import "regenerator-runtime"
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
          } else if (err.response.status >= 500) {
            console.log(
              "error: oops.. ada sesuatu yang terjadi diserver saat ini 😭.\nmohon ulangi lagi nanti",
            )
          } else {
            console.log(
              "error: tidak ada koneksi internet \nmohon periksa koneksi internet anda 😭",
            )
          }
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
    }
  }

  const renderData = (datas) => {
    const actData = Object.values(datas)
    const key = Object.keys(datas)
    const arr = []
    for (let i = 0; i < actData.length; i++) {
      const dataNum = actData[i]
      const dataText = key[i]
      const el = { dataNum, dataText }
      arr.push(el)
    }

    const dataActive = arr
      .filter((el) => {
        return el.dataText === "active"
      })
      .map((e) => {
        return e
      })

    const dataDeaths = arr
      .filter((el) => {
        return el.dataText === "deaths"
      })
      .map((e) => e)

    const dataRecovered = arr
      .filter((el) => {
        return el.dataText === "recovered"
      })
      .map((e) => e)

    const data = [dataActive, dataDeaths, dataRecovered]

    const cardList = document.getElementById("card__list")
    data.forEach((el) => {
      el.forEach((data) => {
        const { dataText, dataNum } = data
        let status =
          dataText === "active"
            ? "kasus aktif"
            : dataText === "deaths"
            ? "meninggal"
            : "sembuh"

        let cases = dataNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        cardList.innerHTML += `<div
              class="
                flex
                justify-center
                flex-col
                w-full
                h-20
                px-4
                shadow-md
                dark:shadow-none
                rounded-md
                bg-white
                dark:bg-gray-700
              "
            >
              <h5
                class="
                  text-base
                  sm:text-lg
                  xl:text-xl
                  font-semibold
                  text-gray-700
                  dark:text-gray-200
                "
              >
              ${status}
              </h5>
              <span
                class="text-sm sm:text-base text-gray-600 dark:text-gray-300"
                >${cases}</span
              >
            </div>`
      })
    })
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
    getCase()
  })
})()
