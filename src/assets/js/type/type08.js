function ImagePixel(path, w, h, ratio) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const width = w;
  const height = h;
  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(path, 0, 0);
  const data = ctx.getImageData(0, 0, width, height).data;
  const position = [];
  const color = [];
  const alpha = [];

  for (let y = 0; y < height; y += ratio) {
    for (let x = 0; x < width; x += ratio) {
      const index = (y * width + x) * 4;
      const r = data[index] / 255;
      const g = data[index + 1] / 255;
      const b = data[index + 2] / 255;
      const a = data[index + 3] / 255;

      const pX = x - width / 2;
      const pY = -(y - height / 2);
      const pZ = 0;

      position.push(pX, pY, pZ), color.push(r, g, b), alpha.push(a);
    }
  }

  return { position, color, alpha };
}

class Stage {
  constructor() {
    this.renderParam = {
      clearColor: 0x000000,
      width: window.innerWidth,
      height: window.innerHeight
    };
    this.cameraParam = {
      fov: 45,
      near: 0.1,
      far: 2000,
      lookAt: new THREE.Vector3(0, 0, 0),
      x: 0,
      y: 0,
      z: 1000
    };

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.isInitialized = false;
    this.orbitcontrols = null;
    this.isDev = false;
  }

  init() {
    this._setScene();
    this._setRender();
    this._setCamera();
    this._setDev();
  }

  _setScene() {
    this.scene = new THREE.Scene();
  }

  _setRender() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(new THREE.Color(this.renderParam.clearColor));
    this.renderer.setSize(this.renderParam.width, this.renderParam.height);
    const wrapper = document.querySelector("#webgl");
    wrapper.appendChild(this.renderer.domElement);
  }

  _setCamera() {
    if (!this.isInitialized) {
      this.camera = new THREE.PerspectiveCamera(
        0,
        0,
        this.cameraParam.near,
        this.cameraParam.far
      );

      this.camera.position.set(
        this.cameraParam.x,
        this.cameraParam.y,
        this.cameraParam.z
      );
      this.camera.lookAt(this.cameraParam.lookAt);

      this.isInitialized = true;
    }

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    this.camera.aspect = windowWidth / windowHeight;
    this.camera.fov = this.cameraParam.fov;

    this.camera.updateProjectionMatrix();
    this.renderer.setSize(windowWidth, windowHeight);
  }

  _setDev() {
    this.orbitcontrols = new THREE.OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    this.orbitcontrols.enableDamping = true;
    this.isDev = true;
  }

  _render() {
    this.renderer.render(this.scene, this.camera);
    if (this.isDev) this.orbitcontrols.update();
  }

  onResize() {
    this._setCamera();
  }

  onRaf() {
    this._render();
  }
}

class Particle {
  constructor(stage) {
    this.stage = stage;
    this.promiseList = [];
    this.pathList = [
      "../images/fox.jpg"
    ];
    this.imageList = [];
  }

  init() {
    this.pathList.forEach((image) => {
      this.promiseList.push(
        new Promise((resolve) => {
          const img = new Image();
          img.src = image;
          img.crossOrigin = "anonymous";

          img.addEventListener("load", () => {
            this.imageList.push(ImagePixel(img, 600, 400, 5.0));
            resolve();
          });
        })
      );
    });
    Promise.all(this.promiseList).then(() => {
      this._setMesh();
      this._setAutoPlay();
    });
  }

  _setMesh() {
    const geometry = new THREE.BufferGeometry();
    const position = new THREE.BufferAttribute(
      new Float32Array(this.imageList[0].position),
      3
    );
    const color = new THREE.BufferAttribute(
      new Float32Array(this.imageList[0].color),
      3
    );
    const alpha = new THREE.BufferAttribute(
      new Float32Array(this.imageList[0].alpha),
      1
    );
    geometry.setAttribute("position", position);
    geometry.setAttribute("color", color);
    geometry.setAttribute("alpha", alpha);

    const material = new THREE.RawShaderMaterial({
      vertexShader: document.querySelector("#js-vertex-shader").textContent,
      fragmentShader: document.querySelector("#js-fragment-shader").textContent,
      uniforms: {
        u_ratio: { type: "f", value: 0.0 }
      },
      transparent: true
    });
    this.mesh = new THREE.Points(geometry, material);
    this.stage.scene.add(this.mesh);
  }

  _setDiffusion() {
    gsap.to(this.mesh.material.uniforms.u_ratio, {
      value: 1.0,
      duration: 2,
      ease: "power1.inOut",
      repeat: 1,
      yoyo: true
    });
  }

  _setAutoPlay() {
    this._setDiffusion();

    gsap.to(
      {},
      {
        ease: "none",
        duration: 4.2,
        repeat: -1.0,
        onRepeat: () => {
          this._setDiffusion();
        }
      }
    );
  }

  _render() {
    //
  }

  onResize() {
    //
  }

  onRaf() {
    this._render();
  }
}

class Webgl {
  constructor() {
    const stage = new Stage();
    stage.init();

    const particle = new Particle(stage);
    particle.init();

    window.addEventListener("resize", () => {
      stage.onResize();
      particle.onResize();
    });

    const _raf = () => {
      window.requestAnimationFrame(() => {
        _raf();

        stage.onRaf();
        particle.onRaf();
      });
    };
    _raf();
  }
}

new Webgl();