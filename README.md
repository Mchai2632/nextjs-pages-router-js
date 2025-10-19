<!-- This file is used to configure the Next.js application. -->

./config.js

| 代碼          | 說明                        | 用途                                                            |
| ------------- | --------------------------- | --------------------------------------------------------------- |
| **FT_SGL**    | ADULT SINGLE - FULL TOUR    | 成人單人房全程團（Full Tour）價格。通常是一人一間房，價錢最高。 |
| **FT_TWN**    | ADULT TWIN - FULL TOUR      | 成人雙人房全程團價格。兩人同住一房，價格比單人便宜。            |
| **FT_TRIPLE** | ADULT TRIPLE - FULL TOUR    | 成人三人房全程團價格。通常是三人共用一房。                      |
| **FT_CTW**    | CHILD WITH TWIN - FULL TOUR | 小孩與雙人房成人共住（通常與父母同房），價格依比例折扣。        |
| **FT_CWB**    | CHILD WITH BED - FULL TOUR  | 小孩佔床（有自己的床位），全程團價格。                          |
| **FT_CNB**    | CHILD NO BED - FULL TOUR    | 小孩不佔床（與大人同床），全程團價格。                          |
| **FT_INFT**   | INFANT - FULL TOUR          | 嬰兒（通常指 2 歲以下）全程團價格。只含部分費用如保險或服務費。 |

🔸 這組是 Full Tour（全程團） 的主要報價：
含機票 + 住宿 + 行程 + 導遊費用等。

| 代碼          | 說明                          | 用途                             |
| ------------- | ----------------------------- | -------------------------------- |
| **GA_SGL**    | ADULT SINGLE - GROUND ONLY    | 成人單人房（只地接，不含機票）。 |
| **GA_TWN**    | ADULT TWIN - GROUND ONLY      | 成人雙人房（只地接，不含機票）。 |
| **GA_TRIPLE** | ADULT TRIPLE - GROUND ONLY    | 成人三人房（只地接，不含機票）。 |
| **GA_CTW**    | CHILD WITH TWIN - GROUND ONLY | 小孩與雙人房共住（地接團）。     |
| **GA_CWB**    | CHILD WITH BED - GROUND ONLY  | 小孩佔床（地接團）。             |
| **GA_CNB**    | CHILD NO BED - GROUND ONLY    | 小孩不佔床（地接團）。           |
| **GA_INFT**   | INFANT - GROUND ONLY          | 嬰兒地接團費。                   |

🔹 Ground Only（地接團） 指的是旅客自行安排機票，只參加當地行程。

| 代碼          | 說明                  | 用途                                       |
| ------------- | --------------------- | ------------------------------------------ |
| **AC**        | AGENT COLLECTION FEES | 代理服務費（旅行社的手續費或服務費）。     |
| **TIPPING**   | TIPPING - OVERSEA     | 海外導遊與司機小費。通常是強制或建議收取。 |
| **TRVL_INS**  | TRAVEL INSURANCE      | 旅遊保險費用。                             |
| **VISA**      | VISA                  | 簽證費用。                                 |
| **DEVIATION** | DEVIATION CHARGES     | 個人行程變更費（例如延回、改機票等）。     |

🔸 這些屬於「額外項目」，不一定每個人都會用到。

| 代碼     | 說明     | 用途                                                   |
| -------- | -------- | ------------------------------------------------------ |
| **DISC** | DISCOUNT | 折扣金額。為負值代表扣減費用（例如早鳥優惠、促銷等）。 |

📘 小結：

| 類別                | 說明               | 範例代碼               |
| ------------------- | ------------------ | ---------------------- |
| Full Tour 全程團    | 含機票＋住宿＋行程 | FT_SGL, FT_TWN, FT_CWB |
| Ground Only 地接團  | 不含機票，當地行程 | GA_SGL, GA_TWN, GA_CWB |
| Additional 額外費用 | 小費、簽證、保險等 | TIPPING, VISA, AC      |
| Discount 折扣       | 扣減費用           | DISC                   |
