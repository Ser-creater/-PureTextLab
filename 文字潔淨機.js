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
  "!": "！", "?": "？", ",": "，", ".": "。",
  ":": "：", ";": "；", "(": "（", ")": "）",
  "[": "【", "]": "】", "{": "｛", "}": "｝",
  "\"": "＂", "'": "＇", "<": "＜", ">": "＞",
  "/": "／", "\\": "＼", "|": "｜", "&": "＆",
  "#": "＃", "%": "％", "*": "＊", "=": "＝",
  "+": "＋", "-": "－", "@": "＠", "^": "＾",
  "`": "‵", "~": "～"
};

function replaceWithHighlight(text) {
  // 替換半形標點為全形標點
  for (let mark in punctuationMap) {
    const full = punctuationMap[mark];
    const regex = new RegExp(`\\${mark}`, 'g');
    text = text.replace(regex, full);
  }

  // 替換半形空格為全形空格（可選，加強對齊）
  text = text.replace(/ /g, '　');

  // 用字替換並加紅色標示
  for (let wrong in wordMap) {
    const correct = wordMap[wrong];
    const regex = new RegExp(wrong, 'g');
    text = text.replace(regex, `<span class="highlight">${correct}</span>`);
  }

  return text;
}

function checkAndReplace() {
  const input = document.getElementById('textInput').value;
  const result = replaceWithHighlight(input);
  document.getElementById('result').innerHTML = result;
}
