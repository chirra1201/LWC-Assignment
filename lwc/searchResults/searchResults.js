import { LightningElement, api, track, wire } from 'lwc';
import { fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'accountldsDetailComponent/node_modules/lightning/navigation';
import getAccountList from '@salesforce/apex/AccountDetail.accountList';
import { refreshApex } from '@salesforce/apex';

import { registerListener, unregisterAllListeners } from 'c/pubsub';


export default class SearchResults extends LightningElement {

    @api searchStringChild;
    @track accountlist;
    @track accountId;
    @track isLoading = false;
    @track norecord =false;
    @track error;
    @track myMessage = 'in search result';
    @wire(CurrentPageReference) pageRef;
/*
    @wire(getAccountList, { searchvalue: '$searchStringChild' })
    wiredAccounts({ error, data }) {
        if (data) {
            this.accountlist = data;
        } else if (error) {
            console.log(error);
            // this.error = error;
        }
    }

    renderedCallback() {
        if (this.searchStringChild) {
            this.changeMessage(this.searchStringChild);
            console.log('in render' + this.searchStringChild);
        }
    }
*/
    @api
    changeMessage(strString) {
        this.searchStringChild = strString;
        console.log('searchStringChild :- ' + this.searchStringChild);
        this.isLoading = true;
        getAccountList({ searchvalue: this.searchStringChild })
            .then(result => {
                this.accountlist = result;
                this.isLoading = false;
                console.log('this.accountlist :- ' + this.accountlist);
                console.log('this.accountlist :- ' + this.accountlist.length);
                if(this.accountlist.length == 0){
                    this.norecord= true;
                    console.log('i if');
                }
              
            }
            ).catch(error => {
                this.error= error;
                this.isLoading = false;
                console.log('this.error :- ' + this.accountlist);
                console.log('resultlist');
            });
    }//changemessage


    //pubsub event
    @track Message;
    connectedCallback() {
        registerListener('updateAccount', this.handleMessage, this);
    }

    handleMessage(myMessage) {
        this.Message = myMessage;
        console.log('in handel :- ' + this.Message);
        this.changeMessage(this.searchStringChild);
        //Add your code here
    }

    disconnectCallback() {
        unregisterAllListeners(this);
    }

}