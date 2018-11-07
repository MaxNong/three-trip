<template>
  <div id="three" class="viewport"></div>
</template>

<script>
import "../../static/three/examples/js/controls/OrbitControls"
import "../../static/three/examples/js/loaders/OBJLoader"
let scene, camera, renderer, controls, light
export default {
  data() {
    return {}
  },
  mounted() {
    this.setScene()
    this.setCamera()
    this.setCameraControl()
    this.setRenderer()
    this.addPlane()
    this.addLight()
    this.addZdObj()
    this.addArrowHelper()
    this.render()
  },
  methods: {
    render: function () {
      // addCube()
      renderer.render(scene, camera)
      controls.update();
      requestAnimationFrame(this.render)
    },
    //设置场景
    setScene: function () {
      //设置场景
      scene = new THREE.Scene()
      scene.background = new THREE.Color(0x0C0D0E);


      // scene.background = new THREE.CubeTextureLoader()
      // 	.setPath('/static/textures/skyboxsun25deg/')
      // 	.load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);

      // scene.background = new THREE.CubeTextureLoader()
      // .setPath('/static/textures/sky/')
      // .load(['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg']);

      // scene.fog = new THREE.Fog(0xa0a0a0, 500, 1000);
    },
    //设置相机
    setCamera: function () {
      // 设置相机
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000)
      camera.position.x = 0
      camera.position.y = 800
      camera.position.z = 800
      camera.lookAt(scene.position)
      // var helper = new THREE.CameraHelper( camera );
      // scene.add( helper );
    },
    setRenderer: function () {
      // 设置渲染器
      renderer = new THREE.WebGLRenderer()
      renderer.setClearColor(new THREE.Color(0x35B558, 1.0))
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.shadowMapEnabled = true
      document.getElementById('three').appendChild(renderer.domElement)
      // document.body.appendChild(renderer.domElement)
    },
    //添加灯光
    addLight: function () {
      light = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
      light.position.set(0, 200, 0);
      scene.add(light);
      light = new THREE.DirectionalLight(0xffffff, 0.8);
      light.position.set(0, 20, 10);
      light.castShadow = true;
      light.shadow.camera.top = 18;
      light.shadow.camera.bottom = -10;
      light.shadow.camera.left = -12;
      light.shadow.camera.right = 12;
      scene.add(light);
    },
    addPlane: function () {
      // var planeGeometry = new THREE.PlaneBufferGeometry(1000, 1000, 1, 1);
      // var material = new THREE.MeshPhongMaterial({
      // 	color: 0x999999,
      // 	depthWrite: false
      // });
      // var ground = new THREE.Mesh(planeGeometry, material);
      // ground.position.set(0, -5, 0);
      // ground.rotation.x = -Math.PI / 2;
      // ground.receiveShadow = true;
      // scene.add(ground);


      // var grid = new THREE.GridHelper(10000, 10000);
      // // grid.position.z = -1000;
      // grid.material.opacity = 1;
      // // grid.material.transparent = true;
      // scene.add(grid);


      var gridHelper = new THREE.GridHelper(1000, 50);
      // gridHelper.position.y = - 150;
      // gridHelper.position.x = - 150;
      scene.add(gridHelper);
    },
    //设置相机控制
    setCameraControl: function () {
      controls = new THREE.OrbitControls(camera)
    },
    addArrowHelper: function () {
      // var dir = new THREE.Vector3(1, 2, 0);

      // //normalize the direction vector (convert to vector of length 1)
      // dir.normalize();

      // var origin = new THREE.Vector3(0, 0, 0);
      // var length = 1;
      // var hex = 0x0C0D0E;

      // var arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);
      // scene.add(arrowHelper);

      var axesHelper = new THREE.AxesHelper(1000);
      scene.add(axesHelper);


      //添加3dobject并查看对象碰撞体大小
      var sphere = new THREE.SphereGeometry();
      var object = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial(0xff0000));
      var box = new THREE.BoxHelper(object, 0xffff00);
      scene.add(box);

      // var light = new THREE.DirectionalLight(0xFFFFFF);
      // var helper = new THREE.DirectionalLightHelper(light, 5);
      // scene.add(helper);

      // let  geometry = new THREE.BoxGeometry(10, 10, 10, 2, 2, 2);
      // let material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      // let box1 = new THREE.Mesh(geometry, material);
      // let helper = new THREE.FaceNormalsHelper(box1, 2, 0x00ff00, 1);
      // scene.add(box1);
      // scene.add(helper)

      var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
      var helper = new THREE.HemisphereLightHelper(light, 500);
      scene.add(helper);

      ar plane = new THREE.Plane( new THREE.Vector3( 1, 1, 0.2 ), 3 );
var helper = new THREE.PlaneHelper( plane, 1, 0xffff00 );
scene.add( helper );
    },
    //添加立方体
    addCube: function () {
      var cubeGeometry = new THREE.BoxGeometry(5, 5, 5)
      var cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xCCCFFF
      })
      var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
      cube.position.x = -30 + Math.round(Math.random() * planeGeometry.parameters.width)
      cube.position.y = Math.round(Math.random() * 5)
      cube.position.z = -20 + Math.round(Math.random() * planeGeometry.parameters.height)
      scene.add(cube)
    },
    //添加劫的obj
    addZdObj: function () {
      var loader = new THREE.OBJLoader();
      loader.load(
        '/static/obj/Zed_StormNinja.obj',
        function (object) {
          scene.add(object);
          var box = new THREE.BoxHelper(object, 0xffff00);
          scene.add(box);
        },
        function (xhr) {
          console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
          console.log('An error happened');
        }
      );
    }
  }
}
</script>

<style>
.viewport {
  font-size: 0;
}
</style>


