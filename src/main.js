'use strict'

import Window from "./lib/window.js"
import Token from "./lib/token.js"
import Path from "path"
import { electron, app, BrowserWindow, Menu, Tray, nativeImage, ipcMain } from "electron"

let Mastodon;
let contextMenu;
let mainWindow

app.on('window-all-closed', function(){
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  let path = 'file://' + Path.join(__dirname, '../index.html');
  Mastodon = await Token.getMastodon();
  mainWindow = new Window({
    width: 200,
    height: 80,
    x: 1100,
    y: 0,
    resizable: false,
  }, path);

  mainWindow.on('closed', function() {
    app.quit()
  });

  let tray = new Tray(nativeImage.createFromPath(__dirname + "/../icon.png"))
  contextMenu = Menu.buildFromTemplate([
    { label: "TLの選択",
      submenu: [
        { label: "ローカルタイムライン", type: 'radio', checked: true,
          click: () => {
            let submenu = contextMenu.commandsMap[Object.keys(contextMenu.commandsMap)[0]]['submenu']
            mainWindow.view.webContents.send('selectLocal', submenu.commandsMap[Object.keys(submenu.commandsMap)[0]]['checked'])
          }
        },
        { label: "連合タイムライン", type: 'radio',
          click: () => {
            let submenu = contextMenu.commandsMap[Object.keys(contextMenu.commandsMap)[0]]['submenu']
            mainWindow.view.webContents.send('selectGlobal', submenu.commandsMap[Object.keys(submenu.commandsMap)[1]]['checked'])
          }
        },
        { label: "ホーム", type: 'radio',
          click: () => {
            let submenu = contextMenu.commandsMap[Object.keys(contextMenu.commandsMap)[0]]['submenu']
            mainWindow.view.webContents.send('selectHome', submenu.commandsMap[Object.keys(submenu.commandsMap)[2]]['checked'])
          }
        },
      ]
    },
    { label: "名前の読み上げ",
      submenu: [
        { label: "読まない", type: 'radio', checked: true,
          click: () => {
            let submenu = contextMenu.commandsMap[Object.keys(contextMenu.commandsMap)[1]]['submenu']
            mainWindow.view.webContents.send('unreadName', submenu.commandsMap[Object.keys(submenu.commandsMap)[0]]['checked'])
          }
        },
        { label: "ユーザー名", type: 'radio',
          click: () => {
            let submenu = contextMenu.commandsMap[Object.keys(contextMenu.commandsMap)[1]]['submenu']
            mainWindow.view.webContents.send('readName', submenu.commandsMap[Object.keys(submenu.commandsMap)[1]]['checked'])
          }
        },
        { label: "ユーザーID", type: 'radio',
          click: () => {
            let submenu = contextMenu.commandsMap[Object.keys(contextMenu.commandsMap)[1]]['submenu']
            mainWindow.view.webContents.send('readID', submenu.commandsMap[Object.keys(submenu.commandsMap)[2]]['checked'])
          }
        },
      ]
    },
    { label: "ログアウト", click: () => { mainWindow.close(); }},
    { label: "終了", click: () => { mainWindow.close(); }},
  ])
  tray.setContextMenu(contextMenu)
})
