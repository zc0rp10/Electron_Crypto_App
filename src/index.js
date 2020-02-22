const { BrowserWindow } = require("electron").remote;
const { ipcRenderer } = require("electron");

const axios = require("axios");

const notifyBtn = document.getElementById("notifyBtn");
let price = document.querySelector("h1");
let targetPrice = document.getElementById("targetPrice");
let targetPriceVal;

const notification = {
  title: "BTC Alert",
  body: "BTC just beat your target price!",
  icon: "../assets/images/btc.png"
};

const getBTC = () => {
  axios
    .get(
      "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=EUR"
    )
    .then(res => {
      const cryptos = res.data.BTC.EUR;
      price.innerHTML = "€" + cryptos.toLocaleString("en");

      if (targetPriceVal < res.data.BTC.EUR) {
        const myNotification = new window.Notification(
          notification.title,
          notification
        );
      }
    });
};

getBTC();
setInterval(getBTC, 10000);

notifyBtn.addEventListener("click", e => {
  win = new BrowserWindow({
    width: 400,
    height: 200,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true
    }
  });
  //win.webContents.openDevTools();
  win.on("close", () => {
    win = null;
  });
  win.loadFile("./src/add.html");
  win.show();
});

ipcRenderer.on("targetPriceVal", (e, arg) => {
  targetPriceVal = Number(arg);
  targetPrice.innerHTML = " €" + targetPriceVal.toLocaleString("en");
});
