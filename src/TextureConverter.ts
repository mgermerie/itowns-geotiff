import {
	DataTexture,
	FloatType,
	LinearFilter,
	RedFormat,
	UnsignedByteType,
} from 'three';
import {
	Extent,
} from 'itowns';


type TextureWithExtent = DataTexture & { extent: Extent }


const MIN = 0;
const MAX = 2000;


function convert(texture) {
	if (texture.type === FloatType) {
		const { data, height, width } = texture.image;

		const buffer = new Uint8Array(data.length);

		for (let i = 0; i < data.length; i++) {
			const firstDistance = (data[i] - MIN) / (MAX - MIN);
			const newValue = 0 + firstDistance * (255 - 0);
			buffer[i] = Math.floor(255 * (data[i] - MIN) / (MAX - MIN));
		}

		const newTexture = <TextureWithExtent> new DataTexture(
			buffer,
			width,
			height,
			RedFormat,
			UnsignedByteType,
		);
		newTexture.extent = texture.extent;
		newTexture.flipY = texture.flipY
		newTexture.needsUpdate = true;

		texture = newTexture;
	}

	texture.anisotropy = 16
	texture.generateMipmaps = false;
	texture.magFilter = LinearFilter;
	texture.minFilter = LinearFilter;

	console.log(texture.image.data);

	return texture;
}


export default {
	convert,
};

