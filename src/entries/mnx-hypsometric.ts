import * as itowns from 'itowns';
import Fetcher from '../Fetcher';
import GeotiffParser from '../GeotiffParser';
import TextureConverter from '../TextureConverter';


// ---------- CREATE THE VIEW: ----------

const placement = {
	coord: new itowns.Coordinates('EPSG:4326', 2.5, 42.5),
	// coord: new itowns.Coordinates('EPSG:4326', -1.5, 13.5),
	range: 250000,
}
const viewContainer = document.getElementById('view-container');
const view = new itowns.GlobeView(viewContainer, placement);


// ---------- DISPLAY A MAP: ----------

itowns.Fetcher.json('/resources/layers/OPENSM.json').then(function (config) {
	config.source = new itowns.TMSSource(config.source);
	const mapLayer = new itowns.ColorLayer('Map', config);

	// view.addLayer(mapLayer);
});


// ---------- [TEST] TRY CUSTOM SHADER TO HIDE NO DATA: ----------

itowns.ShaderChunk.customHeaderColorLayer(
	`
	vec4 getGrayscaleColor(vec4 baseColor, float noDataValue) {
		float colorValue = baseColor.x;
		float alpha = baseColor.a;
		// bool condition = (colorValue > 1.0);
		bool condition = (colorValue == noDataValue);
		if (condition) { alpha = 0.0; }

		vec4 color = vec4(vec3(colorValue), alpha);
		return color;
	}
	`,
);

itowns.ShaderChunk.customBodyColorLayer(
	`
	color = getGrayscaleColor(color, layer.effect_parameter);
	`,
);


// ---------- DISPLAY MNX IN A ColorLayer: ----------

const elevationSource = new itowns.WMSSource({
	crs: 'EPSG:4326',
	extent: new itowns.Extent('EPSG:4326', 1.999145, 3.000855, 41.999145, 43.000855),
	url: 'http://localhost:8080/geoserver/SIS-test/wms',
	name: 'SIS-test:E002N42_6EGTFLT32_MTSA1_001',
	version: '1.3.0',

	fetcher: Fetcher.geotiff,
	parser: GeotiffParser.parse,
	format: 'image/geotiff',  // TODO: this should not be needed. iTowns needs fixing...
});

const elevationLayer = new itowns.ColorLayer(
	'elevation',
	{
		source: elevationSource,
		// TODO: try shader chunk to hide no data pixels
		effect_type: itowns.colorLayerEffects.customEffect,
		effect_parameter: 1.0,  // TODO: try replacing this by noDataValue
		convert: TextureConverter.convert,
	},
);

view.addLayer(elevationLayer);


// ---------- REORDER ColorLayers: ----------

view.addEventListener(
	itowns.GLOBE_VIEW_EVENTS.GLOBE_INITIALIZED,
	() => {
		// itowns.ColorLayersOrdering.moveLayerToIndex(view, 'Map', 0);
		console.log(view.getLayers());
		// view.removeLayer('atmosphere');
	},
);
