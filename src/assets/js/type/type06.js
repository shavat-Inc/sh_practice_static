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


  const geometry = new THREE.PlaneGeometry( 30, 30 );

  // const material = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide} );
  const material = new THREE.RawShaderMaterial({
    vertexShader: document.getElementById( 'js-vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'js-fragmentShader' ).textContent,
    side: THREE.DoubleSide
  });

  const plane = new THREE.Mesh( geometry, material );

  scene.add( plane );

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