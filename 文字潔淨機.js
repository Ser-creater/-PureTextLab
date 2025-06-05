const wordMap = {
  "説": "說", "為": "爲", "做": "作", "裡": "裏", "唯": "惟", "預": "豫",
  "份": "分", "秘": "祕", "群": "羣", "峰": "峯", "啟": "啓",
  "餵": "餧", "嚐": "嘗", "紀": "記", "吃": "喫", "唸": "念",
  "既": "旣", "即": "卽", "略": "畧", "唇": "脣", "鬥": "鬬",
  "祢": "你", "啊": "阿", "喔": "哦", "哪": "那", "什": "甚",
  "著": "着", "夠": "彀", "嗎": "麼", "吧": "罷", "針": "鍼",
  "才": "纔", "摻雜": "攙雜", "提到": "題到", "提醒": "題醒",
  "撒旦": "撒但", "愛宴": "愛筵", "哈利路亞": "阿利路亞",
  "軟弱": "輭弱", "其它": "其他", "掛慮": "罣慮", "翻譯": "繙譯",
  "耽延": "躭延", "顫抖": "戰抖", "合適": "合式", "連結": "聯結",
  "憤怒": "忿怒", "模仿": "模倣", "樹幹": "樹榦", "消滅": "銷滅",
  "折被子": "摺被子", "警醒": "儆醒", "異像": "異象", "託負": "託付",
  "服侍": "服事"
};

const punctuationMap = {
  ',': '，', '.': '。', '?': '？', '!': '！', ':': '：',
  ';': '；', '"': '”', '\'': '’', '(': '（', ')': '）'
};

const digitMap = {
  '0': '〇', '1': '一', '2': '二', '3': '三', '4': '四',
  '5': '五', '6': '六', '7': '七', '8': '八', '9': '九'
};

function toFullwidthPunct(text) {
  text = text.replace(/\.{3}/g, '⋯⋯');
  return text.replace(/[,\.?!:;"'()]/g, ch => punctuationMap[ch] || ch);
}

function toChineseDate(text) {
  return text.replace(/(\d{4})年(\d{1,2})月(\d{1,2})日/g, (_, y, m, d) => {
    const yStr = [...y].map(c => digitMap[c]).join('');
    const mStr = [...m].map(c => digitMap[c]).join('');
    const dStr = [...d].map(c => digitMap[c]).join('');
    return `<span class="number">${yStr}年${mStr}月${dStr}日</span>`;
  });
}

function toChineseNumber(text) {
  return text.replace(/(\d+)(個|位|人|件|張|本|把|輛|架|艘|週|天|小時|分|秒|歲|名|塊|顆|碗|杯|瓶|罐|回|趟|遍)/g,
    (_, num, unit) => `<span class="number">${num}${unit}</span>`);
}

function convertChapterVerse(text) {
  return text.replace(/第(\d+)章第(\d+)節/g, (_, chap, sect) => {
    const chapCn = [...chap].map(c => digitMap[c] || c).join('');
    const sectCn = [...sect].map(c => digitMap[c] || c).join('');
    return `<span class="number">第${chapCn}章第${sectCn}節</span>`;
  });
}

function replaceGodPronoun(text) {
  return text.replace(/(神|主)(.{0,10}?)他/g, (match, god, middle) => {
    return god + middle + '<span class="highlight">祂</span>';
  });
}

function replaceWithHighlight(text) {
  // 用字替換
  for (let wrong in wordMap) {
    const correct = wordMap[wrong];
    const regex = new RegExp(wrong, 'g');
    text = text.replace(regex, `<span class="highlight">${correct}</span>`);
  }

  // 神／主後接「他」 → 祂
  text = replaceGodPronoun(text);

  // 「內文」標示
  text = text.replace(/「([^」]+?)」/g, '「<span class="highlight">$1</span>」');

  // 說話後內容 → 『內文』
  text = text.replace(/(?:說|：)\s*「([^」]+?)」/g, match => {
    return match.replace(/「([^」]+?)」/, '『<span class="highlight">$1</span>』');
  });

  // 日期格式
  text = toChineseDate(text);

  // 數字＋量詞標示
  text = toChineseNumber(text);

  // 章節格式轉換
  text = convertChapterVerse(text);

  // 標點符號轉換
  text = toFullwidthPunct(text);

  return text;
}

function checkAndReplace() {
  const input = document.getElementById('textInput').value;
  console.log("原始輸入：", input);
  const result = replaceWithHighlight(input);
  console.log("處理後結果：", result);
  document.getElementById('result').innerHTML = result;
}