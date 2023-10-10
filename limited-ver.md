# my-vanilla-cal(機能制限版)
- [my-vanilla-cal(機能制限版)](#my-vanilla-cal機能制限版)
  - [連続計算機能(Continuous calculation function)](#連続計算機能continuous-calculation-function)
  - [問題](#問題)
    - [イコールを押したあとの計算](#イコールを押したあとの計算)

## 連続計算機能(Continuous calculation function)
イコールが押されるまで連続して計算し続けられる計算機を作る。

- 数字ボタンは3つ
- オペレータは'+'一つ
- イコール'='
- ディスプレイとサブディスプレイ
- 'C'と'CE'
- ログ出力

```plantuml
!theme crt-amber
@startuml
start
:数値を入力;
if (オペレータ未選択) then (Yes)
  :this.pre = 入力値;
  note:A1
else if (オペレータ選択済) then (Yes)
  :this.next = 入力値;
  note:B1
else if (this.pre != null) then (Yes)
  :this.result = this.pre;
  :this.pre = 入力値;
note:A2
else (No)
  :this.next = 入力値;
  note:B2
endif
stop
@enduml
```

```plantuml
!theme crt-amber
@startuml
title Operandに入力値を割り振る
start
:入力値;
if (オペレータが\n未選択) then (Yes)
  :this.pre = 入力値;
  note:A1
else if (オペレータを\n選択済み) then (Yes)
  :this.next = 入力値;
  note:B1
else if (this.pre !== null) then (Yes)
  :this.result = this.pre;
  :this.pre = 入力値;
  note:A2
else (No)
  :this.next = 入力値;
  note:B2
endif
stop
@enduml
```
---
```plantuml
!theme crt-amber
@startuml
title 表示値に応じて\n入力値"0"や"."の扱いを判定する
start
if (表示値 = 0 かつ 入力値 = 00)
    :return;;
else if (表示値 = 0 かつ　入力値 = 00\nまたは\n表示値 = 0 かつ　入力値 = 0)
    if (入力値 = '.')
        :表示値 = '0.';
    else
        :表示値 = 入力値;
    endif
else if (表示値に'.'を含み\nかつ\n入力値 = '.')
    :return;;
else
    :表示値 += 入力値;
endif
stop
@enduml
```
---
```plantuml
!theme crt-amber
@startuml
title 連続計算したときの\nオペランドの扱い
start
@enduml
```

## 問題
### イコールを押したあとの計算
- 最初の計算は問題ない
- イコールを押し、オペレータを押した時に問題が起こる
- イコール押下後のResultはオペレータ押下後にOperandAに代入する
- `OperandB: 35`となってしまっているのは、`setOperand`に問題がある
- サブディスプレイの表示も更新されていない
```
入力: 12 + 23 =
AnyOperator
  OperandA: 12
  OperandB: null
  currentOperator: +
  Result: null
  currentStage: operator

出力: 35
Equal
  OperandA: 12
  OperandB: 23
  currentOperator: +
  Result: 35
  currentStage: result

入力: + 3 =
AnyOperator
  OperandA: 12 <- ここは'35'となるべき
  OperandB: 35 <- 新規の計算なので'0'にするべき.Resultが代入されているのはおかしい
  currentOperator: +
  Result: 35
  currentStage: operator

出力: 15
Equal
  OperandA: 12　<- 本来Resultの値が代入されるべき
  OperandB: 3 <- '3'が代入されているのはOK
  currentOperator: +
  Result: 15
  currentStage: result
```