# static-dev

このリポジトリは、ejs を用いた静的開発環境(npm-scripts)です。
基本的に windows で動作確認をしています。

## 動作確認されているバージョン

npm 7.6.1
node 15.5.0

# git からプロジェクトをクローン

基本的に shavat は GitHub Desktop で git 管理をしている。
そのため、以下手順は GitHub Desktop の手順である。

<https://github.com/shavatDesign/static-dev>

上記のページの「code」をクリックして「Open with GitHub Desktop」をクリック。
クローンしたいパス(任意)を選択して、クローンする。

【注意】vdcode で開いた際、拡張機能の推奨プラグインをインストールしておくこと！

## 必要なパッケージをインストールする

パッケージのインストール `npm install` または `npm i`

# サーバー

vscode のプラグイン「Live Server」を使用。
該当の html ファイルを右クリックし、「Open with Live Server」を選択。

# npm-script のコマンド

`npm run dev`
開発コマンド
・js/font/img コピー
・ejs コンパイル
・sass コンパイル

`npm run dev`
本番公開時コマンド
・js/font コピー
・ejs コンパイル（コメント削除）
・sass コンパイル(min 化、map 無し)
・img コピー（圧縮版と webp 版の生成）

`npm run prefix`
dist の css にベンダープレフィックスを付与

`npm run pro:prefix`
dist の css にベンダープレフィックスを付与＆min 化

# ejs の圧縮コンパイルについて

ejs ファイル内のコメントは削除される。
もし空白・改行も削除したい場合は、gulpfile.js の`collapseWhitespace : false`を true にする。（可読性が下がり、ファイルサイズの縮小も微量のためデフォルトではオフ）

# autoprefixer(ベンダープレフィックスについて)

autoprefixer はデフォルトでは OFF。
ほとんどのプロパティには不要なため、必要なものに手動で付ける。
古いブラウザへの対応が必要になったり、何か不具合が起きた等の時に ON にする。

### 主な npm コマンド一覧

`npm -v`
npm のバージョンを確認

`npm install xxx`、`npm i xxx`
パッケージ xxx をインストール

`npm install xxx@3.0.0`
パッケージ xxx のバージョン 3.0.0 をインストール（何も指定しない場合最新版がインストールされる）

`npm uninstall xxx`
パッケージ xxx を削除

`npm update`
全てのパッケージを更新

`npm update xxx`
パッケージ xxx を更新

`npm list`
パッケージ一覧を表示

`npm outdated`
古いバージョンのパッケージを確認
