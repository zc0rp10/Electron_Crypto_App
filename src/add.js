const { remote, ipcRenderer } = require("electron");

const closeBtn = document.getElementById("closeBtn");

closeBtn.addEventListener("click", () => {
  let window = remote.getCurrentWindow();
  window.close();
});

const updateBtn = document.getElementById("updateBtn");

updateBtn.addEventListener("click", () => {
  ipcRenderer.send(
    "update-notify-value",
    document.getElementById("notifyVal").value
  );
  let window = remote.getCurrentWindow();
  window.close();
});
