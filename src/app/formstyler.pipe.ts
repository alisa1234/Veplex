import { Pipe, PipeTransform } from '@angular/core';
declare var jQuery:any;

@Pipe({
  name: 'formstyler'
})
export class FormstylerPipe implements PipeTransform {

  transform(value: string, args: string, args2: any, args3: any): any {



    if (!value) return value;
    let select_value = null;
    jQuery('#'+args).change(function () {
        select_value = document.getElementById(args);
        value = select_value.options[select_value.selectedIndex].value;
        if (value != args2[args3]) {
            args2[args3] = value;
        }
    });
    setTimeout(function() {
      (<any>jQuery('#' + args)).trigger('refresh');
    }, 0);

    return value;
  }

}
