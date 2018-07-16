class Utils {


	static generateUrlByParams(endpoint, finalValues) {
		let baseUrl = endpoint.url;
		let params = endpoint.params.map(p => p.value);
		params.forEach(param => {
			baseUrl = baseUrl.replace(param, finalValues[param]);
		});
		baseUrl = baseUrl.slice(0,baseUrl.length);
		  return baseUrl;
	}

	static getHomeModel() {

	}

}

export default Utils;