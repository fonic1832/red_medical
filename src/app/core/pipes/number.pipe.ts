import { Pipe, PipeTransform } from "@angular/core";

/**
 * Checks if the given number value is undefined. If so a dash is returned, to symbolize
 * that there is no value present. Otherwise the original value plus a euro-symbol (€) is returned.
 */
@Pipe({name: "number"})
export class NumberPipe implements PipeTransform {

  public transform(value: number, locale: string = 'de'): string {
    return value.toLocaleString(locale);
  }
}
