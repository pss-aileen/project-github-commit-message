# よく使われてきたものと、理想のコミットメッセージ

## 今まで使ってきたコミットメッセージ

- Fix: README.md
- Fix: README.md and mono to single
- Add: README.md and image
- Remove: setting.json
- Fix: main.js & style.css for change tab
- refactor: drawGradient()
- add: gradient function


## よく使われる？使いそう、想定

- ファイル、フォルダの追加
- ファイル、フォルダの削除
- デザインの修正
- JavaScriptの変更
- CSSの変更
- README.mdの作成、変更
- 機能の追加
- バグの修正
- リファクタリング
- 途中 work in progress


## 考え方

> コードには How
> テストコードには What
> コミットログには Why
> コードコメントには Why not

ref: https://www.praha-inc.com/lab/posts/commit-message

**コミットメッセージには「なぜ、コードを変更したのか」を書く**


## ルール


### prefix、変更内容

```
🎉 コミットメッセージ
```


### prefix、変更内容、issueの番号

```
🎉 コミットメッセージ (#issue)
```


### prefix、変更内容、理由、isseeの番号

```
🎉 コミットメッセージ (#issue)

これはこういった理由で、こう追加しました。
```


## 使えそうなもの

- 🎉 `:tada:` 大きな機能追加、プロジェクトスタート
  - プロジェクトをはじめたときのコミット
- 🚀 `rocket` デプロイした時に
- 🔖 `:bookmark` リリースする時に使う、バージョンを書く
- 🐛 `:bug:` バグ修正
  - 作った何かが動かない、とか？
- 👍 `:+1:` 機能改善、追加
  - 新しい機能を追加
- ✨ `:sparkles:` 部分的な機能追加
- ♻️ `:recycle:` リファクタリング
  - コードの構造や設計を変更して、品質や可読性を向上させる
  - コードの外部の挙動や機能は変更させない
  - メンテナンス性の向上、重複コードの削除、冗長性の排除
- 📝 `:memo:` 文言を修正
  - HTMLなどの文字
- 🎨 `:art:` デザインUI/UX
  - デザイン面で変更を加えた時
  - HTML/CSSになるかな...？
- 🚧: `:construction:` Work in Progress 作業中
  - とりあえず作業したもの？作業途中？
- 🚚 `:truck:` 名前の変更、ファイル、パス、ルートを変更した時
- 🔥 `:fire:` 不要な機能、使われなくなった機能の削除
- 🗑️ `:wastebasket:` 削除
  - 何かを削除
- 📚 `:books:` ドキュメント
  - コードとは関係ない、今回だったらプロジェクトの内容やドキュメント、使い方の部分、README.mdの変更、追加
- 💭 `:thought_balloon:` 本当にちょこっとだけどうでも良い変更
  - gitまわりの使い方のテストなど
  - `:bubbles: :books:` 成功、ただ、やっぱり使い所がわからないので保留でもいいかも


### 使えそうだけど保留

- 🙈 `:see_no_evil:` .gitignoreを追加、変更した時
- 🚿 `:shower:` 不要な機能、使われなくなった機能の削除
- 🚀 `:rocket:` パフォーマンス改善
- ➕ `:heavy_plus_sign:` リソース・ライブラリの追加
- ➖ `:heavy_minus_sign:` リソース・ライブラリの削除
- 🆙 `:up:` リソース・ライブラリのアップデート


### ボツ

- 🫧 `:bubbles:`
  - 本当にちょこっとだけどうでも良い変更...うーん
  - `:bubbles::books:` で絵文字表示されなかった、もともと使えないっぽい


## 参考

- [gitmojiの絵文字ってどれを使えばいいの？ | cloud.config Tech Blog](https://tech-blog.cloud-config.jp/2021-12-21-git-moji-list/)
- [Complete list of github markdown emoji markup](https://gist.github.com/rxaviers/7360908)


## これにしたい！！

- https://tech.pepabo.com/2023/08/28/stopped-to-use-gitmoji/


### 確定版

- 💕 FEATURE: 〜〜の追加
  - メソッドの追加、条件分岐の追加、改良、ファイルの追加もOK
  - 例
    - FEATURE: キャンバス描画のための関数を追加
    - FEATURE: index.htmlを全体的に更新
    - FEATURE: index.htmlにtailwindのCSSを追加
    - FEATURE: index.htmlの文言全体的に追加、変更
- 🫶 RAFACTOR: 
  - 機能が変わらないままコードを書き換えた時
  - 条件分岐を少なくしたり、コードを効率よくしたり、スペース入れたり、並び替えたりなど
- 🐝 FIX: 不具合の修正
  - 不具合、バグの修正、手戻りで何かを修正する場合
- 🎉 NEW: BEGIN NEW PROJECT
- 📖 DOCS: 
  - コードに関係ない部分
  - 例
    - DOCS: 参考URL追加 at refactor.md
    - DOCS: 
- 🔖 RELEASE: Version 1.0.0
  - まとまって、完成とするときに追加

ref
  - ⭐️ [[Git]コミットの粒度の肝はレビュワーを常に意識すること - FuwaFuwaShoChan BLOG](https://blog.masuyoshi.com/git%E3%82%B3%E3%83%9F%E3%83%83%E3%83%88%E3%81%AE%E7%B2%92%E5%BA%A6%E3%81%AF%E3%83%AC%E3%83%93%E3%83%A5%E3%83%AF%E3%83%BC%E3%82%92%E5%B8%B8%E3%81%AB%E6%84%8F%E8%AD%98/)
  - [コミットメッセージを書く時にgitmojiを使うのをやめた話 - Pepabo Tech Portal](https://tech.pepabo.com/2023/08/28/stopped-to-use-gitmoji/)


### コミットのタイミング

- ざっと見で無視しても良い箇所
- しっかり見てもらいたい箇所
- メソッド単位


### 採用しないもの

- STYLE: スペースのあけかた、コードスタイルを変える
  - 難しいので、理ファクターとおなじで

- fix: バグの修正
- feat: 新しい機能の追加
  - 新しい機能の追加
- docs: docs
- style
- refactor
- test
- 🔥 BREAKING: 重要な何かを変更した時、？
- 🛠️ WIP: WORK IN PROGRES 全ての途中

