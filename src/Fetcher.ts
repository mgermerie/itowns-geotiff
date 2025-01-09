import { fromUrl } from 'geotiff';


export default {
	geotiff(url: string) {
		// TODO: add network options
		return fromUrl(url, { allowFullFile: true });
	},
}
