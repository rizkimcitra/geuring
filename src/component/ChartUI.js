import Chart from "chart.js/auto"

export default function ChartUI(hasToDestroyed, datas) {
  // membuat array baru dari obect yang berisi array multidimensional: array[[array]]
  const data = Object.entries(datas)

  // control flow chart mana yang harus di render? jika hasTodestroy false maka renderAllData yang akan ter-render jika hasToDestoryed maka renderSepecificCountry yang akan ter-render
  hasToDestroyed ? renderSpecificCountry() : renderAllData()

  function renderSpecificCountry() {
    // karena status sudah true, maka fungsi ini akan dijalankan dari atas kebawah
    // membuat array baru yang tidak berisikan data
    let arr = []
    let dataLabels = []
    let dataNum = []
    let dataForBar = []

    // looping array dari array sebelumnya yang berisi array mutlti dimensional
    for (const dataKeyVal of data) {
      // membuat object baru berisikan data dimana key dan value disesuaikan dari data yang ter-loop
      const newArr = { title: dataKeyVal[0], dataNum: dataKeyVal[1] }
      // menambahkan data object sebelumnya dengan nama variable newArr ke array kosong sebelumnya yang mempunyai variable arr
      arr.push(newArr)
    }

    // memfilter setiap data, disini dimaksudkan hanya untuk mengambil data kasus aktif, kasus kematian dan kasus sembuh
    const activeCase = arr.filter((ar) => ar.title === "active")
    const deathsCase = arr.filter((ar) => ar.title === "deaths")
    const recoveredCase = arr.filter((ar) => ar.title === "recovered")

    // membuat array baru yang berisikan array multidimensional
    const arrOfCase = [activeCase, deathsCase, recoveredCase]
    // looping arrOfCase menggunakan metode Array.prototype.map()
    arrOfCase.map((el) => {
      // setiap parameter el merepresentasikan data array of object yang berisikan [{title: 'string', dataNum: number }]

      el.map((e) => {
        // setelah el di-loop maka e akan merepresentasikan data object yang berisi {title: 'string", dataNum: number}

        // setelah mendapatkan data sebelumnya dimana e.title merepresentasikan label atau string dan menambahkan ke array kosong sebelumnya yang di tetapkan ke variable dataLabels
        // setelah mendapatkan data sebelumnya dimana e.dataNum merepresentasikan data angka atau number dan menambahkan ke array kosong sebelumnya yang di tetapkan ke variable dataNum
        dataLabels.push(e.title)
        dataNum.push(e.dataNum)

        // membuat object baru dan ditetapkan ke variable newDataForBar, data ini nantinya akan digunakan oleh ChartJS dan divisualisasikan di doughnut chart
        // object ini berisikan data angka dari setiap kasus, yakni kasus aktif, kasus meninggal dan kasus sembuh
        const newDataForBar = {
          aktif: e.dataNum,
          meninggal: e.dataNum,
          sembuh: e.dataNum,
        }
        // object yang sebelumnya dibuat akan ditambahakn ke array kosong sebelumnya yang dibuat dengan nama variable dataForBar
        dataForBar.push(newDataForBar)
      })
    })

    // mengganti chart yang sudah ada
    // pertama, mengambil elemet HTML dan tetapkan ke variable parentCanvas
    const parentCanvas = document.getElementById("parent__covid")

    // karena sebelumnya ChartJS menampilkan data seluruh dunia, maka untuk mengganti datanya, elemen dengan id covid__chart harus diahpus terlebih dahulu karena elemen ini akan diganti dengan canvas yang baru, yang nantinya akan dibuat oleh ChartJS
    document.getElementById("covid__chart").remove()

    // membuat elemen canvas dan tetapkan elemen tsb ke variable newCanvas, lalu tetapkan atribut id dengan value yang sama dari chart sebelumnya, yakni covid__chart
    const newCanvas = document.createElement("canvas")
    newCanvas.setAttribute("id", "covid__chart")
    // sesudah mengambil elemen div dengan atribut id parent__covid dan ditetapkan ke variable parentCanvas, maka langkah selanjutnya menambahkan elemen canvas yang baru saja dibuat ke elemen parentCanvas
    parentCanvas.append(newCanvas)

    // membuat chart baru
    // membuat chart baru dengan keyword new dan panggil fungsi Chart dari ChartJS dan tetapkan ket Variable newChart
    let newChart = new Chart(
      newCanvas /*newCanvas ini adalah canvas baru yang sudah dibuat tadi, newCanvas akan dikirim ke fungsi Chart sebagai elemen yang akan ditarget*/,
      // object disini adalah parameter kedua dari fungsi Chart dimana object ini digunakan untuk mengkonfigurasi data dari Chart agar visualisasi data nanti sesuai dari data API
      {
        // type doughnut merupakan tipe yang digunakan untuk canvas kali ini, sebagai visualisasi data nantinya saya memilih tipe doughnut karena tipe ini mmudah digunakan dan mudah untuk memanipulasi data, serta data Chart tidak akan 'gepeng' ketika dibuka di perangkat dengan ukuran layar lebih kecil
        type: "doughnut",
        // oject data berisikan konfigurasi visual nantinya, dimana akan berisi jumlah data kasus, yaitu kasus aktif, meninggal dan kasus sembuh.
        data: {
          // labels adalah headingnya data, label akan memberitahu data mana saja yang berkaitan
          labels: dataLabels,
          // datasets adalah array of object yang berisikan data dari Chart Nantinya,, datasets juga berfungsi untuk mengkonfigurasi hal lainnya seperti warna Chart, border Chart, dan lain sebagainya
          datasets: [
            {
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

        // options ini merupakan konfiguasi tambahan yang disediak
        options: {
          // maintain aspect ratio merupakan konfigurasi dimana size dari canvas akan relativ ke parent elemen jika diseting false dan akan sebaliknya jika diset true
          maintainAspectRatio: false,
          scales: {
            y: {
              display: "auto",
            },
          },
          plugins: {
            legend: {
              labels: {
                font: {
                  family: "Poppins",
                },
              },
            },
          },
        },
      },
    )
  }

  function renderAllData() {
    // fungsi ini akan dijalankan ketika hasToDestroyed berisikan boolean false

    // fungsi ini merupakan fungsi yang kurang lebih sama dari penjelasan diatas, hanya saja didalam fungsi ini tidak ada penghapusan elemen canvas dan membuat elemen canvas baru
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

    const arrOfCase = [activeCase, deathsCase, recoveredCase]
    arrOfCase.map((el) => {
      el.map((e) => {
        dataLabels.push(e.title)
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
    let webChart = new Chart(myChart, {
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
        plugins: {
          legend: {
            labels: {
              font: {
                family: "Poppins",
              },
            },
          },
        },
      },
    })
  }
}
