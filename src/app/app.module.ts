import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CategoryPipe } from './category.pipe';

import { OrderrByPipe } from './orderBy.pipe';

import { AppComponent } from './app.component';

import {DataTableModule,SharedModule} from 'primeng/primeng';

import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    CategoryPipe,
    OrderrByPipe
  ],
  imports: [
    BrowserModule,
    DataTableModule,
    SharedModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
