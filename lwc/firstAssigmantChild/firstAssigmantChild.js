import { LightningElement, api, track, wire } from 'lwc';

export default class FirstAssigmantChild extends LightningElement {
    @api accountlist;
    @track searchaccount = "abc";
    @api accountdisplaylist;
    @track mapkeyvaluestore=[];


    handleonchangenoofrecord(even) {
        this.searchaccount = even.target.value;
    }

    handleClickChild() {
        console.log(this.searchaccount);
        console.log(this.accountlist);
  /*
        this.accountlist = this.accountdisplaylist.filter(function(element) {
            return element.Name == this.searchaccount;
        }, this);
*/
        this.accountlist = this.accountdisplaylist.filter(function(element) {
            return element.Name.toLowerCase().includes(this.searchaccount.toLowerCase());
        }, this); 



        

/*
        for(var i=0;i<this.accountlist.length;i++){
            console.log( JSON.stringify(this.accountlist));
            console.log( JSON.stringify(this.accountlist[i].Name));
            console.log();

        }
*/
/*
        for(let key in this.accountlist) {
            // Preventing unexcepted data
            console.log(key);
           console.log(this.accountlist[key]);
           this.mapkeyvaluestore.push({key:key,value:this.accountlist.data[key]});
           console.log( this.mapkeyvaluestore);


        }
*/
    }

}