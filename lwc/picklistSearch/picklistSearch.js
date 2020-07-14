//picklist js

import { LightningElement, track, wire } from "lwc";

import {
  getPicklistValues,
  getPicklistValuesByRecordType,
  getObjectInfo
} from "lightning/uiObjectInfoApi";

import ACCOUNT_Type from "@salesforce/schema/Account.Type";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";

export default class PicklistSearch extends LightningElement {
  @track pickListvalues;
  @track error;
  @track selectedvalues;
  @track accountsource;

  @wire(getPicklistValues, {
    recordTypeId: "012000000000000AAA",
    fieldApiName: ACCOUNT_Type
  })
  wiredPickListValue({ data, error }) {
    if (data) {
      console.log(` Picklist values are `, data.values);
      console.log(` Picklist values are[ 0] `, data.values[0].value);
      this.pickListvalues = data.values;
      this.selectedvalues=data.values[0].value;
      this.error = undefined;
    }
    if (error) {
      console.log(` Error while fetching Picklist values  ${error}`);
      this.error = error;
      this.pickListvalues = undefined;
    }
  }
  
  handleChange(event) {
    console.log("in event" + event.target.value);
    this.selectedvalues  = event.target.value;
    
  }
  handelClick(){
    console.log("in on click" +this.selectedvalues);
/*
    const selectEvent = new CustomEvent('searchselected', {
      detail: this.selectedvalues
    });
    this.dispatchEvent(selectEvent);
*/
    this.dispatchEvent(new CustomEvent('searchselected',{detail : this.selectedvalues}));

  }
}