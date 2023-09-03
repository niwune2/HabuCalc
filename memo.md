|     | A:Onetime      | B:Manytimes      | C:C / CE    | D:% / ±          |
| --- | -------------- | ---------------- | ----------- | ---------------- |
| 0   | Push Num       | Push Num         | Push Num    | Push Num         |
| 1   | Push Operation | Push Operation   | Push C / CE | Push '%' / '±'   |
| 2   | Push Num       | Push Num         | Clear       | Push Operation   |
| 3   | Push `=`       | Show Result      | `END`       | Push Num -> `A2` |
| 4   | Show Result    | Push Operation   |             | Push `=` -> `A4` |
| 5   | `END`          | Push `=` -> `A4` |             |                  |

--------------------------------------------------------------------------------

押した時の挙動
| Push | Numbers   | C    | CE   | +    | -    | ×    | ÷    | %    | ±    |
| ---- | --------- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 0    | Display   | none | none | none | none | none | none | none | none |
| 1    | 2nd digit | END  | END  | END  | END  | END  | END  | END  | END  |
| 2    | 3rd digit |      |
| 3    | ......... |

--------------------------------------------------------------------------------
