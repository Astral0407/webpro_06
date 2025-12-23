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
app.get("/kvocaloid/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;

  // 配列範囲チェック
  if (!vocaloid[number]) {
    return res.status(404).send("指定された駅データが存在しません。");
  }

  const detail = vocaloid[number];

  // 削除確認ページを表示
  res.render('vocaloid_delete_confirm', { id: number, data: detail });
});

// Delete (Execute)
app.post("/vocaloid/delete/:number", (req, res) => {
  const number = req.params.number;

  // 存在チェック
  if (!vocaloid[number]) {
    return res.status(404).send("指定された駅データが存在しません。");
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

app.listen(8080, () => console.log("Example app listening on port 8080!"));