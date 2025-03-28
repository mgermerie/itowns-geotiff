import * as itowns from 'itowns';
import { zoomToLayer } from '../OGC3DTilesHelper.js';


// ---------- CREATE THE VIEW: ----------

const placement = {
	coord: new itowns.Coordinates('EPSG:4326', 2.351323, 48.856712),
	range: 25000000,
}
const viewContainer = document.getElementById('view-container');
const view = new itowns.GlobeView(viewContainer, placement);


// ---------- DISPLAY A MAP: ----------

itowns.Fetcher.json('../resources/layers/OPENSM.json').then(function (config) {
	config.source = new itowns.TMSSource(config.source);
	const mapLayer = new itowns.ColorLayer('Map', config);
	view.addLayer(mapLayer);
});


// ---------- DISPLAY ELEVATION: ----------

itowns.Fetcher.json('../resources/layers/WORLD_DTM.json').then(
	(config) => {
		config.source = new itowns.WMTSSource(config.source);
		const elevationLayer = new itowns.ElevationLayer(config.id, config);
		view.addLayer(elevationLayer);
	}
);


// ---------- DISPLAY 3D Tiles: ----------

itowns.enableDracoLoader('../resources/libs/draco/');
itowns.enableKtx2Loader('../resources/lib/basis/', view.renderer);

function addTileset(url) {
	const tilesSource = new itowns.OGC3DTilesSource({
		url,
	});

	const tilesLayer = new itowns.OGC3DTilesLayer(
		'3d-tiles',
		{
			source: tilesSource,
		},
	);

	view.addLayer(tilesLayer).then(
		(layer) => {
			zoomToLayer(view, layer);
		},
	);
}


const form = document.getElementById('source-widget');
form.addEventListener(
	'submit',
	(event) => {
		event.preventDefault();
		const formData = new FormData(form);
		const url = formData.get('source-url');

		addTileset(url);

		document.getElementById('source-information').classList.remove('hidden');
		const info = document.createElement('li');
		info.innerHTML = `${url}`;
		document.getElementById('source-list').appendChild(info);
	},
);

