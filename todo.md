## memo

- generated commit message
  - それぞれの内容がない場合、表示しないようにするロジックの追加
  - 改行もdescriptionなければ追加しない
- prefixのoptionのselectedなものがクリックできちんと切り替わるようにする
  - 初回読み込み時は一番上
  - 次、typeが切り替わった際は1番上が選択されるようにする
  - selected が他の番号に移動した状態でtypeが変わった時のselectedの挙動
- FormPrefixOptionのtype追加

## 全体の流れ

- type
  - 変わったらprefixの内容を変更する
  - useState
- prefix
  - typeが変わった時に発動、useEffectで内容を反映する
  - ここ難解かも。シンプルに考えられるようにしたい...
  - 変わっても何もしない、実行時にvalueを読み取れればOK
  - useRef?
  - defaultValueを決められる、これがいい？かも
- Summary
  - リアルタイムで数値を取得する
  - useState
- Description
  - リアルタイムで長さを取得
  - useState
- Issue Number
  - リアルタイム変更なし
  - 読み取りだけでOK
  - useRef?
- GENERATE BUTTON
  - 全部の値を取得、応じたemoji、prefixを準備
  - textareaに反映させる