import appSettings from '../settings.js';

export default class SpxClient {
    constructor(currentCompany, unauthHandler, authToken) {
        this.company = currentCompany;
        this.unauthHandler = unauthHandler;
        this.authToken = authToken;
    }

    async create(endpoint, obj) {
        return await this.executeRequest('POST', endpoint, obj);
    }

    async update(endpoint, obj) {
        return await this.executeRequest('PATCH', endpoint, obj);
    }

    async get(endpoint) {
        return await this.executeRequest('GET', endpoint);
    }

    async apiKey() {
        let response = await this.executeRequest('GET', 'Settings');
        if (response.error)
            return response;

        response.val = response.val.d.results[0].APIKey;
        return response;
    }

    async executeRequest(method, url, body) {
        let rUrl = appSettings.spieUrl + '/coreproxy/service/api/' + url;
        let settings = {
            method: method,
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'new-base': appSettings.serviceProUrl
            }
        };

        if (this.company)
            settings.headers['CompanyVersionNumber'] = this.company.CompanyVersionNumber;

        if (this.authToken)
            settings.headers['Authorization-Token'] = this.authToken;

        if (body)
            settings.body = JSON.stringify(body);

        let result = await fetch(rUrl, settings);
        let obj = {
            error: !result.ok,
            code: result.status
        };

        if (obj.code == 401 && this.unauthHandler && url != 'User/Login')
            this.unauthHandler();

        if (!obj.error)
            obj.val = await result.json();

        return obj;
    }
}
