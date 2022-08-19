import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tel',
})
export class TelPipe implements PipeTransform {
  transform(value: string) {
    let valorFormatado = value.toString().replace(/\D/g, '');
    if (valorFormatado.length === 10) {
      valorFormatado = valorFormatado
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d{4})(\d{4})/g, '($1) $2-$3');
      return valorFormatado;
    } else {
      valorFormatado = valorFormatado
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d{1})(\d{4})(\d{4})/g, '($1) $2 $3-$4');
      return valorFormatado;
    }
  }
}
