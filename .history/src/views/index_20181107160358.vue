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
      // scene.background = new THREE.Color(0xa0a0a0);
      

			// scene.background = new THREE.CubeTextureLoader()
			// 	.setPath('/static/textures/skyboxsun25deg/')
      // 	.load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);
      
      	scene.background = new THREE.CubeTextureLoader()
				.setPath('/static/textures/sky/')
				.load(['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg']);
			// scene.fog = new THREE.Fog(0xa0a0a0, 500, 1000);
		},
		//设置相机
		setCamera: function () {
			// 设置相机
			camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
			camera.position.x = 0
			camera.position.y = 70
			camera.position.z = 200
			camera.lookAt(scene.position)
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
      

			var grid = new THREE.GridHelper(2000, 2000);
			grid.position.z = -1000;
			grid.material.opacity = 0.2;
			grid.material.transparent = true;
			scene.add(grid);
		},
		//设置相机控制
		setCameraControl: function () {
			controls = new THREE.OrbitControls(camera)
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


