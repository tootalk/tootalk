const electron = require("electron")
    , BrowserWindow = electron.BrowserWindow
    , EventEmitter = require("events").EventEmitter

class Window extends EventEmitter {
    constructor(params = {}, url = null) {
        super()

        this.id = params.id
        this.view = new BrowserWindow(params);
        this.view.openDevTools();

        if (url) this.view.loadURL(url)

        /* ready to show --------------------------------------------------- */
        this.view.once('ready-to-show', () => {
            this.view.show();
            this.send('ready', this.id)
        })

        /* closed ---------------------------------------------------------- */
        this.view.on("closed", () => {
            this.emit("closed");
            this.view = null
        })

        /* will navigate --------------------------------------------------- */
        this.view.webContents.on("will-navigate", (e, url) => {
            this.emit("navigate", e, url);
            this.emit("will-navigate", e, url);
        })

        this.view.webContents.on('did-navigate', (e, url) => {
            this.emit("navigate", e, url);
        });

        this.view.webContents.on("new-window", (e, url) => {
            this.emit("new-window", e, url);
        });

    }

  /**
   * ウィンドウを閉じる
   */
    close() {
        this.view.close()
    }

  /**
   * ウィンドウを最小化
   */
    mini() {
        this.view.minimize()
    }

  /**
   * プロセス間通信を送信
   * @param event : イベント名
   * @param data  : データ
   */
    send(event, data) {
        this.view.webContents.send(event, data)
    }

  /**
   * HTMLの読み込み
   * @param url : ファイルパス or URL
   */
    load(url) {
        this.view.loadURL(url)
    }

  /**
   * ウィンドウの位置・大きさを取得
   * @return rect
   */
    getBounds() {
        return this.view.getBounds()
    }

  /**
   * ウィンドウの位置・大きさを設定
   * @param x : x座標
   */
    setBounds(x, y, width, height) {
        this.view.setBounds({
            x: x,
            y: y,
            width: width,
            height: height
        })
    }

    setAlwaysOnTop(flag) {
        this.view.setAlwaysOnTop(flag);
    }

    isAlwaysOnTop(){
        return this.view.isAlwaysOnTop();
    }
}

export default Window
