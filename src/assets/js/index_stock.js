 // ページの読み込みを待つ
 window.addEventListener('DOMContentLoaded', init);
// 枠線のみの箱がぐるぐる
function init() {
  // サイズを指定
  const width = 800;
  const height = 800;

  // レンダラーを作成
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

  // 毎フレーム時に実行されるループイベントです
  tick();

  function tick() {
    // グループを回す
    group.rotateY(0.001);
      // カメラコントローラーを更新
    controls.update();
    renderer.render(scene, camera); // レンダリング
    requestAnimationFrame(tick);
  }
}