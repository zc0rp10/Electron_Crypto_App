const path = require("path");
const remote = require("electron").remote;

const closeBtn = document.getElementById("closeBtn");

closeBtn.addEventListener("click", e => {
  let window = remote.getCurrentWindow();
  window.close();
});
