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
  const canvasElement = document.querySelector('#myCanvas')
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement,
    antialias: true,
    alpha: true,
    devicePixelRatio: window.devicePixelRatio,
  });
  
  // シーンを作成
  const scene = new THREE.Scene();

  // フォグを設定
  scene.fog = new THREE.Fog(0x000000, 50, 2000);

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, 1.0);
  camera.position.set(0, 0, 300);

  // カメラコントローラーを作成
  const controls = new THREE.OrbitControls(camera, canvasElement);
  // 滑らかにカメラコントローラーを制御する
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // グループを作成
  const geometry = new THREE.BoxGeometry(10, 10, 10);
  const edges = new THREE.EdgesGeometry( geometry );
  // 範囲
  const range = 1000;
  // 数
  const count = 150;
  const lineArray = [];
  for (let i = 0; i < count; i++) {
    const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x309229 } ) );
    line.position.x = (Math.random() - 0.5) * range;
    line.position.y = (Math.random() - 0.5) * range;
    line.position.z = (Math.random() - 0.5) * range;
    line.rotation.x = Math.random() * 3 * Math.PI;
    line.rotation.y = Math.random() * 3 * Math.PI;
    line.rotation.z = Math.random() * 3 * Math.PI;
    lineArray.push(line);
    scene.add(line);
  }

  const clock = new THREE.Clock();

  function tick() {
    stats.begin();
    let item = lineArray.length;
    let elapseTime = clock.getElapsedTime();
    while(item--) {
      let x = lineArray[item].position.z;
      lineArray[item].rotation.z +=0.01;
      lineArray[item].rotation.y +=0.01;
      lineArray[item].position.y =Math.sin(elapseTime + x) * 100;
    }
    // カメラコントローラーを更新
    controls.update();
    renderer.render(scene, camera); 
    stats.end();
    requestAnimationFrame(tick);
  }
  tick();
  
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



