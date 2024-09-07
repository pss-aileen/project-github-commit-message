# Commit Easily

Commit Easily" is a web application that allows you to easily create commit messages without having to think too much.

![Commit Easily](https://github.com/user-attachments/assets/27913e1f-5aed-488c-83a4-2ad68f503c27)

## Overview

- I want to simplify the input of prefixes.
- I want to easily retrieve and view prefixes for each project.
- I want to see explanations of what each prefix is for.
- I want to standardize the spacing.
- ~~I don’t want to accidentally press Enter while typing in the terminal and have to redo it.~~
- I want to create commit messages without having to think at all.

This web application solves these problems for people (like me).

URL: https://pss-aileen.github.io/project-github-commit-message/

## Tech Stack

- HTML/CSS
- React
- TypeScript
- Tailwind CSS

## Project Duration

3 days (first release).

---

## Release

<details>

<summary>show detail</summary>

- **[Version 4.0.0] 2024/09/07**
  - 改修
    - React で全面的に改修
    - git コマンドの生成を廃止 -> GitHub Desktop 用のメッセージ生成に変更
- **[Version 3.0.2] 2024/03/23**
  - 修正
    - NORMAL の PREFIX を変更
- **[Version 3.0.1] 2024/03/10**
  - 修正
    - TYPE PRACTICE PROJECT に WATCH を追加
      - Udemy 講座を視聴して、見た動画ごとにコミットする場合の prefix
- **[Version 3.0.0] 2024/02/24**
  - 内部構造作り替え
    - オブジェクト指向でプログラムを組み直し
    - prefix の情報を json で管理するように変更
- **[Version 2.0.7] 2024/01/30**
  - 修正
    - 選択肢にアイコン追加
    - PAIZA の選択肢の順番変更
- **[Version 2.0.6]**
  - skip
- **[Version 2.0.5] 2024/01/03**
  - 新機能
    - ダークモードに対応
  - 修正
    - RELEASE、NEW の時、SUBJECT を自動的に出力
- **[Version 2.0.4] 2024/01/01**
  - 修正
    - UPDATE の日付を 2411→240101 になるよう変更
- **[Version 2.0.3] 2023/12/23**
  - 修正
    - UPDATE の自動日付を 20231223 から 231223 になるように変更
- **[Version 2.0.2] 2023/12/22**
  - 新機能
    - prefix で UPDATE を選んだ時、日付が自動で SUBJECT に入るようにした
- **[Version 2.0.1] 2023/12/17**
  - 新機能
    - リセットボタン: 自分のインターネット回線が遅くでリロードして書いた内容を消していると面倒だったので、リセットボタンを作成
  - practice-project 用の prefix の追加
- **[Version 2.0.0] 2023/12/13**
  - 新機能
    - プロジェクトごとに prefix を切り替えられる機能を追加
  - 修正
    - prefix が複数選択できる問題を解決（HTML の Select から multiple を削除）
- **[Version 1.0.0] 2023/12/03**

</details>
