import { Component, OnInit } from '@angular/core';
import { CategoryPipe } from './category.pipe';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
  
})
export class TableComponent implements OnInit {

  records: Array<any>;
  isDesc: boolean = false;
  column: string = 'CategoryName';
  direction: number;
  itemsState :boolean = false;
  expandAllItems:boolean = false;
  expandText:string = "Expand All" ;
  constructor() { }

  ngOnInit() {

    this.records= [
      { InvoiceNo: 2, InvoiceName : "Invoice1", Description: "Music",state : false,invoiceLines :[{item : 1,name:"Item1"},{item : 2,name:"Item2"}] ,expanded:true},
      { InvoiceNo: 3, InvoiceName : "Invoice3", Description: "ITunes Download",state : false ,invoiceLines :[{item : 1,name:"Item1"},{item : 2,name:"Item2"}],expanded:false},
      { InvoiceNo: 1, InvoiceName : "Invoice4", Description: "Beat", state : false ,invoiceLines :[{item : 1,name:"Item1"},{item : 2,name:"Item2"}],expanded:false},
      { InvoiceNo: 4, InvoiceName : "Invoice5",  Description: "match" ,invoiceLines :[{item : 1,name:"Item1"},{item : 2,name:"Item2"}],expanded:true},
      { InvoiceNo: 5, InvoiceName : "Invoice6", Description: "Music",invoiceLines:[] ,expanded:false},
      { InvoiceNo: 6, InvoiceName : "Invoice7", Description: "Music",invoiceLines:[],expanded:false },
      { InvoiceNo: 7, InvoiceName : "Invoice2", Description: "Music" ,invoiceLines:[],expanded:false},
      { InvoiceNo: 8, InvoiceName : "Invoice8", Description: "Match",invoiceLines:[],expanded:false },
      { InvoiceNo: 9, InvoiceName : "Invoice9",  Description: "ITunes",invoiceLines:[],expanded:false },
      { InvoiceNo: 10 ,InvoiceName : "Invoice10", Description: "Beat" ,invoiceLines:[],expanded:false}
     ];
  }

  sort(property){
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
}

checkAll(){
  this.itemsState = !this.itemsState;
  for(let i in this.records){
      this.records[i].state = this.itemsState;
  }
}

selectedRow(event){
console.log(event);
}

rowSelected(event){
  console.log(event);
}

expandAll(){
  this.expandAllItems = !this.expandAllItems;
  this.expandText = !this.expandAllItems ? this.expandText = "Expand All" : this.expandText = "Collapse All" ;
  for(let i in this.records){
    this.records[i].expanded = this.expandAllItems;
}
}

}
