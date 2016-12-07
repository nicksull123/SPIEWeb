import appSettings from '../settings.js';

export default class SpieClient {
    async create(endpoint, obj) {
        return await this.executeRequest('POST', endpoint, obj);
    }

    async update(endpoint, obj) {
        return await this.executeRequest('PATCH', endpoint, obj);
    }

    async get(endpoint) {
        return await this.executeRequest('GET', endpoint);
    }

    async executeRequest(method, url, body) {
        let rUrl = appSettings.spieUrl + '/api/integration/' + url;
        let settings = {
            method: method,
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Secret': appSettings.spieSecret
            }
        };

        if (body)
            settings.body = JSON.stringify(body);

        let result = await fetch(rUrl, settings);
        let obj = {
            error: !result.ok,
            code: result.status
        };

        if (!obj.error)
            obj.val = await result.json();

        return obj;
    }
}
