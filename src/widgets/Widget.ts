type WidgetOptions = {
	parentElement?: HTMLElement,
};


class Widget {
	domElement: DocumentFragment;

	constructor(innerHTML, options: WidgetOptions = {}) {
		const template = document.createElement('template');
		template.innerHTML = innerHTML;

		this.domElement = template.content;

		// this.parentElement = parentElement;

		// this.domElement = document.createElement('div');
		// this.parentElement.appendChild(this.domElement);

		// this.domElement.addEventListener('pointerdown', (e) => {
		// 	e.stopPropagation();
		// });
		// this.domElement.addEventListener('mousedown', (e) => {
		// 	e.stopPropagation();
		// });
	}
}

export default Widget;

