import * as THREE from 'three'

window.THREE = THREE
var scene = new THREE.Scene()

var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.x = -30
camera.position.y = 40
camera.position.z = 30
camera.lookAt(scene.position)


var renderer = new THREE.WebGLRenderer()
renderer.setClearColor(new THREE.Color(0x35B558, 1.0))
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMapEnabled = true
document.body.appendChild(renderer.domElement)

var planeGeometry = new THREE.PlaneGeometry(70, 50, 1, 1)
var planeMeterial = new THREE.MeshBasicMaterial({
	color: 0x35B558
})
var plane = new THREE.Mesh(planeGeometry, planeMeterial)

plane.rotation.x = -.5 * Math.PI;
plane.position.x = 0
plane.position.y = 0
plane.position.z = 0
scene.add(plane)

var ambientLight = new THREE.AmbientLight(0x35B558)
scene.add(ambientLight)

var spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.x = -40
spotLight.position.y = 60
spotLight.position.z = -10
scene.add(spotLight)


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

renderer.render(scene, camera)

function render() {
	addCube()

	requestAnimationFrame(render)

}