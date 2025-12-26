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
  const url = req.body.number;
  const name = req.body.name;
  const plays = req.body.symbol;
  const day = req.body.amount;
  const composer = req.body.state;
  const lyricist = req.body.information;
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





app.listen(8080, () => console.log("Example app listening on port 8080!"));