const axiosBase = require('axios')
const fs = require("fs");

// urlと検索パラメータを保管
//const weeklyURL = 'https://api.syosetu.com/novelapi/api/?genre=201&order=weeklypoint&of=t-n-w-s-g-k-gf-gl-l-gp-wp-mp-qp-yp-f-nu';
//const monthlyURL = 'https://api.syosetu.com/novelapi/api/?genre=201&order=monthlypoint&of=t-n-w-s-g-k-gf-gl-l-gp-wp-mp-qp-yp-f-nu';
const url = 'https://api.syosetu.com/novelapi/api/';
const weeklyURL = '?genre=201&order=weeklypoint&of=t-n-w-s-k-gf-gl-l-nu';
const monthlyURL = '?genre=201&order=monthlypoint&of=t-n-w-s-k-gf-gl-l-nu';

const axios = axiosBase.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    "User-Agent": "Mozilla/5.0",
  },
  responseType: 'json'
});

let outputText = null

const fileOutput = (text) => {

  // weekly取得時は出力せずreturn
  if(outputText === null) {
    fs.writeFileSync("output.txt", '')
    outputText = text;
    return}

  outputText = (outputText + text)
  const arrText = outputText.split('\\n')
  console.log(arrText)

  try {
    for(let txt of arrText) {
      fs.appendFile("output.txt",txt+"\r\n",()=>{})
  }

    console.log("write end")
  } catch (e) {
    console.log(e)
  }
}

const narouListGet = (adress) =>
  axios.get("/" + adress).then((data) => fileOutput(JSON.stringify(data.data)))
    // {
    //   uri: adress,
    //   headers: {
    //     "Content-type": "application/json",
    //     "User-Agent": "Mozilla/5.0",
    //   },
    //   json: true,
    // },
    // function (err, req, data) {
    //   fileOutput(data)
    // }
  //)

  narouListGet(weeklyURL)
  narouListGet(monthlyURL)
