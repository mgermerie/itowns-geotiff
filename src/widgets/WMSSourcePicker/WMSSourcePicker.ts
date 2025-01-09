import {
	Fetcher,
} from 'itowns';
import WMSCapabilities from 'wms-capabilities';

import Widget from '../Widget';
import './WMSSourcePicker.css';


class WMSSourcePicker extends Widget {
	constructor() {
		const htmlContent = require('./WMSSourcePicker.html').default;

		super(htmlContent);

		const capForm = <HTMLFormElement>this.domElement.getElementById('getCapForm');
		capForm.addEventListener(
			'submit',
			(event) => {
				event.preventDefault();

				const formData = new FormData(capForm);
				console.log(formData);
				// formData.entries().forEach((value) => {
				// 	console.log(value);
				// });
			},
		);
	}

	addToDOM(parentElement) {
		parentElement.appendChild(this.domElement);
	}

	async getCapabilities(baseUrl: string) {
		const xmlString = await Fetcher.text(`${baseUrl}?REQUEST=GetCapabilities`);

		return new WMSCapabilities(
			xmlString,
			window.DOMParser,
		).toJSON();
	}

	async getLayerSpecifications(capabilities, layerName) {
		return capabilities.Capability.Layer.Layer.find(layer => layer.Name === layerName);
	}
}


export default WMSSourcePicker;

