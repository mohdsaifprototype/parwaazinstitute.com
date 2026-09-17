"use strict";

export class ElementFactory {
	constructor({
		tag = "div",
		className = "",
		attributes = [],
		values = [],
		content = "",
	} = {}) {
		this.tag = tag;
		this.className = className;
		this.attributes = attributes;
		this.values = values;
		this.content = content;
	}

	applyAttributes(element) {
		const entries = Array.isArray(this.attributes)
			? this.attributes.map((name, index) => [name, this.values[index]])
			: Object.entries(this.attributes || {});

		entries.forEach(([name, value]) => {
			if (value !== undefined) {
				element.setAttribute(name, value);
			}
		});

		return element;
	}

	create() {
		const element = document.createElement(this.tag);

		if (this.content) {
			element.innerHTML = this.content;
		}

		if (this.className) {
			element.className = this.className;
		}

		return this.applyAttributes(element);
	}

	static makeElement(
		myElement = "div",
		myClass = "",
		attributes = [],
		values = [],
		content = "",
	) {
		return new ElementFactory({
			tag: myElement,
			className: myClass,
			attributes,
			values,
			content,
		}).create();
	}
}

// Example usage:
// const btn = ElementFactory.makeElement("button", "btn btn-primary", ["type", "data-id"], ["submit", "123"], "Submit");