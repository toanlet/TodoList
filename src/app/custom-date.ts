import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Injectable , Inject } from '@angular/core';
import * as moment from 'moment';
@Injectable()
export class CustomDateService extends NgbDateParserFormatter{

  constructor(@Inject(String) private momentFormat: string ) {
    super();
  }
   parse(value: string): NgbDateStruct | null {
     if (!value) {
      return null;
     }
     
    const d = moment(value, this.momentFormat);
    return d.isValid() ? { year: d.year(),
      month: d.month() + 1,
      day: d.date() } : null;
  
  }
  format(date: NgbDateStruct | null): string {
    if (date === null) {
      return '';
    }
    const d = moment({year: date.year, month: date.month - 1, date: date.day})
    return d.isValid() ? d.format(this.momentFormat) : '';
    
  }
}
