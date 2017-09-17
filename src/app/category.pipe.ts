import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'category' })
export class CategoryPipe implements PipeTransform {
  transform(categories: any, searchText: any): any {
    if(searchText == null) return categories;

    return categories.filter(function(category){
      return (category.CategoryName.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||  
      category.Description.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
      category.CategoryID.toString().indexOf(searchText) > -1)
    })
  }
}
