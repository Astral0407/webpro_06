"use strict";

const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let vocaloid = [
  { id:1, url:"sm15630734", name:"千本桜", plays:"1843万", day:"2011/9/17", composer:"黒うさ" ,lyricist:"黒うさ",illustrator:"一斗まる"},
  { id:2, url:"sm1715919", name:"メルト", plays:"1685万", day:"2007/12/7", composer:"ryo" ,lyricist:"ryo",illustrator:"119"},
  { id:3, url:"sm10759623", name:"ワールズエンド・ダンスホール", plays:"1588万", day:"2010/5/18", composer:"wowaka" ,lyricist:"wowaka",illustrator:"wowaka"},
  { id:4, url:"sm31606995", name:"砂の惑星", plays:"1219万", day:"2017/7/21",composer:"ハチ" ,lyricist:"ハチ",illustrator:"南方研究所"},
  { id:5, url:"sm31685272", name:"ヒバナ", plays:"1117万", day:"2017/8/4", composer:"DECO*27" ,lyricist:"Mes",illustrator:"八三"},
  { id:6, url:"sm20244918", name:"ロストワンの号哭", plays:"1040万", day:"2013/3/4", composer:"Neru" ,lyricist:"Neru",illustrator:"456"},
  { id:7, url:"sm33624822", name:"ベノム", plays:"1071万", day:"2018/8/2", composer:"かいりきベア",lyricist:"かいりきベア" ,illustrator:"のう"},
  { id:8, url:"sm17520775", name:"六兆年と一夜物語", plays:"1194万", day:"2012/4/11", composer:"kemu",lyricist:"kemu" ,illustrator:"ハツ子"},
  { id:9, url:"sm15751190", name:"カゲロウデイズ", plays:"943万", day:"2011/9/30", composer:"じん",lyricist:"じん" ,illustrator:"しづ"},
  { id:10, url:"sm43708803", name:"メズマライザー", plays:"964万", day:"2024/4/27", composer:"サツキ",lyricist:"サツキ" ,illustrator:"channel"},
];

// 一覧
app.get("/vocaloid", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('vocaloid', {data: vocaloid} );
});

// Create
app.get("/vocaloid/create", (req, res) => {
  res.redirect('/public/vocaloid.html');
});

// Read
app.get("/vocaloid/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = vocaloid[ number ];
  res.render('vocaloid_detail', {id: number, data: detail} );
});

// Delete
app.get("/vocaloid/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;

  // 配列範囲チェック
  if (!vocaloid[number]) {
    return res.status(404).send("指定された曲データが存在しません。");
  }

  const detail = vocaloid[number];

  // 削除確認ページを表示
  res.render('vocaloid_delete', { id: number, data: detail });
});

// Delete (Execute)
app.post("/vocaloid/delete/:number", (req, res) => {
  const number = req.params.number;

  // 存在チェック
  if (!vocaloid[number]) {
    return res.status(404).send("指定された曲データが存在しません。");
  }

  // 削除実行
  vocaloid.splice(number, 1);

  res.redirect('/vocaloid');
});




// Create
app.post("/vocaloid", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = vocaloid.length + 1;
  const url = req.body.url;
  const name = req.body.name;
  const plays = req.body.plays;
  const day = req.body.day;
  const composer = req.body.composer;
  const lyricist = req.body.lyricist;
  const illustrator = req.body.illustrator;
  vocaloid.push( { id: id, url: url, name: name, plays: plays, day: day, composer: composer, lyricist:lyricist, illustrator:illustrator } );
  console.log( vocaloid );
  res.render('vocaloid', {data: vocaloid} );
});

// Edit
app.get("/vocaloid/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = vocaloid[ number ];
  res.render('vocaloid_edit', {id: number, data: detail} );
});

// Update
app.post("/vocaloid/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  vocaloid[req.params.number].url = req.body.url;
  vocaloid[req.params.number].name = req.body.name;
  vocaloid[req.params.number].plays = req.body.plays;
  vocaloid[req.params.number].day = req.body.day;
  vocaloid[req.params.number].composer = req.body.composer;
  vocaloid[req.params.number].lyricist = req.body.lyricist;
  vocaloid[req.params.number].illustrator = req.body.illustrator;
  console.log( vocaloid );
  res.redirect('/vocaloid' );
});

