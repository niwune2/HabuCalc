# memo2 2023/09/27~
- [memo2 2023/09/27~](#memo2-20230927)
  - [`%`と`±`の扱い](#との扱い)
    - [a](#a)
      - [誤ったコード](#誤ったコード)
      - [正しいコード](#正しいコード)

## `%`と`±`の扱い
`%`と`±`は、オペレータとは区別して数値を処理するようにする。

これらは、オペレータとは違い、押すことですぐに結果を出力しなければならない。

オペレータの場合は、2つのオペランドが揃って初めて結果を出力させるため、これらの記号とは挙動が異なり、同じイベントや条件文で扱うと挙動がおかしくなる。

新しく`%`と`±`を処理するためのイベントリスナーを記述する。
(これらの記号の呼び名は、とりあえず'transformer'としておくが、正しい名称がある場合はそちらに置き換える)

transformerは
1. 数字ボタンの押下後のみ機能する = 0のときは無視する
2. 数値入力後にtransformerを押すことで数値を処理する
3. 処理された数値は、オペランドとして扱う
   1. オペランドAとする場合
      1. (User)数値を入力する
      2. (User)transformerを入力する
      3. (Code)入力された数値に指定された処理をする
      4. (Code)その値を`firstOperand`に代入する
      5. (Code)その値を表示する
   2. オペランドBとする場合
      1. (Premise)オペランドAを入力済み
      2. (Premise)オペレータを入力済み
      3. (User)数値を入力する
      4. (User)transformerを入力する
      5. (Code)入力された数値に処理を実行する
      6. (Code)その値を`secondOperand`に代入する
      7. (Code)その値を表示する
4. 入力された数値に定数を掛ける
   1. `%` -> 0.01x
   2. `±` -> -x
   3. `π` -> πx

### a
#### 誤ったコード
```js
    percent() {
        if (this.next === null) { // `next`がnullであるとき...
            this.result = this.next * 0.01; // `result`にx0.01した`next`を代入.
            // nullにx0.01しても意味ねぇわ！！！！！
            return this.result;
        } else {
            this.result = this.pre * 0.01;
            return this.result;
        }
    }
```

#### 正しいコード
```js
percent() {
    if (this.next !== null) { // `next`がnullではないとき...
        this.result = this.next * 0.01; // `result`にx0.01した`next`を代入.
    } else {
        this.result = this.pre * 0.01;
    }
    return this.result;
}
```