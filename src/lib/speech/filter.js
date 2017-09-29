let ruleReg = [];

export function prepareRegexRule() {
  let fs = require('fs');

  let txt = fs.readFileSync(__dirname + '/../../../dic/dictionary.csv', 'utf-16le');

  let tmp = txt.split('\n');

  let ruleArr = [];
  for (let i = 0; i < tmp.length; i++) {
    ruleArr[i] = tmp[i].split("\t");
    ruleReg[i] = [];
  }

  for (let i = 0; i < ruleArr.length; i++) {
    if (ruleArr[i].length === 4) {
      ruleReg[i][0] = new RegExp(ruleArr[i][2], 'g');
      ruleReg[i][1] = ruleArr[i][3].trim();
    } else {
      ruleReg.push(null);
    }
  }

}

export function displayNameFilter(str) {
  return contentFilter(str);
}

export function contentFilter(str) {
  // リンク削除
  str = str.replace(
    /<a.*?<\/a>/g,
    ''
  );

  // HTMLタグ削除
  str = str.replace(
    /<(".*?"|'.*?'|[^'"])*?>/g,
    ''
  );

  // URL削除
  str = str.replace(
    /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/g,
    ''
  );

  // カスタム絵文字削除
  str = str.replace(
    /:..*:/g,
    ''
  );

  // わらわら に変換
  str = str.replace(
    /[wWｗＷ]{2,}/g,
    'わらわら'
  );

  // 下から優先度順
  for (let i = ruleReg.length - 1; i >= 0; i--) {
    if (ruleReg[i] !== null) {
      let preStr = str;
      str = str.replace(ruleReg[i][0], ruleReg[i][1]);
    }
  }

  return str;
}
