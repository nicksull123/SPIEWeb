let singleton = Symbol();
let singletonToken = Symbol();

export default class AppState {
    constructor(token) {
        if (token != singletonToken)
            throw "Singleton Exception";

        this.authToken = null;
        this.companyList = [];
        this.selectedCompany = null;
    }

    static get instance() {
        if (!this[singleton]) {
            var stored = localStorage.getItem('appstate');
            if (stored) {
                let nState = new AppState(singletonToken);
                let obj = JSON.parse(stored);
                nState.authToken = obj.authToken;
                nState.companyList = obj.companyList;
                nState.selectedCompany = obj.selectedCompany;
                this[singleton] = nState;
            } else {
                this[singleton] = new AppState(singletonToken);
            }
        }

        return this[singleton];
    }

    persist() {
        localStorage.setItem('appstate', JSON.stringify(this));
    }

    clear() {
        this.authToken = null;
        this.selectedCompany = null;
        this.companyList = [];
    }
}
