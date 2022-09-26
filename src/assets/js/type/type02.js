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
  const canvas = document.querySelector('#myCanvas');
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    devicePixelRatio: window.devicePixelRatio,
  });

  // シーンを作成-------------------------------
  const scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x03050a );
  // フォグを設定-------------------------------
  scene.fog = new THREE.Fog(0x000000, 50, 2000);
  // カメラを作成-------------------------------
  const camera = new THREE.PerspectiveCamera(45, 1.0);
  camera.position.set(0, 0, 100);

  // カメラコントローラーを作成-------------------------------
  const controls = new THREE.OrbitControls(camera, canvas);
  // 滑らかにカメラコントローラーを制御する
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

 //星屑を作成-------------------------------
 //テクスチャを作成
  function generate() {
    const circleCanvas = document.createElement('canvas');
    circleCanvas.width = 20;
    circleCanvas.height = 20;
    const context = circleCanvas.getContext('2d');
    const gradient = context.createRadialGradient(
    circleCanvas.width / 2, 
    circleCanvas.height / 2, 
    0,
    circleCanvas.width / 2, 
    circleCanvas.height / 2, 
    circleCanvas.width / 2);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.1, 'rgba(170,248,255,1)');
    gradient.addColorStop(0.2, 'rgba(0,37,97,0.5)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, circleCanvas.width, circleCanvas.height);
    const texture = new THREE.Texture(circleCanvas);
    texture.needsUpdate = true;
    return texture;
  }

  //星々
  function createStarField() {
    const vertices = [];
    // 配置する範囲
    const SIZE = 1000;
    // 配置する個数
    const LENGTH = 1500;
    for (let i = 0; i < LENGTH; i++) {
      const x = SIZE * (Math.random() - 0.5);
      const y = SIZE * (Math.random() - 0.5);
      const z = SIZE * (Math.random() - 0.5);
      vertices.push(x, y, z);
    }
    // 形状データ
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    // マテリアル
    const material = new THREE.PointsMaterial({
      map: generate(),
      size: 6,
      color: 0xffffff,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false
    });
    const mesh = new THREE.Points(geometry, material);
    scene.add(mesh);
  }
  createStarField();

  //カプセル
  function createPoints(geom) {
    const material02 = new THREE.PointsMaterial({
  　　　color: 0xffffff,
        size: 2,
        transparent: true,
        blending: THREE.AdditiveBlending,
        map: generate(),
        depthWrite: false
    });

    const cloud = new THREE.Points(geom, material02);
    return cloud;
  }
  const geom02 = new THREE.CapsuleGeometry( 20, 20, 3, 50 );
  const mesh02 = createPoints(geom02);
  scene.add(mesh02);

  //中心スフィア
  function createPoints02(geom) {
    const material02 = new THREE.PointsMaterial({
  　　　color: 0xff0000,
        size: 1,
        transparent: true,
        blending: THREE.AdditiveBlending,
        map: generate(),
        depthWrite: false
    });

    const cloud = new THREE.Points(geom, material02);
    return cloud;
  }
  // const geom02 = new THREE.TorusKnotGeometry(20, 6, 320, 12, 6, 3);
  const geom03 = new THREE.SphereGeometry( 5, 20, 15 );
  const mesh03 = createPoints02(geom03);
  scene.add(mesh03);

  // アニメ―ション
  function animationStart() {
    //FPS監視開始
    stats.begin();
    // // カメラコントローラーを更新
    controls.update();
    // レンダリング
    renderer.render(scene, camera);
    stats.end();
    requestAnimationFrame(animationStart);
  }
  animationStart();

  // レンダラーのリサイズ
  function onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // カメラのアスペクト比を正す
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  onResize();
  window.addEventListener('resize', onResize);
}