let element = [
  { id:1, number:1, name:"水素", symbol:"H", amount:1.00794, state:"気体" ,information:"最も軽い元素で，宇宙で最も多く存在する"},
  { id:2, number:2, name:"ヘリウム", symbol:"He", amount:4.00260, state:"気体" ,information:"空気より軽く，無色・無臭で化学的に非常に安定した希ガス元素"},
  { id:3, number:3, name:"リチウム", symbol:"Li", amount:6.941, state:"固体" ,information:"最も軽い金属で、銀白色のアルカリ金属"},
  { id:4, number:4, name:"ベリリウム", symbol:"Be", amount:9.01218,state:"固体" ,information:"軽量で高強度な金属元素で，緑柱石の主成分"},
  { id:5, number:5, name:"ホウ素", symbol:"B", amount:10.81, state:"固体" ,information:"単体は高融点かつ高沸点な硬くて脆い固体であり，金属元素と非金属元素の中間の性質を示す半金属"},
  { id:6, number:6, name:"炭素", symbol:"C", amount:12.01, state:"固体" ,information:"単体・化合物両方においてきわめて多様な形状をとることができる"},
  { id:7, number:7, name:"窒素", symbol:"N", amount:14.007, state:"気体",information:"空気の約78%を占める無色無臭の気体で，常温で非常に安定した不活性ガス" },
  { id:8, number:8, name:"酸素", symbol:"O", amount:15.9994, state:"気体",information:"空気の約21%を占める無色無臭の気体で，生物が呼吸してエネルギーを作るのに不可欠，また物が燃えるのを助ける性質を持つ" },
  { id:9, number:9, name:"フッ素", symbol:"F", amount:18.9984, state:"気体",information:"自然界に広く存在する必須ミネラル，またはその単体" },
  { id:10, number:10, name:"ネオン", symbol:"Ne", amount:20.180, state:"気体",information:"無色で反応性が低い気体で，高電圧をかけると特徴的な赤橙色に輝く" },
];

// 一覧
app.get("/element", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('element', {data: element} );
});

// Create
app.get("/element/create", (req, res) => {
  res.redirect('/public/element.html');
});

// Read
app.get("/element/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = element[ number ];
  res.render('element_detail', {id: number, data: detail} );
});

// Delete
app.get("/element/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;

  // 配列範囲チェック
  if (!element[number]) {
    return res.status(404).send("指定された元素データが存在しません。");
  }

  const detail = element[number];

  // 削除確認ページを表示
  res.render('element_delete', { id: number, data: detail });
});

// Delete (Execute)
app.post("/element/delete/:number", (req, res) => {
  const number = req.params.number;

  // 存在チェック
  if (!element[number]) {
    return res.status(404).send("指定された元素データが存在しません。");
  }

  // 削除実行
  element.splice(number, 1);

  res.redirect('/element');
});




// Create
app.post("/element", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = element.length + 1;
  const number = req.body.number;
  const name = req.body.name;
  const symbol = req.body.symbol;
  const amount = req.body.amount;
  const state = req.body.state;
  const information = req.body.information;
  element.push( { id: id, number: number, name: name, symbol: symbol, amount: amount, state: state, information:information } );
  console.log( element );
  res.render('element', {data: element} );
});

// Edit
app.get("/element/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = element[ number ];
  res.render('element_edit', {id: number, data: detail} );
});

// Update
app.post("/element/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  element[req.params.number].number = req.body.number;
  element[req.params.number].name = req.body.name;
  element[req.params.number].symbol = req.body.symbol;
  element[req.params.number].amount = req.body.amount;
  element[req.params.number].state = req.body.state;
  element[req.params.number].information = req.body.information;
  console.log( element );
  res.redirect('/element' );
});



