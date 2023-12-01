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
- 💭 :thought_balloon: 本当にちょこっとだけどうでも良い変更
  - gitまわりの使い方のテストなど


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