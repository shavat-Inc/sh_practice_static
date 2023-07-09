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
    alpha:true,
    devicePixelRatio: window.devicePixelRatio,
  });
  
  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, 1.0);
  camera.position.set(0, 0, 100);

  // グループを作成
  const geometry = new THREE.PlaneGeometry(300, 300);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.5,
  });
  const mesh = new THREE.Mesh( geometry, material);
  mesh.position.set(150, 0, 0);
  scene.add(mesh);


  // グループを作成
  const geometry02 = new THREE.PlaneGeometry(300, 300);
  const material02 = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.5,
  });
  const mesh02 = new THREE.Mesh( geometry02, material02);
  mesh02.position.set(-150, 0, 0);

  scene.add(mesh02);

  // GUI
  gui.addColor(material,"color");
  gui.addColor(material02,"color");

// スポットライト光源を作成
// new THREE.SpotLight(色, 光の強さ, 距離, 照射角, ボケ具合, 減衰率)
const light = new THREE.SpotLight(0xFFFFFF,6, 300, Math.PI / 3, 10, 0.5);
scene.add(light);
light.position.set(0, 5, 10);


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
      wheelVal = scrollParcent;
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
      // mesh.position.x =(speed +150);
      mesh.position.x = scrollParcent * 0.07;
      // mesh02.position.x =(speed +150) * -1;
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



