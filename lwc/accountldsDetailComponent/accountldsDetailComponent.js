import { LightningElement, track,wire } from 'lwc';
import { registerListener, unregisterAllListeners} from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

import {  fireEvent } from 'c/pubsub';

import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class LdsDetailComponent extends LightningElement {

    @track accountID;
    @wire(CurrentPageReference) pageRef;
    @track objectApiName ='Account';
    @track showedit=false;
   

    handleedit(){
        console.log('in edit');
        this.showedit=true;
    }
    handlecancel(){
        this.showedit=false;
    }
    handleSubmit(){
        console.log('on submit');
    }
    handleSuccess(){
        this.showedit=false;
        console.log('in sucess');
            const evt = new ShowToastEvent({
                title: 'Toast Success',
                message: 'Record Updated Successfully',
                variant: 'success',
                mode: 'dismissable'
            });
            this.dispatchEvent(evt);
            
            fireEvent(this.pageRef, 'updateAccount', 'Account Updated');
    }

// Pub Sub Method
    connectedCallback() {
        console.log('in connected msg');
        registerListener('messageFromSpace', this.handleMessage, this);
    }
    handleMessage(myMessage) {
        this.accountID = myMessage;
        this.showedit=false;
        console.log('this.Message '+ this.accountID);
        //Add your code here
    }
    disconnectCallback() {
        unregisterAllListeners(this);
    }

}