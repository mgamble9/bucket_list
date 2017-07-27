import { Pipe, PipeTransform } from '@angular/core';
import { Bucket } from "./bucket"

@Pipe({
  name: 'filterbyarray',
  pure: false
})
export class FilterbyarrayPipe implements PipeTransform {

  transform(buck_arr: Array<Bucket>, search: Array<string>): Array<Bucket> {
    let output = []

    for (let x = 0; x<search.length; x++) {
      // search[x] = search[x].toLowerCase()
      search[x] = search[x]

      for(var i = 0; i < buck_arr.length; i++){
        // if(buck_arr[i].title.toLowerCase().includes(search[x]) || buck_arr[i].author.toLowerCase().includes(search)){
        // if(buck_arr[i]._id.toLowerCase().includes(search[x])) {
        if(buck_arr[i]._id.includes(search[x])) {
      		output.push(buck_arr[i])
      	}
      }
    }
    // return buck_arr.filter(bucket_list => {
    //   // return bucket_item.title.toLowerCase().includes(search) || bucket_item.description.toLowerCase().includes(search)
    //   return bucket_list.createdBy.toLowerCase().includes(search)
    // })

    return output
  }

  }
