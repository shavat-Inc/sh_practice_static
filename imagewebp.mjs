import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import fs from 'fs';
import path from 'path';

(async () => {
    // 配列を用意
    const files = [];
    // 配列からwebp変換
    const filesInDir = await imagemin(["./src/assets/images/*.{jpg,png,svg}"], {
        destination: "dist/images/",
        plugins: [
            imageminWebp({quality: 80})
        ],
        });
    files.push(...filesInDir);

    // リネーム
    files.map((file) => {
        // 配列から変換前のファイル名を取得
        const filename = path.basename(file.sourcePath);
        // 変数にディレクトリパス、変換後のファイル名に.webpを付与したものを格納
            const newPath = path.join(
                path.dirname(file.destinationPath),
                `${filename}.webp`
            );
            //　パスを変換
            fs.renameSync(file.destinationPath, newPath);
        });
})();