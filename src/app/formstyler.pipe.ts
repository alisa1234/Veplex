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
    // document.getElementById(args).parentNode.addEventListener('click', () => {
        console.log('jklk',value);
        console.log(select_value);
        // select_value = <HTMLSelectElement>document.getElementById(args).selectedOptions[0].value;
        select_value = document.getElementById(args);
        value = select_value.options[select_value.selectedIndex].value;
        // .selectedOptions[0].value;
        console.log('b2red',select_value + " " + args2[args3]);
        console.log('args2',args2);
        console.log('args3',args3);
        console.log('vqlue',value);
        if (value != args2[args3]) {
            args2[args3] = value;
        }
    })
    // document.getElementById(args).addEventListener('change', () => {
    //   console.log(value);
    //   console.log(select_value);
    //   // select_value = <HTMLSelectElement>document.getElementById(args).selectedOptions[0].value;
    //   select_value = document.getElementById(args);
    //   value = select_value.options[select_value.selectedIndex].value;
    //   // .selectedOptions[0].value;
    //   console.log(select_value + " " + args2[args3]);
    //   console.log(args2);
    //   if (select_value != args2[args3]) {
    //     args2[args3] = select_value;
    //
    //   }
    //
    // });

    setTimeout(function() {
      (<any>jQuery('#' + args)).trigger('refresh');
    }, 0);

    return value;
  }

}
