export default class TagHelper {
    tags = []

    constructor(_tags) {
      this.tags = JSON.parse(JSON.stringify(_tags));
    }    

	getTagNames = (keys) => {
		if (!keys) return "";
		if (!this.tags) return "";
		let tagNames = [];
		keys.forEach(key => {
			this.tags.forEach(x => {
				x.children.forEach(y => {
					if (y.key == key) {
						tagNames.push(y.label);
					}
				});
			});
		});
		return tagNames.join(", ");
	}
}