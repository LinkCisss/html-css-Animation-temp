/*
 * @Author: tiandong
 * @Date:   2016-04-26 18:17:15
 * @Last Modified by:   tiandong
 * @Last Modified time: 2016-04-26 18:17:15
 */

window.onload = function() {
	var container, stats;
	var camera, scene, renderer;
	var group;
	var mouseX = 0,
		mouseY = 0;
	container = document.getElementById('earth');
	var position = container.getBoundingClientRect()
	var earthW = position.width;
	var earthH = position.height;

	var windowHalfX = earthW / 2;
	var windowHalfY = earthH / 2;

	var rate = earthW/earthH;

	init();
	animate();

	function init() {

		camera = new THREE.PerspectiveCamera(60, earthW / earthH, 1, 2000);
		camera.position.z = 430;

		scene = new THREE.Scene();

		group = new THREE.Group();
		scene.add(group);


		var texture= THREE.ImageUtils.loadTexture( "earth_full-2.png" )
		texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
		var geometry = new THREE.SphereGeometry(200, 20, 20);


		var material = new THREE.MeshLambertMaterial( { map: texture});

		var mesh = new THREE.Mesh(geometry, material);
		group.add(mesh);

		var light;
		function initLight() {
			light = new THREE.DirectionalLight(0xffffff, 2.0, 2.0);//设置平行光源
			light.position.set( 200, 0, 200 );//设置光源向量
			scene.add(light);// 追加光源到场旿
		}
		initLight()

		if ( window.WebGLRenderingContext ) { renderer = new THREE.WebGLRenderer( {  alpha: true } ); }

		else { renderer = new THREE.CanvasRenderer(); }

		renderer.setSize(earthW, earthH);
		//renderer.setClearColor(0x000000, 0);

		container.appendChild(renderer.domElement);
		
		var canvas = renderer.domElement;

		var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
		
		//gl.clearColor(0.0, 0.0, 0.0, 0.0);

		window.addEventListener('resize', onWindowResize, false);

	}

	function onWindowResize() {
		position = container.getBoundingClientRect()
		earthW = position.width;
		earthH = position.height
		camera.aspect =earthW/earthH;
		camera.updateProjectionMatrix();
		renderer.setSize(earthW, earthH);

	}

	function animate() {
		requestAnimationFrame(animate);
		render();
	}

	function render() {
		camera.position.x += (mouseX - camera.position.x) * 0.05;
		camera.position.y += (-mouseY - camera.position.y) * 0.05;
		camera.lookAt(scene.position);

		group.rotation.y += 0.005;

		renderer.render(scene, camera);

	}
}