import Chart from "chart.js/auto"

export default function ChartUI(hasToDestroyed, datas) {
  const data = Object.entries(datas)
  hasToDestroyed ? RenderSpecificCountry() : renderAllData()

  function RenderSpecificCountry() {
    let arr = []
    let dataLabels = []
    let dataNum = []
    let dataForBar = []
    for (const dataKeyVal of data) {
      const newArr = { title: dataKeyVal[0], dataNum: dataKeyVal[1] }
      arr.push(newArr)
    }

    const activeCase = arr.filter((ar) => ar.title === "active")
    const deathsCase = arr.filter((ar) => ar.title === "deaths")
    const recoveredCase = arr.filter((ar) => ar.title === "recovered")

    const a = [activeCase, deathsCase, recoveredCase]
    a.map((el) => {
      el.map((e) => {
        let label =
          e.title === "active"
            ? "aktif"
            : e.title === "deaths"
            ? "meninggal"
            : "sembuh"
        dataLabels.push(label)
        dataNum.push(e.dataNum)
        const newDataForBar = {
          aktif: e.dataNum,
          meninggal: e.dataNum,
          sembuh: e.dataNum,
        }
        dataForBar.push(newDataForBar)
      })
    })

    const parentCanvas = document.getElementById("parent__covid")
    document.getElementById("covid__chart").remove()

    const newCanvas = document.createElement("canvas")
    newCanvas.setAttribute("id", "covid__chart")
    parentCanvas.append(newCanvas)

    var newChart = new Chart(newCanvas, {
      type: "doughnut",
      data: {
        labels: dataLabels,
        datasets: [
          {
            label: "Data",
            data: dataNum,
            backgroundColor: [
              "rgba(255, 159, 64, 0.5)",
              "rgba(255, 99, 132, 0.5)",
              "rgba(75, 192, 192, 0.5)",
            ],
            borderColor: [
              "rgba(255, 159, 64, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            display: "auto",
          },
        },
      },
    })
  }

  function renderAllData() {
    let arr = []
    let dataLabels = []
    let dataNum = []
    let dataForBar = []
    for (const dataKeyVal of data) {
      const newArr = { title: dataKeyVal[0], dataNum: dataKeyVal[1] }
      arr.push(newArr)
    }

    const activeCase = arr.filter((ar) => ar.title === "active")
    const deathsCase = arr.filter((ar) => ar.title === "deaths")
    const recoveredCase = arr.filter((ar) => ar.title === "recovered")

    const a = [activeCase, deathsCase, recoveredCase]
    a.map((el) => {
      el.map((e) => {
        let label =
          e.title === "active"
            ? "aktif"
            : e.title === "deaths"
            ? "meninggal"
            : "sembuh"
        dataLabels.push(label)
        dataNum.push(e.dataNum)
        const newDataForBar = {
          aktif: e.dataNum,
          meninggal: e.dataNum,
          sembuh: e.dataNum,
        }
        dataForBar.push(newDataForBar)
      })
    })
    const myChart = document.getElementById("covid__chart")
    var webChart = new Chart(myChart, {
      type: "doughnut",
      data: {
        labels: dataLabels,
        datasets: [
          {
            label: "Data",
            data: dataNum,
            backgroundColor: [
              "rgba(255, 159, 64, 0.5)",
              "rgba(255, 99, 132, 0.5)",
              "rgba(75, 192, 192, 0.5)",
            ],
            borderColor: [
              "rgba(255, 159, 64, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            display: "auto",
          },
        },
      },
    })
  }
}
