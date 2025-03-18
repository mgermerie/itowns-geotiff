import {
	AxesHelper,
	PerspectiveCamera,
	Scene,
	WebGLRenderer,
	Sphere,
	// Object3D,
	Group,
	Quaternion,
	Vector3,
	Matrix4,
	AmbientLight,
} from 'three';

import {
	DRACOLoader,
} from 'three/addons/loaders/DRACOLoader.js';
import {
	KTX2Loader,
} from 'three/addons/loaders/KTX2Loader.js';

import {
	TilesRenderer,
	EnvironmentControls,
} from '3d-tiles-renderer';
import {
	GLTFExtensionsPlugin,
} from '3d-tiles-renderer/plugins';


type CameraOptions = {
	fov?: number,
	near?: number,
	far?: number,
	position?: Vector3,
};


const DEFAULT_CAMERA = {
	fov: 30,
	near: 0.1,
	far: 100000,
	position: new Vector3(500, 250, 500),
};


class TilesViewer {
	container: HTMLDivElement;
	scene: Scene;
	renderer: WebGLRenderer;
	camera: PerspectiveCamera;
	controls: EnvironmentControls;

	tiles: Array<TilesRenderer>;
	dracoLoader: DRACOLoader;
	ktxLoader:KTX2Loader;


	constructor(
		container,
		cameraOptions: CameraOptions = DEFAULT_CAMERA,
	) {
		this.container = container;

		// Scene
		this.scene = new Scene();

		const axesHelper = new AxesHelper( 10000 );
		this.scene.add( axesHelper );

		// Renderer
		this.renderer = new WebGLRenderer();
		this.renderer.setSize(this.getWidth(), this.getHeight());

		container.appendChild(this.renderer.domElement);

		// Camera
		this.camera = new PerspectiveCamera(
			cameraOptions.fov || DEFAULT_CAMERA.fov,
			this.getWidth() / this.getHeight(),
			cameraOptions.near || DEFAULT_CAMERA.near,
			cameraOptions.far || DEFAULT_CAMERA.far,
		);
		this.camera.position.copy(
			cameraOptions.position || DEFAULT_CAMERA.position,
		);
		this.camera.lookAt(0, 0, 0);

		// Controls
		this.controls = new EnvironmentControls(
			this.scene,
			this.camera,
			this.renderer.domElement,
		);

		// Lights
		const light = new AmbientLight(0x404040, 40);
		this.scene.add(light);

		// Tiles
		this.dracoLoader = new DRACOLoader().setDecoderPath('/resources/libs/draco/');
		this.ktxLoader = new KTX2Loader().setTranscoderPath('/resources/libs/basis/');
		this.ktxLoader.detectSupport(this.renderer);

		this.tiles = [];

		this.onContainerResize();
		window.addEventListener('resize', this.onContainerResize.bind(this), false);
	}


	addTileset(url) {
		const tile = new TilesRenderer(url);
		tile.registerPlugin(
			new GLTFExtensionsPlugin({
				dracoLoader: this.dracoLoader,
				ktxLoader: this.ktxLoader,
			}),
		);
		this.tiles.push(tile);

		const pivot = new Group();
		pivot.add(tile.group);
		this.scene.add(pivot);

		tile.addEventListener('load-tile-set', () => {
			const quaternion = new Quaternion();
			const sphere = new Sphere();
			const vector3 = new Vector3();
			const matrix4 = new Matrix4();

			// Translate tiles closer to scene origin
			tile.getBoundingSphere(sphere);
			tile.group.position.add(sphere.center.negate());

			// Rotate
			vector3.copy(sphere.center).normalize();
			quaternion.setFromUnitVectors(
				vector3,
				new Vector3(0, 0, 1),
			);
			matrix4.makeRotationFromQuaternion(quaternion);

			pivot.applyMatrix4(matrix4);

			matrix4.makeRotationX(Math.PI / 2);
			pivot.applyMatrix4(matrix4);
		});

	}


	getWidth() {
		return this.container.clientWidth;
	}


	getHeight() {
		return this.container.clientHeight;
	}


	onContainerResize() {
		this.camera.aspect = this.getWidth() / this.getHeight();
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(this.getWidth(), this.getHeight());
		// this.renderer.setPixelRatio(window.devicePixelRatio);
	}


	render() {
		requestAnimationFrame( this.render.bind(this) );

		this.controls.update();
		this.camera.updateMatrixWorld();

		this.tiles.forEach(
			(tile) => {
				tile.setCamera(this.camera);
				tile.setResolutionFromRenderer(this.camera, this.renderer);
				tile.update();
			},
		);

		this.renderer.render(this.scene, this.camera);
	}
}


export { TilesViewer };

