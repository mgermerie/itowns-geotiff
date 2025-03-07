import * as itowns from 'itowns';
import Fetcher from '../Fetcher';
import GeotiffParser from '../GeotiffParser';


// ---------- CREATE THE VIEW: ----------

const placement = {
	coord: new itowns.Coordinates('EPSG:4326', 2.5, 42.5),
	range: 250000,
};
const viewContainer = document.getElementById('view-container');
const view = new itowns.GlobeView(viewContainer, placement);


// ---------- DISPLAY A MAP: ----------

function addMap() {
	itowns.Fetcher.json('./resources/layers/OPENSM.json').then(function _(config) {
		config.source = new itowns.TMSSource(config.source);
		view.addLayer(
			new itowns.ColorLayer('Map', config),
		);
	});
}


// ---------- DISPLAY MNX IN A ColorLayer: ----------

const elevationSource = new itowns.WMSSource({
	crs: 'EPSG:4326',
	extent: new itowns.Extent('EPSG:4326', 1.999145, 3.000855, 41.999145, 43.000855),
	name: 'SIS-test:E002N42_6EGTFLT32_MTSA1_001',
	url: 'http://localhost:8080/geoserver/SIS-test/wms',
	version: '1.3.0',

	transparent: true,

	fetcher: Fetcher.geotiff,
	parser: GeotiffParser.parse,
	format: 'image/geotiff',  // TODO: this should not be needed. iTowns needs fixing...
});

const elevationLayer = new itowns.ColorLayer(
	'elevation',
	{
		source: elevationSource,
		// effect_type: 1,
		// TODO: try shader chunk to hide no data pixels
	},
);

view.addLayer(elevationLayer);

