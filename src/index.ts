import * as itowns from 'itowns';
import WMSCapabilities from 'wms-capabilities';
import Fetcher from './Fetcher';
import GeotiffParser from './GeotiffParser';
import WCSSource from './WCSSource';


// SIS through wcs
const data = {
	coord: new itowns.Coordinates('EPSG:4326', -1.08, 13.082),
	source: {
		extent: new itowns.Extent('EPSG:4326', -2.57046, 2.80335, 0.3839, 15.0937),
		// name: 'toto:COVERAGE_SIS',
		name: 'toto:W002N13_4EGTFLT32_MTNE1_001',
		url: 'http://localhost:8080/geoserver/toto/wcs',
		version: '2.0.1',
		//noDataValue: -32.767,
	},
};



// ---------- CREATE THE VIEW : ----------

const placement = { coord: data.coord, range: 20000 };
const viewerDiv = document.getElementById('view-container');
const view = new itowns.GlobeView(viewerDiv, placement);


// ---------- DISPLAY A MAP ON THE VIEW : ----------

function addMap() {
	itowns.Fetcher.json('./resources/layers/OPENSM.json').then(function _(config) {
		config.source = new itowns.TMSSource(config.source);
		view.addLayer(
			new itowns.ColorLayer('Map', config),
		);
	});
}


// ---------- DISPLAY TIFF : ----------

function addGeotiff() {
	const tifSource = new WCSSource({
		...data.source,
		crs: 'EPSG:4326',
		fetcher: Fetcher.geotiff,
		parser: GeotiffParser.parse,
		format: 'image/geotiff',  // TODO: this should not be needed. iTowns needs fixing...
	});

	const tifLayer = new itowns.ColorLayer('tiff', {
		source: tifSource,
	});
	view.addLayer(tifLayer);
}

// addMap();
addGeotiff();

