import { LightningElement, track } from 'lwc';

export default class RootParent extends LightningElement {
    @track searchstring;

    handleCustomEvent(event) {
        this.searchstring = event.detail;
        console.log('textVal ' + this.searchstring);
        let search = this.template.querySelector('c-search-results');
        this.template.querySelector('c-search-results').changeMessage(this.searchstring);
    }
}