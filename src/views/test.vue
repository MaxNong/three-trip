<template>
  <div>ddd</div>
</template>
<script>
import "../../static/three/examples/js/controls/TrackballControls"
export default {
  data() {
    return {}
  },
  created() {
    var renderer, scene, camera;
    var INTERSECTED;
    var raycaster;
    var mouse;
    var controls;
    // 边框线的高度
    var lineHeight = 1.75;
    // 块的高度
    var cubeHeight = 1.5;
    function init() {
      renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      renderer.setClearColor(0xF1F2F7);
      renderer.setSize(window.innerWidth, window.innerHeight);
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xF1F2F7);
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.lookAt(new THREE.Vector3(20, 0, 20));
      camera.position.set(0, 40, 50);
      // 光线的照射
      var ambiColor = "#f2f2f2";
      var spotLight = new THREE.SpotLight(ambiColor);
      spotLight.position.set(-100, 100, -100);
      scene.add(spotLight);
      var spotLight2 = new THREE.SpotLight(ambiColor);
      spotLight2.position.set(100, 100, 150);
      scene.add(spotLight2);

      controls = new THREE.TrackballControls(camera);
      controls.rotateSpeed = 1.0;
      controls.zoomSpeed = 1.2;
      controls.panSpeed = 0.8;
      controls.noZoom = false;
      controls.noPan = false;
      controls.staticMoving = true;
      controls.dynamicDampingFactor = 0.3;

      raycaster = new THREE.Raycaster();
      mouse = new THREE.Vector2();
      document.body.appendChild(renderer.domElement);
      document.addEventListener('click', onDocumentMouseClick, false);
      creatCube();
      render();
    }

    function onDocumentMouseClick(event) {
      event.preventDefault();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    function creatCube() {
      // 材质定义
      var yellow = [];
      // 右侧面
      yellow.push(new THREE.MeshLambertMaterial({ color: "#F8D3A5" }));
      // 左侧面
      yellow.push(new THREE.MeshLambertMaterial({ color: "#F8D3A5" }));
      // 顶侧面
      yellow.push(new THREE.MeshBasicMaterial({ color: "#F8D3A5", transparent: true, opacity: 0.8 }));
      // 地侧面
      yellow.push(new THREE.MeshLambertMaterial({ color: "#F8D3A5" }));
      // 前侧面
      yellow.push(new THREE.MeshLambertMaterial({ color: "#F8D3A5" }));
      // 后侧面
      yellow.push(new THREE.MeshLambertMaterial({ color: "#F8D3A5" }));

      var white = [];
      white.push(new THREE.MeshLambertMaterial({ color: "#fff" }));
      white.push(new THREE.MeshLambertMaterial({ color: "#fff" }));
      white.push(new THREE.MeshBasicMaterial({ color: "#fff" }));
      white.push(new THREE.MeshLambertMaterial({ color: "#fff" }));
      white.push(new THREE.MeshLambertMaterial({ color: "#fff" }));
      white.push(new THREE.MeshLambertMaterial({ color: "#fff" }));

      var purple = [];
      purple.push(new THREE.MeshLambertMaterial({ color: "#E3B7F7" }));
      purple.push(new THREE.MeshLambertMaterial({ color: "#E3B7F7" }));
      purple.push(new THREE.MeshBasicMaterial({ color: "#E3B7F7", transparent: true, opacity: 0.8 }));
      purple.push(new THREE.MeshLambertMaterial({ color: "#E3B7F7" }));
      purple.push(new THREE.MeshLambertMaterial({ color: "#E3B7F7" }));
      purple.push(new THREE.MeshLambertMaterial({ color: "#E3B7F7" }));

      var orange = [];
      orange.push(new THREE.MeshLambertMaterial({ color: "#FFC965" }));
      orange.push(new THREE.MeshLambertMaterial({ color: "#FFC965" }));
      orange.push(new THREE.MeshBasicMaterial({ color: "#FFC965", transparent: true, opacity: 0.5 }));
      orange.push(new THREE.MeshLambertMaterial({ color: "#FFC965" }));
      orange.push(new THREE.MeshLambertMaterial({ color: "#FFC965" }));
      orange.push(new THREE.MeshLambertMaterial({ color: "#FFC965" }));


      // 底部左侧的地板
      var cubeBottomLeftGeometry = new THREE.BoxGeometry(16, 0.5, 42);
      var cubeBottomLeftMaterial = new THREE.MeshFaceMaterial(white);
      var cubeBottomLeft = new THREE.Mesh(cubeBottomLeftGeometry, cubeBottomLeftMaterial);
      cubeBottomLeft.position.x = -10;
      cubeBottomLeft.position.y = 0;
      cubeBottomLeft.position.z = 0;
      scene.add(cubeBottomLeft);

      // 底部右侧的地板
      var cubeBottomRightGeometry = new THREE.BoxGeometry(28, 0.5, 16);
      var cubeBottomRightMaterial = new THREE.MeshFaceMaterial(white);
      var cubeBottomRight = new THREE.Mesh(cubeBottomRightGeometry, cubeBottomRightMaterial);
      cubeBottomRight.position.x = 12;
      cubeBottomRight.position.y = 0;
      cubeBottomRight.position.z = 13;
      scene.add(cubeBottomRight);


      // 方块1的下线1
      var line11Material = new THREE.LineBasicMaterial({ color: "#F7A540" });
      var line11Geometry = new THREE.Geometry();
      line11Geometry.vertices.push(new THREE.Vector3(-17.5, lineHeight, 20.5));
      line11Geometry.vertices.push(new THREE.Vector3(-14.5, lineHeight, 20.5));
      var line11 = new THREE.Line(line11Geometry, line11Material);
      scene.add(line11);
      // 方块1的左线2
      var line12Material = new THREE.LineBasicMaterial({ color: "#F7A540" });
      var line12Geometry = new THREE.Geometry();
      line12Geometry.vertices.push(new THREE.Vector3(-17.5, lineHeight, 20.5));
      line12Geometry.vertices.push(new THREE.Vector3(-17.5, lineHeight, 8.5));
      var line12 = new THREE.Line(line12Geometry, line12Material);
      scene.add(line12);
      // 方块1的右线3
      var line13Material = new THREE.LineBasicMaterial({ color: "#F7A540" });
      var line13Geometry = new THREE.Geometry();
      line13Geometry.vertices.push(new THREE.Vector3(-14.5, lineHeight, 8.5));
      line13Geometry.vertices.push(new THREE.Vector3(-14.5, lineHeight, 20.5));
      var line13 = new THREE.Line(line13Geometry, line13Material);
      scene.add(line13);
      // 方块1的上线4
      var line14Material = new THREE.LineBasicMaterial({ color: "#F7A540" });
      var line14Geometry = new THREE.Geometry();
      line14Geometry.vertices.push(new THREE.Vector3(-17.5, lineHeight, 8.5));
      line14Geometry.vertices.push(new THREE.Vector3(-14.5, lineHeight, 8.5));
      var line14 = new THREE.Line(line14Geometry, line14Material);
      scene.add(line14);


      // 方块2的下线1
      var line21Material = new THREE.LineBasicMaterial({ color: "#B42EF7" });
      var line21Geometry = new THREE.Geometry();
      line21Geometry.vertices.push(new THREE.Vector3(-9.5, lineHeight, 20.5));
      line21Geometry.vertices.push(new THREE.Vector3(-14.5, lineHeight, 20.5));
      var line21 = new THREE.Line(line21Geometry, line21Material);
      scene.add(line21);
      // 方块2的右线3
      var line22Material = new THREE.LineBasicMaterial({ color: "#B42EF7" });
      var line22Geometry = new THREE.Geometry();
      line22Geometry.vertices.push(new THREE.Vector3(-9.5, lineHeight, 20.5));
      line22Geometry.vertices.push(new THREE.Vector3(-9.5, lineHeight, 13.5));
      var line22 = new THREE.Line(line22Geometry, line22Material);
      scene.add(line22);
      // 方块2的左线2 与方块1右线重叠 取消
      /*var line23Material = new THREE.LineBasicMaterial({color:"#B42EF7"});
      var line23Geometry = new THREE.Geometry();
      line23Geometry.vertices.push(new THREE.Vector3(-13.7,lineHeight,15.3));
      line23Geometry.vertices.push(new THREE.Vector3(-13.7,lineHeight,22));
      var line23 = new THREE.Line(line23Geometry, line23Material);
      scene.add(line23);*/
      // 方块2的上线4
      var line24Material = new THREE.LineBasicMaterial({ color: "#B42EF7" });
      var line24Geometry = new THREE.Geometry();
      line24Geometry.vertices.push(new THREE.Vector3(-9.5, lineHeight, 13.5));
      line24Geometry.vertices.push(new THREE.Vector3(-14.5, lineHeight, 13.5));
      var line24 = new THREE.Line(line24Geometry, line24Material);
      scene.add(line24);


      // 方块1
      var face1Material = new THREE.MeshFaceMaterial(yellow);
      var cube1Geom = new THREE.BoxGeometry(3, cubeHeight, 12);
      var cube1 = new THREE.Mesh(cube1Geom, face1Material);
      cube1.position.x = -16;
      cube1.position.y = 1;
      cube1.position.z = 14.5;
      scene.add(cube1);

      // 方块2
      var face2Material = new THREE.MeshFaceMaterial(purple);
      var cube2Geom = new THREE.BoxGeometry(5, cubeHeight, 7);
      var cube2 = new THREE.Mesh(cube2Geom, face2Material);
      cube2.position.x = -12;
      cube2.position.y = 1.;
      cube2.position.z = 17;
      scene.add(cube2);

    }

    function render() {
      controls.update();
      requestAnimationFrame(render);
      renderer.render(scene, camera);
      raycaster.setFromCamera(mouse, camera);
      var intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length > 0) {
        if (INTERSECTED !== intersects[0].object) {
          // 判断对象是否是mesh 并且是有六个面材质的
          if (INTERSECTED && INTERSECTED instanceof THREE.Mesh && INTERSECTED.material.length === 6) {
            for (var i = 0; i < 6; i++) {
              INTERSECTED.material[i].color.setHex(INTERSECTED.currentHex);
            }
          }
          INTERSECTED = intersects[0].object;
          if (INTERSECTED instanceof THREE.Mesh && INTERSECTED.material.length === 6) {
            for (var i = 0; i < 6; i++) {
              INTERSECTED.currentHex = INTERSECTED.material[i].color.getHex();
              // 如果是底面 因为底面的颜色获取后打印结果为：16777215
              if (INTERSECTED.currentHex !== 16777215)
                INTERSECTED.material[i].color.set("#FFC965");
            }
          }
        }
      } else {
        if (INTERSECTED && INTERSECTED instanceof THREE.Mesh && INTERSECTED.material.length === 6) {
          for (var i = 0; i < 6; i++) {
            INTERSECTED.material[i].color.set(INTERSECTED.currentHex);
          }
        }
        INTERSECTED = null;
      }
    }
    init();
  }
}
</script>

