# HabuCalc
- [HabuCalc](#habucalc)
  - [目標](#目標)
  - [進捗状況](#進捗状況)
    - [2023/09/15](#20230915)
    - [2023/09/16](#20230916)
    - [2023/09/18](#20230918)
    - [2023/09/24](#20230924)
    - [2023/09/26](#20230926)
    - [2023/09/27](#20230927)
    - [2023/09/29](#20230929)
    - [2023/09/30](#20230930)
    - [2023/10/01](#20231001)
    - [2023/10/02](#20231002)

プログラミング初心者が計算機を作ろうと四苦八苦しているリポジトリです。<br>
完成までどれくらいかかるかわかりませんが、コツコツやっております。<br>

## 目標
iOSの計算機app並の機能を備えた計算機をプログラムする

## 進捗状況
### 2023/09/15
数値を画面に表示できるようにした。
1. 最初の画面('0'が表示されている場合)、'0'や'00'を押しても画面に表示しない。
2. '0'や'00'以外の数字を押すと初期の'0'を置き換える
3. 1から9までの数字を押すことで、連続した数値を入力することができるように。

**TODO**
- [ ] 小数点を取り扱えるようにする
  - [x] 小数点'.'を押した時、画面に自動的に'0.'を表示する
  - [x] 2個以上の小数点を入力できないようにする
  - [ ] 小数点以下の桁数の制限
  - [ ] エラーハンドリングの実装

### 2023/09/16
小数点ボタン'.'を押した際に'0.'と表示されるようにした。
- [x] 小数点を押下後にオペレータを押したときの挙動を設定する

### 2023/09/18
計算のための`class`を記述した。
- [x] 表示値をオペランドとして呼び出せるようにする
- [x] オペレータボタンを押した時、正しくメソッドを呼び出せるようにする

### 2023/09/24
オペランドAとオペランドBをそれぞれ変数に格納できるようにした
- [x] 各オペランドをメソッドの引数に代入して計算を実行する

### 2023/09/26
**進捗**
- 基本的な計算機能を実装した
- ファイルを整理

**TODO**
- [x] `%`と`±`の挙動を改善する(押下して即表示させる)
- [x] `Clear`と`ClearEntries`の機能を実装する

### 2023/09/27
transfomerの扱いを検討中

**TODO**
- [ ] 続けて計算できないバグを修正する
  - [x] イコールを押した後に計算を続けるパターン
  - [ ] イコールを押さずに計算を続けるパターン
    - [ ] 新たな条件部: 両オペランド入力済みかつオペレータが押された時
      - [ ] オペレータが押された時点で一時的な計算結果を表示する
      - [ ] 一時的な計算結果はオペランドAとする
      - [ ] オペランドBの入力を受け付ける

### 2023/09/29
- オペランドBの入力にバグあり
- 表示位置を左側に変更

### 2023/09/30
**進捗**
- Clear, ClearEntries機能を実装
- 計算ログを追加
- ログのクリアボタンを追加

### 2023/10/01
**進捗**
- オペランドBの入力は'0'から開始するように変更
  - オペランドB入力開始時まではオペランドAの表示は保持したかったがどうしてもうまく行かない
  - オペランドAを表示する`<input>`を追加して対応

**TODO**
- [ ] 計算の続行に関しての挙動を修正する(2023/09/27のTODO)
- [ ] キーボード入力に対応する
  - [x] 数字
  - [ ] オペレータ
- [ ] スマホ操作に対応する
- [ ] 選択中のオペレータのスタイルを切替可能にする
  - [ ] 選択中のオペレータは反転させる等

### 2023/10/02
**進捗**
- 数字のみボタン入力に対応

**TODO**
- [ ] オペレータボタンもキー入力に対応させる


🐍 <ｼｬ-!
