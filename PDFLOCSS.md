# コメントについて

function.php、index.js、 mixin.scss など機能的な記述があるものは、基本的にどういう機能なのかコメントを書く。

# 命名規則

`Block__Element--Modifier`
`Block-name__Element-name--Modifier`
`Block-name__Element-name--Modifier--Modifier-name`

※mixin の function 名は、ダブルクリックでコピペできるようキャメルケースを使っても良い

# 接頭辞の種類

l- ---- layout  
c- ---- component  
p- ---- project  
u- ---- utility  
js- --- js で操作するクラス。スタイルを当てない  
a- ---- アンカーリンクのタグ。例)`id="a-about-link"`  
is- --- 状態変化。例)`is-show`、`is-active`

# ディレクトリ一覧

01_foundation ---- 基礎、基盤となる記述。例)`_font.scss`  
02_external ------ プラグイン、ライブラリなど外部の CSS。例)`slick.scss`  
03_layout -------- 詳細は後述。例)`_headers.css`  
04_component ----- 詳細は後述。例)`_btn.css`  
05_project ------- 詳細は後述。例)`_top.css`  
06_utility ------- 詳細は後述。例)`_display.css`

# layout

・複数のページに共通して現れる大きい要素。小さいものなら component  
・`l-header` ならその中身は `l-header__inner`、`l-header__logo`  
・同じデザインで中身だけ違うページが複数ある（プライバシーポリシー、特定商取引法など）の場合は、`_law.scss` 等を作成し、`l-law__item` のようにする。

# component

・複数のページに共通して現れる小さい要素。大きいものなら layout  
・3 回以上出現したら component  
・`c-btn01`、`c-btn02`など  
・component は共通のスタイル（最小のスタイル）のみを持つ。スタイルの違いは modifier で拡張  
・component に margin は書かない。margin を指定する場合は component を囲んだ親要素に指定。component と階層関係をもつ、子要素に margin を指定するのはセーフ  
・component のスタイルを上書きしたい時は、上書き用の project クラスを用意する

※例

```

.c-button01 {
  // ↓コンポーネント本体には共通のスタイルのみ
  padding: 10px 20px;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
  text-align: center;
  display: inline-block;
  // ↓Modifier でスタイルを拡張
  &--orange {
    background-color: orange;
  }
  &--blue {
    background-color: blue;
  }
  &--full-width {
    width: 100%;
    display: block;
  }
}

.c-button02 {
・・・
  &--orange {
    ・・・
  }
  &--full-width {
    ・・・
  }
}

```

# project

・layout でも component でもなく、１つページにしか存在しないスタイルは project に含まれる。  
・page ディレクトリとほぼ同義。  
・1 ページ内でも複数出現するスタイルは@extend で共通化する。違うページにも存在するなら component。

# utility

・.u-mb10 （margin-bottom：10px）  
・.u-dn-md-min (min-width:md の時 display:none)  
・utility の使用はできるだけ抑える  
・!important の使用は禁止（ライブラリの上書きなどは例外）

# ワードプレスのテーマ情報を記載する style.css について

ワードプレスのテーマ開発には、テーマの名前やテーマの URL などを記載し、theme フォルダの直下に配置する style.css がある。  
テキストエディタのプラグインなどで、style.scss を保存したときにコンパイルで style.css を上書きしないよう注意。  
もし上書きしてしまったら theme.css から復旧
