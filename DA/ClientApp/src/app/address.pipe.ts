import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  transform(fullAddress: string): string {
    var arr = fullAddress.split(" ");
    return arr[arr.length - 1];
  }

}
