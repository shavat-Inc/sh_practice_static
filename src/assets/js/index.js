// Stageオブジェクトを作成します。表示リストのルートになります。
stage = new createjs.Stage("mv-canvas");

// パーティクルシステム作成します。
particleSystem = new particlejs.ParticleSystem();

// パーティクルシステムの描画コンテナーを表示リストに登録します。
stage.addChild(particleSystem.container);

// Particle Developから保存したパラメーターを反映します。
particleSystem.importFromJson(
  {
    "bgColor": "#00000",
    "width": 1920,
    "height": 250,
    "emitFrequency": 49,
    "startX": 970,
    "startXVariance": 1920,
    "startY": 450,
    "startYVariance": 370,
    "initialDirection": 81.5,
    "initialDirectionVariance": 0,
    "initialSpeed": 3,
    "initialSpeedVariance": 15.6,
    "friction": 0.0635,
    "accelerationSpeed": 0.4355,
    "accelerationDirection": 269.8,
    "startScale": 0.7,
    "startScaleVariance": "1",
    "finishScale": "0",
    "finishScaleVariance": "0",
    "lifeSpan": "50",
    "lifeSpanVariance": "196",
    "startAlpha": "1",
    "startAlphaVariance": "0",
    "finishAlpha": "0.35",
    "finishAlphaVariance": 0.5,
    "shapeIdList": [
        "reverse_blur_circle",
        "blur_circle",
        "circle"
    ],
    "startColor": {
        "hue": 136,
        "hueVariance": "55",
        "saturation": 0,
        "saturationVariance": 0,
        "luminance": 50,
        "luminanceVariance": "16"
    },
    "blendMode": true,
    "alphaCurveType": "1",
    "VERSION": "1.0.0"
}
);

// フレームレートの設定
createjs.Ticker.framerate = 60;
// 定期的に呼ばれる関数を登録
createjs.Ticker.on("tick", handleTick);

function handleTick() {
  // パーティクルの発生・更新
  particleSystem.update();

  // 描画を更新する
  stage.update();
}