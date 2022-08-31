import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminGifsicle from 'imagemin-gifsicle';
import imageminSvgo from 'imagemin-svgo';

(async () => {
    await imagemin(['./src/assets/images/*.{jpg,png,svg,gif}'], {
        destination: 'dist/images',
        plugins: [
          imageminMozjpeg({quality:80}),
          imageminPngquant({quality: [0.6, 0.8]}),
          imageminGifsicle(),
          imageminSvgo()
        ]
    });
})();