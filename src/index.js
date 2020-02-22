const { BrowserWindow } = require("electron").remote;
const path = require("path");
const axios = require("axios");

const notifyBtn = document.getElementById("notifyBtn");
let price = document.querySelector("h1");
let targetPrice = document.getElementById("targetPrice");

const getBTC = () => {
  axios
    .get(
      "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=EUR"
    )
    .then(res => {
      const cryptos = res.data.BTC.EUR;
      price.innerHTML = "€" + cryptos.toLocaleString("en");
    });
};

getBTC();
setInterval(getBTC, 30000);

notifyBtn.addEventListener("click", e => {
  const modalPath = path.join("file://", __dirname, "add.html");
  let win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },

    width: 400,
    height: 200,
    frame: false,
    alwaysOnTop: true
  });
  //win.webContents.openDevTools();
  win.on("close", () => {
    win = null;
  });
  win.loadURL(modalPath);
  win.show();
});
