import { Component, OnInit, Input, Output,EventEmitter, HostListener, ElementRef, ViewChild,ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
  
})
export class TableComponent implements OnInit {

@ViewChild('scrollMe') private myScrollContainer: ElementRef;

@HostListener('scroll',['$event'])

onScroll(e){
  let element = this.myScrollContainer.nativeElement;

  var distanceFromTop = element.scrollTop + element.clientHeight;
  var shouldLoadMore = distanceFromTop >= Math.min(element.scrollHeight, element.scrollHeight * (1 - 0.25));

  if(element.scrollHeight - element.scrollTop - element.clientHeight <= 1){
    // if(shouldLoadMore){
    console.log("reachedBottom");

    //Make a service call and load next set of data (added a single data set as of now)
    this.gridData.push( {"invId": 22,
    "licensor": "AKM22",
    "periodRange": "FY16P01",
    "invoiceType": "Regular22",
    "contentType": "Music22",
    "country":"AUT",
    "invoiceNo":1+this.gridData.length ,
    "currency":"EUR",
    "invoiceAmount":500.00,
    "paid":123.00,
    "status":"Pending with BA",
    "pbn":"test invoice1"});

    //Clone the array to detect model changes
    this.gridData = this.gridData.slice(); 

    console.log("reachedBottom",this.gridData.length);
    
  }
}
  @Input() cols : any[];
  @Input() gridData :any;
  @Input() checkboxColumn :any;
  @Input() groupingColumn :any;
  @Input() editColumn :any;
  @Input() footer ;
  @Output() selectedRows = new EventEmitter();

  records: Array<any>;
  isDesc: boolean = false;
  column: string = 'CategoryName';
  columnType;
  direction: number;
  itemsState :boolean = false;
  expandAllItems:boolean = false;
  expandText:string = ">" ;
  allSelectedRows;
  showFooter;
  currentSelectedRow;
  isEditable;
  subItemsField : "invoiceLines";
  showDialog;
  deleteRowData;

  constructor(private ref: ChangeDetectorRef) { 
    
  };
  ngOnInit() {

     //On initial load of screen the data is not loaded
     this.gridData = [];
     if(this.gridData){
      this.currentSelectedRow = this.gridData[0];
      this.subItemsField = "invoiceLines";
     }

  }

  sort(property){
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property.field;
    this.columnType = property.type ;
    this.direction = this.isDesc ? 1 : -1;
}



checkAll(){
  this.itemsState = !this.itemsState;
  for(let i in this.gridData){
      this.gridData[i].state = this.itemsState;
  }
  this.getAllSelectedRows();
}

selectedRow(event){
  console.log(event);
}

rowSelected(event){
  event.state = !event.state ;
  if(event.state){
    console.log("Current Row selected : " , event);
  }
  
}

expandAll(){
  this.expandAllItems = !this.expandAllItems;
  // this.expandText = !this.expandAllItems ? this.expandText = "Expand All" : this.expandText = "Collapse All" ;
  // this.expandText = !this.expandAllItems ? this.expandText = "Expand All" : this.expandText = "Collapse All" ;
  // for(let i in this.gridData){
  //   this.gridData[i].expanded = this.expandAllItems;
  // }
}

expandRow(data){
  console.log("row expand clicked");

  if(data.invoiceLines && data.invoiceLines.length > 0){
      data.expanded = !data.expanded;
  }
}

getAllSelectedRows(){
  this.allSelectedRows = this.gridData.filter((row) => {return row.state === true;});
  console.log("Rows selected : " ,this.allSelectedRows);
  this.selectedRows.emit(this.allSelectedRows);
}

licensorClicked(data){
  console.log("Licensor data", data);
  
}
edit(data,col){
  this.gridData[col.field].isEditable = !this.gridData[col.field].isEditable;
}
getHeaderClass(header,column){
  let classes = {'fa-sort': false, 
  'fa-sort-asc': false, 
  'fa-sort-desc': false};
 
   classes['fa-sort'] = (column != header);
   classes['fa-sort-asc'] = (column == header && this.isDesc);
   classes['fa-sort-desc'] = (column == header && !this.isDesc);

   return classes;

}
rowClick(data){
  console.log("Row highlighted", data);
  this.currentSelectedRow = data;
  
}

isSelected(data){
  if(!this.currentSelectedRow){
    return false;
  }
  return this.currentSelectedRow.invoiceNo ===  data.invoiceNo ? true : false;
}

//Currently adding harcoded data to model(need to add it through dialog)
addRow(){
  // this.gridData.push({"invId": 444,
  // "licensor": "XYZ",
  // "periodRange": "FY16P01",
  // "invoiceType": "Regular44",
  // "contentType": "Music44",
  // "country":"AUT",
  // "invoiceNo":444,
  // "currency":"EUR",
  // "invoiceAmount":500.00,
  // "paid":123.00,
  // "status":"Pending with BA",
  // "pbn":"test invoice1"});

  this.gridData[this.gridData.length] = {"invId": 444,
  "licensor": "XYZ",
  "periodRange": "FY16P01",
  "invoiceType": "Regular44",
  "contentType": "Music44",
  "country":"AUT",
  "invoiceNo":444,
  "currency":"EUR",
  "invoiceAmount":500.00,
  "paid":123.00,
  "status":"Pending with BA",
  "pbn":"test invoice1"};

  this.gridData = this.gridData.slice();

  console.log("One row added ,grid length-", this.gridData.length);
}

editRowId: any;
unique:any;

toggle(id,uniqueKey){
  this.editRowId = id;
  this.unique = uniqueKey;
}

onInputClick($event){
  $event.stopPropagation();
}

blurEvent($event){
  console.log("blur");
  
}

tableBodyClass(gridData){
 if(gridData.length > 0){
   return {'tableBody': true};
 }
    return {'tableBody': false};
}

getSelectedRow(data){
  return this.gridData.length > 0 && this.currentSelectedRow === data ;
}

expandColumnClass(data){
  if(data[this.subItemsField].length > 0 && !data.expanded){
    return {'fa fa-chevron-right':true};
  }
  return {'fa fa-chevron-down':true};
}

openDeleteRowDialog(data,index){
  this.showDialog = true;
  this.deleteRowData =  index;
}
deleteRowConfirm(){
  //It would be service call to delete from backend
 this.gridData.splice(this.deleteRowData,1);
 this.showDialog = false;
}
}
