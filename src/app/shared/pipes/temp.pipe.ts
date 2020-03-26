import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temp'
})
export class TempPipe implements PipeTransform {

  transform(value: string): string {
    return Math.ceil(+value - 273) + ' °C';
  }
}
