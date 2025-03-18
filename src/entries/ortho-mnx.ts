import * as itowns from 'itowns';
import Fetcher from '../Fetcher';
import GeotiffParser from '../GeotiffParser';


// ---------- CREATE THE VIEW: ----------

const placement = {
	coord: new itowns.Coordinates('EPSG:4326', -1.08, 13.082),
	range: 20000,
};
const viewContainer = document.getElementById('view-container');
const view = new itowns.GlobeView(viewContainer, placement);


// ---------- DISPLAY ORTHO IMAGES: ----------

// TODO: DO
itowns.Fetcher.json('/resources/layers/OPENSM.json').then(function (config) {
	config.source = new itowns.TMSSource(config.source);
	const mapLayer = new itowns.ColorLayer('Map', config);

	// view.addLayer(mapLayer);
});


// ---------- DISPLAY MNX: ----------

const elevationSource = new itowns.WMSSource({
	crs: 'EPSG:4326',
	extent: new itowns.Extent('EPSG:4326', -2.57046, 2.80335, 0.3839, 15.0937),
	name: 'toto:W002N13_4EGTFLT32_MTNE1_001',
	url: 'http://localhost:8080/geoserver/toto/wms',
	version: '1.3.0',

	fetcher: Fetcher.geotiff,
	parser: GeotiffParser.parse,
	format: 'image/geotiff',  // TODO: this should not be needed. iTowns needs fixing...
});

const elevationLayer = new itowns.ColorLayer(
	'elevation',
	{ source: elevationSource },
);

view.addLayer(elevationLayer);

