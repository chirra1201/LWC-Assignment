import { LightningElement,track,wire} from 'lwc';

import findAccounts from '@salesforce/apex/AccountDetail.getAccountlist';

export default class FirstAssigmentParent extends LightningElement {
    @track accountname = 'en';
    @track noofrecord = 10;
    @track resultlist = [];
    @track accountlist;
    @track accountnumberlist;

    handleonchnage(even) {
        this.accountname = even.target.value;
    }
    handleonchangenoofrecord(even) {
        this.noofrecord = even.target.value;
        console.log("svv " +  this.noofrecord);
    }
    handleClick() {
        console.log(this.accountname);
        console.log(this.noofrecord);
        if(this.noofrecord == null || this.noofrecord == 0 || this.noofrecord == ''){
            console.log("in if " + this.noofrecord);
            this.noofrecord= 10;
        }

        findAccounts({ findaccount: this.accountname, accountlimit: this.noofrecord })
            .then(result => {
                this.accountlist = result;
                //this.resultlist = result;
                
                for(let key in result) {
                    // Preventing unexcepted data
                    if (result.hasOwnProperty(key)) { // Filtering the data in the loop
                        this.resultlist.push({value:result[key], key:key});
                    }
                }


                console.log('in then');
               

            })
            .catch(error => {
               // console.log('in error' + resultlist);
                t//his.resultlist = undefined;
                console.log('resultlist');
            });
    }
}