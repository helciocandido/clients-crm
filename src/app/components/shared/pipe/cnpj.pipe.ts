import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cnpj',
})
export class CnpjPipe implements PipeTransform {
  transform(value: string | number, ocultar: boolean): string {
    let valorFormatado = value + '';

    valorFormatado = valorFormatado
      .replace(/[^0-9]/g, '')
      .padStart(14, '0')
      .substring(0, 14)
      .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5');

    if (ocultar) {
      valorFormatado = '**.*' + valorFormatado.substring(4, 15) + '-**';
    }

    return valorFormatado;
  }
}
