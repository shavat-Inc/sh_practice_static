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
  camera.position.set(0, 0, 300);

  // グループを作成
  const geometry = new THREE.BoxGeometry(60, 60, 60);
  const material = new THREE.MeshStandardMaterial({
    color: 0x6699ff,
    roughness: 0.5,
  });
  const mesh = new THREE.Mesh( geometry, material);

  scene.add(mesh);
  // GUI
  gui.addColor(material,"color");



  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // ポイント光源
  const pointLight = new THREE.PointLight(0xffffff, 2, 1000);
  scene.add(pointLight);

  // ブラウザのスクロール率を取得
  let scrollParcent = 0;
  document.body.onscroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    scrollParcent = (scrollTop / (scrollHeight - clientHeight) * 100);
  }

  //マウスホイールを取得
  let wheelVal = 0;
  let speed = 0;
  window.addEventListener('wheel', (event) => {
    if(scrollParcent > 0 && scrollParcent  < 100) {
      wheelVal += event.deltaY * 0.0003;
      console.log(wheelVal);
    }
  });

  //スクロールアニメ
  const animeScript = [];
  animeScript.push ({
    start: 0,
    end: 100,
    function() {
      //イージング
      speed += wheelVal;
      wheelVal *= 0.94;
      mesh.rotation.y =speed;
    },
  });

  function playScrollAnime() {
    animeScript.forEach((anime) => {
      if(scrollParcent > 0 && scrollParcent  < 100)
      anime.function();
    });
  }

  function scrollAnime() {

    //常に回転
    mesh.rotation.z +=0.002;
    mesh.rotation.x +=0.001;
    playScrollAnime();
    requestAnimationFrame(scrollAnime);
  }
  scrollAnime();

  function tick() {
    stats.begin();
    // カメラコントローラーを更新
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



