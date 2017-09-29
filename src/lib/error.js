const Window = require("./window.js").Window
  , path = require('path')
  , electron = require("electron")

  , app = electron.app

function showError(msg) {
  return new Promise((resolve, reject) => {
    let _path = 'file://' + path.join(__dirname, '../error.html#' + msg);
    let error = new Window({
      width: 400,
      height: 550,
      frame: true
    }, _path);

    error.on("closed", () => {
      app.quit();
    })
  });
}

module.exports = { showError }
