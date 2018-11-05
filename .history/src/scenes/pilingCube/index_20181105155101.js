import * as THREE from 'three'
window.THREE = THREE
function initControl () {
 require("../../three/examples/js/controls/OrbitControls")
}

initControl()

console.log(window.THREE.OrbitControls, 888)

//设置场景
var scene = new THREE.Scene()
// scene.background = new THREE.Color(0xa0a0a0);
scene.background = new THREE.CubeTextureLoader()
         .setPath( '/cube/skyboxsun25deg/' )
         .load( [ 'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg' ] );
// scene.fog = new THREE.Fog(0xa0a0a0, 500, 1000);

// 设置相机
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.x = 0
camera.position.y = 70
camera.position.z = 200
camera.lookAt(scene.position)

var controls = new THREE.OrbitControls( camera )
controls.update();

// 设置渲染器
var renderer = new THREE.WebGLRenderer()
renderer.setClearColor(new THREE.Color(0x35B558, 1.0))
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMapEnabled = true
document.body.appendChild(renderer.domElement)

// 设置平面
// var planeGeometry = new THREE.PlaneGeometry(70, 50, 1, 1)
// var planeMeterial = new THREE.MeshBasicMaterial({
// 	color: 0x35B558
// }) 
// var plane = new THREE.Mesh(planeGeometry, planeMeterial)
// plane.rotation.x = -.5 * Math.PI;
// plane.position.x = 0
// plane.position.y = 0
// plane.position.z = 0
// scene.add(plane)

// var planeGeometry = new THREE.PlaneBufferGeometry(2000, 2000, 1, 1);
// var material = new THREE.MeshPhongMaterial({
// 	color: 0x999999,
// 	depthWrite: false
// });
// var ground = new THREE.Mesh(planeGeometry, material);
// ground.position.set(0, -5, 0);
// ground.rotation.x = -Math.PI / 2;
// ground.receiveShadow = true;
// scene.add(ground);
// var grid = new THREE.GridHelper(1000, 1000, 0x000000, 0x000000);
// grid.position.y = -5;
// grid.material.opacity = 0.2;
// grid.material.transparent = true;
// scene.add(grid);

//设置灯光
// var ambientLight = new THREE.AmbientLight(0x35B558)
// scene.add(ambientLight)

// //设置灯光
// var spotLight = new THREE.SpotLight(0xffffff)
// spotLight.position.x = -40
// spotLight.position.y = 60
// spotLight.position.z = -10
// scene.add(spotLight)

var light = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
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

//添加立方体
function addCube() {
	var cubeGeometry = new THREE.BoxGeometry(5, 5, 5)
	var cubeMaterial = new THREE.MeshLambertMaterial({
		color: 0xCCCFFF
	})
	var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
	cube.position.x = -30 + Math.round(Math.random() * planeGeometry.parameters.width)
	cube.position.y = Math.round(Math.random() * 5)
	cube.position.z = -20 + Math.round(Math.random() * planeGeometry.parameters.height)
	scene.add(cube)
}

render()

function render() {
	// addCube()
	renderer.render(scene, camera)
	controls.update();
	requestAnimationFrame(render)
}

export default render