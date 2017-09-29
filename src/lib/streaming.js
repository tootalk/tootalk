import Queue from './speech/queue.js'
import Speech from './speech/speech.js'
import Token from './token.js'
import {
  prepareRegexRule,
  displayNameFilter,
  contentFilter
} from './speech/filter.js'

let WebSocket = require('ws');

export default class Streaming {
  constructor() {
    prepareRegexRule();
    this._tl = 'public:local'
  }

  async start(speech) {
    if (this._connection) {
      this._connection.close();
    }

    this._Mastodon = await Token.getMastodon();
    this._accessToken = this._Mastodon.config.access_token;
    this._connection = await new WebSocket('ws://friends.nico/api/v1/streaming/public?access_token=' + this._accessToken + '&stream=' + this._tl);

    this._connection.onopen = function() {
      console.log('WebSocket Connected');
    };

    this._connection.onclose = function() {
      console.log('WebSocket Closed');
    }

    this._connection.onerror = function(error) {
      console.log('WebSocket Error ' + error);
    };

    let streamingThis = this;
    this._connection.onmessage = function(e) {
      const body = JSON.parse(e.data);
      const payload = JSON.parse(body.payload);
      const event = body.event;

      if (event === "delete") {
        //console.log("delete message");
      } else
      if (event === "update") {
        const userName = payload.account.username
        const displayName = payload.account.display_name;
        const content = payload.content;

        let msg = contentFilter(content);
        if (streamingThis._nameSpeak === "name") {
          msg = displayNameFilter(displayName) + "． " + msg;
        } else if (streamingThis._nameSpeak === "id") {
          msg = userName + "． " + msg;
        }

        speech.speachQueue(msg);
      }
    };
  }

  closeConnection() {
    this._connection.close();
  }

  setNameSpeak(string) {
    this._nameSpeak = string
  }

  setTL(string) {
    this._tl = string
  }
}
