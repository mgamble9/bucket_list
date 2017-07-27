import { Pipe, PipeTransform } from '@angular/core';
import { Bucket } from "./bucket"
@Pipe({
  name: 'filterbystring',
  pure: false
})
export class FilterbystringPipe implements PipeTransform {

transform(buck_arr: Array<Bucket>, search: string): Array<Bucket> {
  // let output = []

  search = search.toLowerCase()

  // for(var i = 0; i < book_array.length; i++){
  // 	if(book_array[i].title.toLowerCase().includes(search) || book_array[i].author.toLowerCase().includes(search)){
  // 		output.push(book_array[i])
  // 	}
  // }

  return buck_arr.filter(bucket_list => {
    // return bucket_item.title.toLowerCase().includes(search) || bucket_item.description.toLowerCase().includes(search)
    return bucket_list.createdBy.toLowerCase().includes(search)
  })

  // return output
}

}
