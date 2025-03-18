import { Vector3 } from 'three';
import { TilesViewer } from '../TilesViewer';


const view = new TilesViewer(
	document.getElementById('view-container'),
	{
		// Camera initial position is expressed in the 3D scene referential. Its origin is the
		// center of the bounding sphere of the tileset, and its axis are roughtly alligned with
		// (North, Elevation, East) axis.
		position: new Vector3(-10000, 7500, 0),
	}
);
view.render();


const form = <HTMLFormElement> document.getElementById('source-widget');
form.addEventListener(
	'submit',
	(event) => {
		event.preventDefault();
		const formData = new FormData(form);
		const url = formData.get('source-url');

		view.addTileset(url);

		document.getElementById('source-information').classList.remove('hidden');
		const info = document.createElement('li');
		info.innerHTML = `${url}`;
		document.getElementById('source-list').appendChild(info);
	},
);

