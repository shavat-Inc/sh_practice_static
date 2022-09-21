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
  const canvasElement = document.querySelector('#myCanvas')
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement,
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
  const controls = new THREE.OrbitControls(camera, canvasElement);
  // 滑らかにカメラコントローラーを制御する
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // グループを作成
  const group = new THREE.Group();
  const geometry = new THREE.BoxBufferGeometry(50, 50, 50);
  const edges = new THREE.EdgesGeometry( geometry );
  for (let i = 0; i < 150; i++) {
    const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x31c5d8 } ) );
    line.position.x = (Math.random() - 0.5) * 2000;
    line.position.y = (Math.random() - 0.5) * 2000;
    line.position.z = (Math.random() - 0.5) * 2000;
    line.rotation.x = Math.random() * 3 * Math.PI;
    line.rotation.y = Math.random() * 3 * Math.PI;
    line.rotation.z = Math.random() * 3 * Math.PI;
    // グループに格納する
    group.add(line);
  }
  scene.add(group);

  function tick() {
    //FPS監視開始
    stats.begin();
    // グループを回す
    group.rotateY(0.001);
    // カメラコントローラーを更新
    controls.update();
    renderer.render(scene, camera); // レンダリング
    //FPS監視終了
    stats.end();
    requestAnimationFrame(tick);
  }
  tick();
  function onResize() {
    // レンダラーのサイズを調整する
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



