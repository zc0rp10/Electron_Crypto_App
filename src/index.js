const { BrowserWindow } = require("electron").remote;
const path = require("path");

const notifyBtn = document.getElementById("notifyBtn");

notifyBtn.addEventListener("click", e => {
  console.log("hello");
  const modalPath = path.join("file://", __dirname, "add.html");
  let win = new BrowserWindow({ width: 400, height: 320 });

  win.on("close", () => {
    win = null;
  });
  win.loadURL(modalPath);
  win.show();
});
