import * as itowns from 'itowns';
import WMSCapabilities from 'wms-capabilities';
import Fetcher from './Fetcher';
import GeotiffParser from './GeotiffParser';
import WMSSourcePicker from './widgets/WMSSourcePicker/WMSSourcePicker';


// SIS data
const data = {
	coord: new itowns.Coordinates('EPSG:4326', -1.08, 13.082),
	source: {
		crs: 'EPSG:4326',
		extent: new itowns.Extent('EPSG:4326', -2.57046, 2.80335, 0.3839, 15.0937),
		name: 'toto:W002N13_4EGTFLT32_MTNE1_001',
		url: 'http://localhost:8080/geoserver/toto/wms',
		version: '1.3.0',
		//noDataValue: -32.767,
	},
};

// Lidar HD data
// const data = {
//     coord: new itowns.Coordinates('EPSG:4326', -0.926061837, 45.988156177),
//     source: {
//         extent: new itowns.Extent('EPSG:4326', -1.57046, 2.80335, 45.3839, 51.0937),
//         name: 'IGNF_LIDAR-HD_MNS',
//         url: 'https://data.geopf.fr/wms-r',
//         version: '1.3.0',
//     },
//     noDataValue: -999999,
// };



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

const wmsURL = 'http://localhost:8080/geoserver/toto/wms';
const layerName = 'W002N13_4EGTFLT32_MTNE1_001';

// async function readCapabilities(baseUrl: string) {
// 	const xmlString = await itowns.Fetcher.text(`${baseUrl}?REQUEST=GetCapabilities`);
//
// 	const parsedCapabilities = new WMSCapabilities(
// 		xmlString,
// 		window.DOMParser,
// 	).toJSON();
// 	return parsedCapabilities;
// }
//
// function readLayerCapabilities(capabilities, layerName) {
// 	return capabilities.Capability.Layer.Layer.find(layer => layer.Name === layerName);
// }
//
// async function foo() {
// 	const capabilities = await readCapabilities(wmsURL);
// 	console.log('capabilities : ', capabilities);
//
// 	const layer = readLayerCapabilities(capabilities, layerName);
// 	console.log('layer : ', layer);
//
// 	const crs = layer.CRS.find(crs => ["EPSG:4326", "EPSG:4978"].includes(crs));
// 	console.log('crs : ', crs);
// 	if (!crs) {
// 		// do error
// 	}
//
// 	const layerBbox = layer.BoundingBox.find(bbox => ["EPSG:4326", "EPSG:4978"].includes(bbox.crs));
// 	console.log('bbox : ', layerBbox);
//
// 	const extent = new itowns.Extent(
// 		layerBbox.crs,
// 		layerBbox.extent[1], layerBbox.extent[3], layerBbox.extent[0], layerBbox.extent[2],
// 	);
// 	const source = {
// 		crs,
// 		extent,
// 		name: layer.Name,
// 		url: wmsURL,
// 		version: capabilities.version,
// 	};
// 	console.log('source : ', source);
//
// 	addWMSGeotiff(source)
// }
//
// function addGeotiff(source) {
// 	console.log(source);
// 	const tifSource = new itowns.WMSSource({
// 		...source,
// 		fetcher: Fetcher.geotiff,
// 		parser: GeotiffParser.parse,
// 		format: 'image/geotiff',  // TODO: this should not be needed. iTowns needs fixing...
// 	});
//
// 	const tifLayer = new itowns.ColorLayer('tiff', {
// 		source: tifSource,
// 	});
// 	view.addLayer(tifLayer);
// }


// foo();
// addMap();


const toto = new WMSSourcePicker();
toto.addToDOM(viewerDiv);

