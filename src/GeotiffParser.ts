import type {
	GeoTIFF,
	TypedArrayWithDimensions,
} from 'geotiff';
import {
	DataTexture,
	RedFormat,
	FloatType,
	UnsignedByteType,
} from 'three';
import {
	Extent,
	Source,
} from 'itowns';


type ParserOptions = {
	extent: Extent,
	in: Source,
}
type TextureWithExtent = DataTexture & { extent: Extent }


/**
 * @param format - Format to interpret each data sample in a pixel
 * https://www.awaresystems.be/imaging/tiff/tifftags/sampleformat.html
 * @param bitsPerSample - Number of bits per component.
 * https://www.awaresystems.be/imaging/tiff/tifftags/bitspersample.html
*/
function selectDataType(format: number, bitsPerSample: number) {
	switch (format) {
		case 1: // unsigned integer data
			if (bitsPerSample <= 8) {
				return UnsignedByteType;
			}
			break;
		default:
		break;
	}
	return FloatType;
}


async function parse(data: GeoTIFF, options: ParserOptions) {
	const image = await data.getImage();

	// TODO : plug to local geotiff to enforce 32 bits samples

	const width = image.getWidth();
	const height = image.getHeight();

	const dataType = selectDataType(image.getSampleFormat(), image.getBitsPerSample());

	const rgbBuffer = <TypedArrayWithDimensions> (await image.readRasters({
		// interleave: true,
		samples: [0],
	}))[0];

	const testArray = [];
	for (let i = 0; i < width * height; i++) {
		testArray.push(Math.random() * 2000);
	}

	const texture = <TextureWithExtent> new DataTexture(
		// rgbBuffer,
		Float32Array.from(testArray),
		width,
		height,
		RedFormat,
		// dataType,
		FloatType,
	);
	texture.extent = options.extent;

	texture.flipY = true;
	texture.needsUpdate = true;
	texture.internalFormat = 'R32F';  // TODO: is it needed?



	// console.log(image.fileDirectory);
	// console.log(image.getSampleFormat(), image.getBitsPerSample());
	// console.log(rgbBuffer.width, rgbBuffer.height);
	// console.log(image.getSamplesPerPixel());
	// console.log(image.getWidth(), image.getHeight());

	// console.log('image : ', image);
	// console.log('width : ', width);
	// console.log('height : ', height);
	// console.log('is RGB : ', width * height * 4 === rgbBuffer.byteLength);
	// console.log('format : ', image.getSampleFormat());
	// console.log('bitsPerSample : ', image.getBitsPerSample());
	// console.log('buffer : ', rgbBuffer);

	// console.log('buffer : ', testArray);
	console.log('texture : ', texture);
	// console.log('');

	return Promise.resolve(texture);
}


export default {
	parse,
};

