// 注意点---------------------------------------
// 煙の画像のライセンスに注意

 // style==============================
const parentStyle = document.querySelector('.js-canvas-parent');
const elementStyle = document.querySelector('.js-canvas');
Object.assign(parentStyle.style,{
  minHeight:"100vh",
  background:"#000",
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
});
Object.assign(elementStyle.style,{
  borderTop:"1px solid #5050505c",
  borderBottom:"1px solid #5050505c",
});

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
window.addEventListener('DOMContentLoaded', init);
function init() {
  const canvasElement = document.querySelector('#myCanvas');
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement,
    antialias: true,
    devicePixelRatio: window.devicePixelRatio,
  });
  //シーン
  const scene = new THREE.Scene();
  //カメラ
  const camera = new THREE.PerspectiveCamera( 25, 1.0, 1, 1000 );
  camera.position.set(0, 0, 1000);
  scene.add(camera);
  // ライト
  const light = new THREE.DirectionalLight(0xffffff,0.8);
  light.position.set(-1,0,1);
  scene.add(light);

  // スモークのテクスチャ
  const smokeLoader = new THREE.TextureLoader();
  const smokeTexture = smokeLoader.load('../images/Smoke-Element.png');

  // スモークのジオメトリ、マテリアル
  const smokeGeo = new THREE.PlaneGeometry(400,400);
  const smokeMaterial = new THREE.MeshLambertMaterial({color: 0x3caacc, map: smokeTexture,opacity: 1, transparent: true});
  const smokeParticles = [];
  for (let i = 0; i < 100; i++) {
    const particle = new THREE.Mesh(smokeGeo,smokeMaterial);
      particle.position.x = (Math.random() - 0.5) * 2000;
      particle.position.y = (Math.random() - 0.5) * 900;
      particle.rotation.z = Math.random() * 360;
      smokeParticles.push(particle);
      scene.add(particle);
  }

  const dolphinGeo = new THREE.PlaneGeometry(500,500);
  THREE.ImageUtils.crossOrigin = ''; 
  const dolphinTexture = smokeLoader.load('../images/dolphin.png');
  const dolphinMaterial = new THREE.MeshLambertMaterial({color: 0x3caacc, opacity: 1, map: dolphinTexture, transparent: true, blending: THREE.AdditiveBlending})
  const dolphin = new THREE.Mesh(dolphinGeo,dolphinMaterial);
  scene.add(dolphin);

  var clock = new THREE.Clock();
  function tick() {
    stats.begin();
    delta = clock.getDelta();
    evolveSmoke();
    renderer.render(scene, camera);
    stats.end();
    requestAnimationFrame(tick);
  }
  tick(); 

  function evolveSmoke() {
    var sp = smokeParticles.length;
    while(sp--) {
        smokeParticles[sp].rotation.z += (delta * 0.1);
    }
  }
  // レンダラーのリサイズ
  function onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    // カメラのアスペクト比を正す
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  onResize();
  window.addEventListener('resize', onResize);
}



