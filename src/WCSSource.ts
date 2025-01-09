import * as itowns from 'itowns';


const _extent = new itowns.Extent('EPSG:4326', 0, 0, 0);


class WCSSource extends itowns.Source {
	isWCSSource: boolean;
	name: string;
	zoom: Object;

	url: string;
	version: string;
	format: string;
	crs: string;

	extent: itowns.Extent;

	constructor(source) {
		super(source);

		this.isWCSSource = true;
		this.name = source.name;
		this.zoom = { min: 0, max: 0 };

		this.version = source.version || '2.0.1';

		const urlObj = new URL(this.url);
		urlObj.searchParams.set('SERVICE', 'WCS');
		urlObj.searchParams.set('REQUEST', 'GetCoverage');
		urlObj.searchParams.set('VERSION', this.version);
		urlObj.searchParams.set('COVERAGEID', this.name);
		urlObj.searchParams.set('FORMAT', this.format);
		urlObj.searchParams.set('subset', '%bbox');
		// urlObj.searchParams.set('CRS', this.crs);

		this.url = decodeURIComponent(urlObj.toString());
	}

	urlFromExtent(extentOrTile) {
		const extent = extentOrTile.isExtent ?
			extentOrTile.as(this.crs, _extent) :
			extentOrTile.toExtent(this.crs, _extent);
		return bbox(extent, this);
	}

	extentInsideLimit(extent) {
		return this.extent.intersectsExtent(extent);
	}
}


export default WCSSource;






let subDomainsCount = 0;

function subDomains(url) {
	const subDomainsPtrn = /\$\{u:([\w-_.|]+)\}/.exec(url);

	if (!subDomainsPtrn) {
		return url;
	}

	const subDomainsList = subDomainsPtrn[1].split('|');

	return url.replace(subDomainsPtrn[0], subDomainsList[(subDomainsCount++) % subDomainsList.length]);
}

function bbox(bbox, source) {
	let precision = source.crs == 'EPSG:4326' ? 9 : 2;
	if (source.bboxDigits !== undefined) {
		precision = source.bboxDigits;
	}
	const w = bbox.west.toFixed(precision);
	const s = bbox.south.toFixed(precision);
	const e = bbox.east.toFixed(precision);
	const n = bbox.north.toFixed(precision);

	let bboxInUnit = source.axisOrder || 'wsen';
	bboxInUnit = `Lat(${s},${n})&subset=Long(${w},${e})`;

	return subDomains(source.url.replace('%bbox', bboxInUnit));
}

