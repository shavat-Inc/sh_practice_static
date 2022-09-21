 // FPS==============================
var stats = new Stats();
stats.showPanel(0);
Object.assign(stats.dom.style, {
  'position': 'fixed',
  'height': 'max-content',
  'left': 'auto',
  'right': '0',
  'top': 'auto',
  'bottom': '0'
});
document.body.appendChild( stats.dom );

 // WebGL==============================
// ページの読み込みを待つ
window.addEventListener('DOMContentLoaded', init);
function init() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const canvas = document.querySelector('#myCanvas');
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    devicePixelRatio: window.devicePixelRatio,
  });
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();
  // フォグを設定
  scene.fog = new THREE.Fog(0x000000, 50, 2000);
  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(0, 0, 1000);

  // カメラコントローラーを作成
  const controls = new THREE.OrbitControls(camera, canvas);
  // 滑らかにカメラコントローラーを制御する
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

 // 星屑を作成
 //canvasにテクスチャを作成
  function generate() {
        
  //canvasで小さい丸の作成
  const canvas = document.createElement('canvas');
  canvas.width = 16;
  canvas.height = 16;
  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.1, 'rgba(170,248,255,0.3)');
  gradient.addColorStop(0.2, 'rgba(0,37,97,1)');
  gradient.addColorStop(1, 'rgba(0,0,0,1)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}


  function createStarField() {
    // 頂点情報を格納する配列
    const vertices = [];

    // 配置する範囲
    const SIZE = 2000;
    // 配置する個数
    const LENGTH = 1000;

    for (let i = 0; i < LENGTH; i++) {
      const x = SIZE * (Math.random() - 0.5);
      const y = SIZE * (Math.random() - 0.5);
      const z = SIZE * (Math.random() - 0.5);

      vertices.push(x, y, z);
    }

    // 形状データを作成
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    // マテリアルを作成
    const material = new THREE.PointsMaterial({
      size: 20,
      color: 0xfffffff,
      map: generate(),
    });

    // 物体を作成
    const mesh = new THREE.Points(geometry, material);
    scene.add(mesh);
  }
  
  createStarField();

  let rot = 0;
  // アニメ―ション
  function animationStart() {
    //FPS監視開始
    stats.begin();
    rot += 0.009; // 毎フレーム角度を0.5度ずつ足していく
    // ラジアンに変換する
    const radian = (rot * Math.PI) / 180;
    // 角度に応じてカメラの位置を設定
    camera.position.x = 1000 * Math.sin(radian);
    camera.position.z = 1000 * Math.cos(radian);
    // // カメラコントローラーを更新
    // controls.update();
    // 原点方向を見つめる
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // レンダリング
    renderer.render(scene, camera);
    stats.end();
    requestAnimationFrame(animationStart);
  }
  animationStart();

  // レンダラーのサイズを調整する
  function onResize() {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // カメラのアスペクト比を正す
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
    // 初期化のために実行
    onResize();
    // リサイズイベント発生時に実行
    window.addEventListener('resize', onResize);
}