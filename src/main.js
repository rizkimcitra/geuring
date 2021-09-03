import axios from "axios"
import Theme from "./util/Theme"
import "regenerator-runtime"
import "./tailwind.css"
import "./component/Card.js"
import ChartUI from "./component/ChartUI"
;(function App() {
  const baseURL = "https://disease.sh/v3/covid-19"

  const debounce = (func, delay = 500) => {
    let timer
    return () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func()
      }, delay)
    }
  }

  const getCase = async () => {
    try {
      const response = await axios.get(`${baseURL}/all`)
      ChartUI(false, response.data)
      renderCard(response.data)
    } catch (err) {
      renderError(err)
    }
  }

  const getCountry = async (reqVal) => {
    try {
      if (reqVal.length > 0) {
        const response = await axios.get(`${baseURL}/countries/${reqVal}`)
        renderCountry(response.data)
        ChartUI(true, response.data)
      }
    } catch (err) {
      renderError(err)
    }
  }

  const renderCard = (datas) => {
    const dataValue = Object.values(datas)
    const keyValue = Object.keys(datas)
    const arr = []
    for (let i = 0; i < dataValue.length; i++) {
      const dataNum = dataValue[i]
      const dataText = keyValue[i]
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
    if (data.length) {
      data.forEach((el) => {
        el.forEach((data) => {
          const { dataText, dataNum } = data
          let status =
            dataText === "active"
              ? "Kasus"
              : dataText === "deaths"
              ? "Meninggal"
              : "Sembuh"

          let textColor =
            dataText === "active"
              ? "text-yellow-500"
              : dataText === "deaths"
              ? "text-red-500 dark:text-red-400"
              : "text-green-500"

          let cases = dataNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          cardList.innerHTML += `<card-item>
              <h5 class="card__item-head ${textColor}">
              ${status}
              </h5>
              <span id=${dataText}
                class="card__item-num"
                >${cases}</span
              >
            </card-item>`
        })
      })
    } else {
      cardList.innerHTML = `<h5>Mohon Cek Koneksi Internet Anda!</h5>`
    }
  }

  const renderCountry = (datas) => {
    const cards = document.querySelectorAll("card-item")
    const countryName = document.getElementById("country__name")
    const { country, active, deaths, recovered } = datas

    countryName.innerText = country
    cards.forEach((card) => {
      const lastEl = card.lastElementChild
      let caseName =
        lastEl.id === "active"
          ? active
          : lastEl.id === "deaths"
          ? deaths
          : recovered

      lastEl.innerText = caseName
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    })
  }

  const renderError = (message) => {
    const noNetWork = "Network Error"
    if (message.message !== noNetWork) {
      if (message.response) {
        if (message.response.status === 404) {
          const val = document.getElementById("search__bar")
          const modal = document.getElementById("modal-error")
          const modalBody = document.getElementById("modal-body")
          modalBody.innerHTML = `<div
          class="
            grid
            place-items-center
            mx-auto
            text-6xl text-red-500
            dark:text-red-400
          "
        >
          <i class="bx bx-x-circle"></i>
        </div>
        <div class="w-full">
          <h5
            class="
              text-base
              md:text-lg
              lg:text-xl
              xl:text-3xl
              text-center
              font-semibold
              text-gray-700
              dark:text-gray-200
            "
          >
            ERROR!
          </h5>
          <p
            class="
              text-center text-xs
              sm:text-base
              lg:text-lg
              xl:text-xl
              text-gray-600
              dark:text-gray-300
            "
          >
            Tidak dapat menemukan negara ${val.value}😐, harap hanya mencari Negara saja dan dalam bahasa Inggris
          </p>
        </div>`
          modal.classList.toggle("scale-0")
          modal.classList.toggle("scale-100")
          document.body.classList.toggle("overflow-y-hidden")
        } else if (message.response.status >= 500) {
          const modal = document.getElementById("modal-error")
          const modalBody = document.getElementById("modal-body")
          modalBody.innerHTML = `<div
          class="
            grid
            place-items-center
            mx-auto
            text-6xl text-red-500
            dark:text-red-400
          "
        >
          <i class="bx bx-x-circle"></i>
        </div>
        <div class="w-full">
          <h5
            class="
              text-base
              md:text-lg
              lg:text-xl
              xl:text-3xl
              text-center
              font-semibold
              text-gray-700
              dark:text-gray-200
            "
          >
            ERROR!
          </h5>
          <p
            class="
              text-center text-xs
              sm:text-base
              lg:text-lg
              xl:text-xl
              text-gray-600
              dark:text-gray-300
            "
          >
            Telah terjadi sesuatu pada Server 😭, mohon coba lagi nanti
          </p>
        </div>`
          modal.classList.toggle("scale-0")
          modal.classList.toggle("scale-100")
          document.body.classList.toggle("overflow-y-hidden")
        }
      }
    } else {
      const modal = document.getElementById("modal-error")
      const modalBody = document.getElementById("modal-body")
      modalBody.innerHTML = `<div
          class="
            grid
            place-items-center
            mx-auto
            text-6xl text-red-500
            dark:text-red-400
          "
        >
          <i class="bx bx-x-circle"></i>
        </div>
        <div class="w-full">
          <h5
            class="
              text-base
              md:text-lg
              lg:text-xl
              xl:text-3xl
              text-center
              font-semibold
              text-gray-700
              dark:text-gray-200
            "
          >
            ERROR!
          </h5>
          <p
            class="
              text-center text-xs
              sm:text-base
              lg:text-lg
              xl:text-xl
              text-gray-600
              dark:text-gray-300
            "
          >
            Tidak dapat terubung dengan server😭, mohon periksa koneksi internet anda ya😇 
          </p>
        </div>`
      modal.classList.toggle("scale-0")
      modal.classList.toggle("scale-100")
      document.body.classList.toggle("overflow-y-hidden")
    }
  }

  window.addEventListener("DOMContentLoaded", async () => {
    await getCase()
    Theme()

    const searchBar = document.getElementById("search__bar")
    const inputHandler = debounce(() => {
      const { value } = searchBar
      getCountry(value)
    }, 1000)

    searchBar.addEventListener("input", () => {
      inputHandler()
    })
  })
})()
