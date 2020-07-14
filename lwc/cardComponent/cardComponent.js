import { LightningElement,api, track,wire } from 'lwc';

import { fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'accountldsDetailComponent/node_modules/lightning/navigation';

export default class CardComponent extends LightningElement {
    @api account;
    @track accountId;
    @wire(CurrentPageReference) pageRef;

    handelclick(event) {
        console.log(event.currentTarget.id);
        this.accountId = event.currentTarget.id;
        console.log(' this.accountId ' + this.accountId)
        this.sendMessage();
    }
   
    sendMessage() {
        this.accountId = this.accountId.substring(0, 18);
        console.log('in send ' + this.accountId);
        fireEvent(this.pageRef, 'messageFromSpace', this.accountId);
    }
}