const width = window.innerWidth;
const height = window.innerHeight;


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

// GUI==============================
var GUI = lil.GUI;
const gui = new GUI();




// カーソル取得==============================
const cursor = {};
cursor.x = 0;
cursor.y = 0;

window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / width - 0.5;
  cursor.y = event.clientY / height - 0.5;
});


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

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, 1.0);
  camera.position.set(0, 0, 100);

  // グループを作成
  const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xdf6262,
    roughness: 0.1,
  });
  const mesh = new THREE.Mesh( geometry, material);
  mesh.rotation.z +=45;
  mesh.rotation.y +=90;
  mesh.rotation.x +=90;
  scene.add(mesh);


  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("../images/bg.jpg");
  scene.background = texture;

  // GUI
  gui.addColor(material,"color");
  gui.add(material,"roughness").min(0).max(1).step(0.1);

  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(0, 0, 2);
  scene.add(directionalLight);

// スクロールアニメーション
// const animeScript.push {
  
// }

// const animeScript.push {

// }

// ブラウザのスクロール率を取得

let scrollParcent = 0;
document.body.onscroll = () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  scrollParcent = (scrollTop / (scrollHeight - clientHeight) * 100);
  // console.log(scrollParcent);
}

  
  const clock = new THREE.Clock();
  // アニメ
  function scrollAnime() {
    let getDeltaTime = clock.getDelta();
    let elapseTime = clock.getElapsedTime();
    //常に回転
    // mesh.rotation.z +=0.01 * getDeltaTime;
    mesh.rotation.y +=0.1 * getDeltaTime;
    mesh.rotation.x +=0.05 * getDeltaTime;
    mesh.position.y = (Math.sin(elapseTime)) * 1.3;

    requestAnimationFrame(scrollAnime);
  }
  scrollAnime();

  // FPS監視
  function tick() {
    stats.begin();
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



