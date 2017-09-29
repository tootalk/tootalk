"use strict";

const Bluebird = require('bluebird')
  , storage = Bluebird.promisifyAll(require('electron-json-storage'))
  , electron = require("electron")
  , Mastodon = require("mastodon-api")
  , redirect_url = "urn:ietf:wg:oauth:2.0:oob"
  , Settings = require("./settings.js")
  , showError = require("./error.js").showError
  , app = electron.app

import Window from "./window.js"

let mastodon;

module.exports = {
  getToken,
  getMastodon,
  drop
}

async function getMastodon(forceReLogin = false) {
  if (forceReLogin) {
    await drop();
    mastodon = null;
  }
  if (mastodon) return mastodon;
  const token = await getToken();
  mastodon = new Mastodon({
    api_url: Settings.BASE_URL,
    access_token: token.account
  });
  return mastodon;
}

async function getToken() {
  let token = await read();
  if (!token) token = await login();
  return token;
}

async function writeAccount(account) {
  return await storage.setAsync("account", account);
}

async function writeClientInfo(clientinfo) {
  return await storage.setAsync("clientinfo", clientinfo);
}

async function drop() {
  await storage.removeAsync("account");
  await storage.removeAsync("clientinfo");
}

function drop() {
  storage.remove("account", () => { });
  storage.remove("clientinfo", () => { });
}

function read() {
  return storage.getManyAsync(["account", "clientinfo"])
    .then((data, error) => {
      if (error) throw error;
      if (Object.keys(data.clientinfo).length == 0 || Object.keys(data.account).length == 0)
        return null;
      else
        return data;
    });
}

async function authAccount(url) {
  return new Promise((resolve, reject) => {
    let win = new Window({
      width: 400,
      height: 550,
      frame: true
    }, url);

    win.on("ready-to-show", (e, u) => {
      console.log(e);
    });
    win.on('navigate', (e, url) => {
      if (url.match(/\/oauth\/authorize$/)) {
        reject();
        win.close();
      }
      const match = url.match(/\/oauth\/authorize\/(.*?)$/);
      if (match) {
        resolve(match[1]);
        win.close();
      }
    }).on("closed", () => { reject(); })

  })
    .catch(() => {
      return app.quit();
    })
    .then(async token => {
      await writeAccount(token);
      return token;
    });
}

async function login() {
  let clientinfo;
  return Mastodon.createOAuthApp(Settings.BASE_URL + "/api/v1/apps", 'tootalk', 'read ')
    .then(async resp => {
      clientinfo = {
        client_id: resp.client_id,
        client_secret: resp.client_secret
      };
      await writeClientInfo(clientinfo);
      return Mastodon.getAuthorizationUrl(clientinfo.client_id, clientinfo.client_secret, Settings.BASE_URL, 'read')
    })
    .then(url => {
      return authAccount(url);
    })
    .then(code => Mastodon.getAccessToken(clientinfo.client_id, clientinfo.client_secret, code, Settings.BASE_URL))
    .then(async accessToken => {
      await writeAccount(accessToken);
      return { clientinfo, account: accessToken };
    })
}
