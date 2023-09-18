# HabuCalc
- [HabuCalc](#habucalc)
  - [予定](#予定)
  - [進捗状況](#進捗状況)
    - [2023/09/15](#20230915)
    - [2023/09/16](#20230916)
    - [2023/09/18](#20230918)

プログラミング初心者が計算機を作ろうと四苦八苦しているリポジトリです。<br>
完成までどれくらいかかるかわかりませんが、コツコツやっております。<br>

## 予定
1. `class`とイベントリスナーを使った計算機能を実装する(まずは基本を...)
2. 計算履歴を実装したい(計算式と答えを表示する)

## 進捗状況
### 2023/09/15
数値を画面に表示できるようにした。
1. 最初の画面('0'が表示されている場合)、'0'や'00'を押しても画面に表示しない。
2. '0'や'00'以外の数字を押すと初期の'0'を置き換える
3. 1から9までの数字を押すことで、連続した数値を入力することができるように。

今後の改善点
- [ ] 小数点を取り扱えるようにする
  - [x] 小数点'.'を押した時、画面に自動的に'0.'を表示する
  - [x] 2個以上の小数点を入力できないようにする
  - [ ] 小数点以下の桁数の制限
  - [ ] エラーハンドリングの実装

### 2023/09/16
小数点ボタン'.'を押した際に'0.'と表示されるようにした。
- [ ] 小数点を押下後にオペレータを押したときの挙動を設定する

### 2023/09/18
計算のための`class`を記述した。
- [ ] 表示値をオペランドとして呼び出せるようにする
- [ ] オペレータボタンを押した時、正しくメソッドを呼び出せるようにする

🐍 <ｼｬ-!
