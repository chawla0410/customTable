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
      { CategoryID: 1,  CategoryName: "Beverages", Description: "Coffees, teas", state : false ,invoiceLines :[{item : 1,name:"Item1"},{item : 2,name:"Item2"}],expanded:false},
      { CategoryID: 2,  CategoryName: "Condiments", Description: "Sweet and savory sauces",state : false,invoiceLines :[{item : 1,name:"Item1"},{item : 2,name:"Item2"}] ,expanded:true},
      { CategoryID: 3,  CategoryName: "Confections", Description: "Desserts and candies",state : false ,invoiceLines :[{item : 1,name:"Item1"},{item : 2,name:"Item2"}],expanded:false},
      { CategoryID: 4,  CategoryName: "Cheeses",  Description: "Smetana, Quark and Cheddar Cheese" ,invoiceLines :[{item : 1,name:"Item1"},{item : 2,name:"Item2"}],expanded:true},
      { CategoryID: 5,  CategoryName: "Grains/Cereals", Description: "Breads, crackers, pasta, and cereal",invoiceLines:[] ,expanded:false},
      { CategoryID: 6,  CategoryName: "Beverages", Description: "Beers, and ales",invoiceLines:[],expanded:false },
      { CategoryID: 7,  CategoryName: "Condiments", Description: "Selishes, spreads, and seasonings" ,invoiceLines:[],expanded:false},
      { CategoryID: 8,  CategoryName: "Confections", Description: "Sweet breads",invoiceLines:[],expanded:false },
      { CategoryID: 9,  CategoryName: "Cheeses",  Description: "Cheese Burger",invoiceLines:[],expanded:false },
      { CategoryID: 10, CategoryName: "Grains/Cereals", Description: "Breads, crackers, pasta, and cereal" ,invoiceLines:[],expanded:false}
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
