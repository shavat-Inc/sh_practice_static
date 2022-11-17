
class Stage {
  constructor() {
    this.renderParam = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.geometry = null;
    this.material = null;
    this.mesh = null;
    
    this.isInitialized = false;
  }
  
  init() {
    this._setScene();
    this._setRender();
    this._setCamera();
    
    this.isInitialized = true;
  }
  
  _setScene() {
    this.scene = new THREE.Scene();
  }
  
  _setRender() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('webgl-canvas')
    });
    this.renderer.setSize( this.renderParam.width, this.renderParam.height );
  }
  
  _setCamera() {
    
    if( !this.isInitialized ){
      this.camera = new THREE.OrthographicCamera(
        -1,1,1,-1,0,1
      );
    }
    
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    this.camera.aspect = windowWidth / windowHeight;
    
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( windowWidth, windowHeight );
  }
  
  _render() {
    this.renderer.render( this.scene, this.camera );
  }
  
  onResize() {
    this._setCamera();
  }
  
  onRaf() {
    this._render();
  }
}

class Mesh {
  constructor(stage) {
    this.geometryParm = {};
    
    this.materialParam = {
      useWireframe: false
    };
    
    this.uniforms = {
      time: { type: "e", value:1 }
    };
    
    this.stage = stage;
    
    this.mesh = null;
    
    this.windowWidth = 0;
    this.windowHeight = 0;
    
    this.windowWidthHalf = 0;
    this.windowHeightHalf = 0;
  }
  
  init() {
    this._setMesh();
  }
  
  _setMesh() {
    const geometry = new THREE.PlaneGeometry(2, 1.5);
    const material = new THREE.RawShaderMaterial({
      vertexShader: document.getElementById("js-vertex-shader").textContent,
      fragmentShader: document.getElementById("js-fragment-shader").textContent,
      uniforms: this.uniforms
    });
    
    this.mesh = new THREE.Mesh(geometry, material);
    
    this.stage.scene.add(this.mesh);
  }
  
  _render() {
    this.uniforms.time.value -= 0.03;
  }
  
  onRaf() {
    this._render();
  }
}

(() => {
  const stage = new Stage();
  
  stage.init();
  
  const mesh = new Mesh(stage);
  
  mesh.init();
  
  window.addEventListener("resize", () => {
    stage.onResize();
  });
  
  const _raf = () => {
    window.requestAnimationFrame(() => {
      stage.onRaf();
      mesh.onRaf();

      _raf();
    });
  };
  
  _raf();
})();