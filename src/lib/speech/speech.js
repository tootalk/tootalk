import Queue from './queue'

export default class Speech {

  constructor() {
    this._queue = new Queue();

    this._voices = window.speechSynthesis.getVoices();

    this._ssu = new SpeechSynthesisUtterance();
    this._ssu.voice = this._voices[0];
    this._ssu.volume = 1.0;
    this._ssu.rate = 1.0;
    this._ssu.pitch = 1.0;

    this._ssu.lang = 'ja-JP';

    let tmpThis = this;
    // 終了時の処理
    this._ssu.onend = function(event) {
      tmpThis._queue.dequeue();

      if (tmpThis._queue.size() > 0) {
        tmpThis.speak(tmpThis._queue.peek());
      }
    }

    this._minRate = 1;
    this._maxRate = 3;
  }

  showVoices() {
    var i = 0;
    for (; i < this._voices.length; i++) {
      console.log("[" + i + "] " + this._voices[i].name + ' ' + this._voices[i].lang);
    }
  }

  showSettings() {
    console.log("-settings-");
    console.log("voice :  " + this.getVoice());
    console.log("volume : " + this.getVolume());
    console.log("rate :   " + this.getRate());
    console.log("pitch :  " + this.getPitch());
    console.log("lang :   " + this.getLang());
    console.log("text :   " + this.getText());
  }

  // queueの長さなどによって設定(読む速さなど)を変更
  changeSettings() {
    const MAX_LENGTH = 300;
    const qLength = this._queue.toString().length;

    let rate = qLength / MAX_LENGTH * this._maxRate;
    rate = Math.max(rate, this._minRate);
    rate = Math.min(rate, this._maxRate);
    this.setRate(rate);
    this.setPitch(Math.random() * 2)
  }

  speachQueue(msg) {
    if (msg.length > 0) {
      if (this._queue.size() > 0) {
        this._queue.enqueue(msg);
      } else {
        this._queue.enqueue(msg);
        this.speak(this._queue.peek());
      }
    }
  }

  speak(msg) {
    this.changeSettings();
    this.setText(msg);
    speechSynthesis.speak(this._ssu);
  }

  cancel() {
    speechSynthesis.cancel();
    this._queue.clear();
  }

  /* -- getter -- */
  getVoice() {
    return this._ssu.voice;
  }
  getVolume() {
    return this._ssu.volume;
  }
  getRate() {
    return this._ssu.rate;
  }
  getPitch() {
    return this._ssu.pitch;
  }
  getLang() {
    return this._ssu.lang;
  }
  getText() {
    return this._ssu.text;
  }
  getMaxRate() {
    return this._maxRate;
  }

  /* -- setter -- */
  setVoice(v) {
    this._ssu.voice = v;
  }
  setVolume(v) {
    this._ssu.volume = v;
  }
  setRate(v) {
    this._ssu.rate = v;
  }
  setPitch(v) {
    this._ssu.pitch = v;
  }
  setLang(v) {
    this._ssu.lang = v;
  }
  setText(v) {
    this._ssu.text = v;
  }
  setMaxRate(v) {
    this._maxRate = v;
  }
}
