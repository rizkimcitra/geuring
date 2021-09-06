import axios from "axios"
import { animationElement, theme } from "./util/theme.js"
import "regenerator-runtime"
import "./tailwind.css"
import "./component/Card.js"
import ChartUI from "./component/ChartUI.js"
import { disableScroll } from "./util/preventScroll.js"

// ini merupakan IIFE fungsi, dimana fungsi ini akan berjalan sendiri ketika dibaca oleh web browser
;(() => {
  const baseURL = "https://disease.sh/v3/covid-19"

  // membuat fungsi debounce, debounce adalah higher order function, debounce disini melakukan tugas dimana ketika user mencari data menggunakan searchbar, server tidak harus melakukan permintaan client(website ini) setiap user mengetik satu huruf, namun, fungsi ini akan bejalan dengan ketika user mengetik 1 huruf dan menunggu delay ketika user tidak mengetik selama waktu yang ditentukan
  function debounce(func, delay = 500) {
    let timer
    return () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func()
      }, delay)
    }
  }

  // fungsi getCase adalah fungsi promise async/await yang berjalan pertama kali, tugasnya mengambil data kasus dari seluruh dunia ketika website pertama kali direload,
  const getCase = async () => {
    try {
      const response = await axios.get(`${baseURL}/all`)

      // parameter pada chartUI merupakan value yang akan digunakan pada fungsi chartUI nantinya, parameter pertama adalah boolean dan kedua adalah data yang diambil dari API
      ChartUI(false, response.data)
      // ketika sudah mendapatkan data, maka selanjutnya akan memanggil funsi renderCard dimana fungsi ini menerima 1 parameter yaitu data dari API
      renderCard(response.data)
    } catch (err) {
      // Jika terjadi error, maka fungsi RenderError akan dipanggil. dan fungsi ini menerima satu parameter yang berisikan detail error yang diberikan oleh axios
      renderError(err)
    }
  }

  // fungsi getCountry adalah fungsi promise async/await yang akan berjalan ketika user mencari data dari input an yang user berikan, namun data disini harus sesuai dengan data yang tersedia pada API, jika data tidak ditemukan maka fungsi catch akan dijalankan
  // fungsi ini menerima satu parameter yang berisikan input value dari user
  const getCountry = async (reqVal) => {
    try {
      // jika input value tersebut lebih dari 0 (0 kata) dan tidak sama dengan 0(0 kata) maka permintaan data akan dilakukan oleh axios
      if (reqVal.length > 0) {
        const response = await axios.get(`${baseURL}/countries/${reqVal}`)
        // jika sudah mendapatkan data, maka kedua fungsi dibawah akan dijalankan
        // fungsi renderCountry adalah fungsi yang menimpa data pada elemen Card nantinya, dan fungsi ini menerima satu paramter yakni data dari permintaan yang sebelumnya suda dilakukan
        renderCountry(response.data)
        // selanjutnnya fungsi ChartUI akan dipanggil, namun kali ini, parameter pertama dari fungsi tersebut akan mendapatkan nilai true dan akan selalu mendapatkan nilai true, yang artinya, data dari ChartJS akan selalu diubah ketika CharJS merender data dari negara tertentu, dan parameter kedua adalah data dari permintaan yang sudah didapatkan sebelumnya oleh axios
        ChartUI(true, response.data)
      }
    } catch (err) {
      // Jika terjadi error, maka fungsi RenderError akan dipanggil. dan fungsi ini menerima satu parameter yang berisikan detail error yang diberikan oleh axios
      renderError(err)
    }
  }

  // fungsi renderCard adalah fungsi yang akan me-render komponen card, dimana fungsi ini menerima 1 parameter yang berisikan data dari API
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
    data.map((el) => {
      el.map((data) => {
        const { dataText, dataNum } = data

        let textColor =
          dataText === "active"
            ? "text-yellow-500"
            : dataText === "deaths"
            ? "text-red-500 dark:text-red-400"
            : "text-green-500"

        let cases = dataNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        cardList.innerHTML += `<card-item class="card__animate">
              <h5 class="card__item-head ${textColor}">
              ${dataText}
              </h5>
              <span id=${dataText}
                class="card__item-num"
                >${cases}</span
              >
            </card-item>`
      })
    })
  }
  // fungsi ini kurang lebih sama seperti fungsi renderCard namun fungsi ini akan selalu menimpa data sebelumnya jika ada permintaan baru dari inputan user
  const renderCountry = (datas) => {
    const cards = document.querySelectorAll("card-item")
    const countryName = document.getElementById("country__name")
    const { country, active, deaths, recovered } = datas

    countryName.innerText = `in ${country}`
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

  // fungsi ini akan berjalan jika ada error ketika melakukan permintaan ke API, seperti data tidak ditemukan, dsb.
  const renderError = (message) => {
    if (message.message !== "Network Error") {
      if (message.response) {
        if (message.response.status === 404) {
          disableScroll()
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
            oops, cannot found ${val.value}😐, please search a Country (in English)
          </p>
        </div>`
          modal.classList.toggle("scale-0")
          modal.classList.toggle("scale-100")
        } else if (message.response.status >= 500) {
          disableScroll()
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
            Something happen to the server😭, please try again later
          </p>
        </div>`
          modal.classList.toggle("scale-0")
          modal.classList.toggle("scale-100")
        }
      }
    } else {
      disableScroll()
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
            can't connect to the internet😭, please connect your computer to the internet😇 
          </p>
        </div>`
      modal.classList.toggle("scale-0")
      modal.classList.toggle("scale-100")
    }
  }

  // debounce event ini mengekekusi event debounce dan mengamati input value user dari elemen searchBar pada html
  const debounceEvent = () => {
    const searchBar = document.getElementById("search__bar")
    const inputHandler = debounce(() => {
      const { value } = searchBar
      getCountry(value)
    }, 1000)

    searchBar.addEventListener("input", () => {
      inputHandler()
    })
  }

  // melakukan event pada window, jika dokumen sudah terload, maka akan menjalankan fungsi async/await dimana fungsi ini juga akan menjalankan 4 fungsi yakni 3 dari fungsi tersebut adalah fungsi regular, dan satu lagi merupakan fungsi promise
  window.addEventListener("DOMContentLoaded", async () => {
    await getCase()
    theme()
    animationElement()
    debounceEvent()
  })
})()