let kgpr = [
  { id:1, number:1, name:"キド ", ability:"目を隠す", birthday:"1月2日", music:"メカクシコード / 失想ワアド" ,information:"メカクシ団団長を務める少女"},
  { id:2, number:2, name:"セト", ability:"目を盗む", birthday:"3月28日 ", music:"少年ブレイヴ / 空想フォレスト" ,information:"緑色のつなぎを着た青年"},
  { id:3, number:3, name:"カノ", ability:"目を欺く", birthday:"5月10日", music:"夜咄ディセイブ" ,information:"大人びた外見でつり目が特徴的な青年"},
  { id:4, number:4, name:"マリー ", ability:"目を合わせる", birthday:"7月21日",music:"空想フォレスト / マリーの架空世界" ,information:"メデューサと人間のクォーターの少女"},
  { id:5, number:5, name:"モモ", ability:"目を奪う", birthday:"2月14日", music:"如月アテンション / オツキミリサイタル" ,information:"シンタローの妹で，高校1年生の人気アイドル"},
  { id:6, number:6, name:"エネ", ability:"目を覚ます", birthday:"-", music:"人造エネミー / ヘッドフォンアクター / エネの電脳紀行 / 夕景イエスタデイ" ,information:"シンタローのパソコンに居つく電脳体の少女"},
  { id:7, number:7, name:"シンタロー", ability:"目に焼き付ける", birthday:"4月30日", music:"人造エネミー / 透明アンサー / ロスタイムメモリー",information:"本作の主人公．パソコンに入り浸っている引きこもりの18歳の青年" },
  { id:8, number:8, name:"ヒビヤ", ability:"目を凝らす", birthday:"11月4日", music:"カゲロウデイズ / オツキミリサイタル",information:"ごく平凡な田舎に住む少年" },
  { id:9, number:9, name:"コノハ", ability:"目を醒ます", birthday:"12月24日", music:"コノハの世界事情 / アウターサイエンス / 夕景イエスタデイ / サマータイムレコード",information:"白髪の青年の姿をした記憶喪失の人造人間" },
  { id:10, number:0, name:"アヤノ", ability:"目をかける", birthday:"11月22日", music:"透明アンサー / アヤノの幸福理論 / アディショナルメモリー",information:"シンタローと中学からの同級生．真夏でもいつも赤いマフラーをしている" },
];

// 一覧
app.get("/kgpr", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('kgpr', { data: kgpr });
});

// Create
app.get("/kgpr/create", (req, res) => {
  res.redirect('/public/kgpr.html');
});

// Read
app.get("/kgpr/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = kgpr[number];
  res.render('kgpr_detail', { id: number, data: detail });
});

// Delete
app.get("/kgpr/delete/:number", (req, res) => {
  const number = req.params.number;

  // 配列範囲チェック
  if (!kgpr[number]) {
    return res.status(404).send("指定されたデータが存在しません。");
  }

  const detail = kgpr[number];

  // 削除確認ページを表示
  res.render('kgpr_delete', { id: number, data: detail });
});

// Delete (Execute)
app.post("/kgpr/delete/:number", (req, res) => {
  const number = req.params.number;

  // 存在チェック
  if (!kgpr[number]) {
    return res.status(404).send("指定されたデータが存在しません。");
  }

  // 削除実行
  kgpr.splice(number, 1);

  res.redirect('/kgpr');
});

// Create
app.post("/kgpr", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = kgpr.length + 1;

  const number = req.body.number;
  const name = req.body.name;
  const ability = req.body.ability;
  const birthday = req.body.birthday;
  const music = req.body.music;
  const information = req.body.information;

  kgpr.push({
    id: id,
    number: number,
    name: name,
    ability: ability,
    birthday: birthday,
    music: music,
    information: information
  });

  console.log(kgpr);
  res.render('kgpr', { data: kgpr });
});

// Edit
app.get("/kgpr/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = kgpr[number];
  res.render('kgpr_edit', { id: number, data: detail });
});

// Update
app.post("/kgpr/update/:number", (req, res) => {
  kgpr[req.params.number].number = req.body.number;
  kgpr[req.params.number].name = req.body.name;
  kgpr[req.params.number].ability = req.body.ability;
  kgpr[req.params.number].birthday = req.body.birthday;
  kgpr[req.params.number].music = req.body.music;
  kgpr[req.params.number].information = req.body.information;
  console.log(kgpr);
  res.redirect('/kgpr');
});



app.listen(8080, () => console.log("Example app listening on port 8080!"));