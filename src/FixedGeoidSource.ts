import {
	Source,
} from 'itowns';

class FixedGeoidSource extends Source {
	private height: number;

	constructor(height) {
		super({ crs: 'EPSG:4326', url: 'none' });
		this.height = height;
	}

	urlFromExtent() { return 'none'; }

	async loadData() {
		const self = this;
		return {
			getHeightAtCoordinates() {
				return self.height;
			},
		};
	}
}

export { FixedGeoidSource };

