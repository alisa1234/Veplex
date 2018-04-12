import { Component, OnInit,EventEmitter } from '@angular/core';
import {Filters} from '../filters';
import {CalendarService} from "../calendar/calendar.service";
import {Http, Response, Headers} from '@angular/http';
import {Domains} from '../domains';
import {CheckboxTableService} from "../checkbox-table/checkbox-table.service";
import {GlobalLogin} from '../global-login';
import { Router } from '@angular/router';
// require('highcharts/modules/exporting')(Highcharts);

declare var jQuery:any;
declare var Highcharts:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  _http: Http;
  domain:string;
  csrf: string;
  body:any;
  result: any;
  urlGetListOffersPublishers:string;
  urlsendStatistic:string;
  urlsendChartStatistic:string;
  urlgetTableStatistic:string;
  getStatisticHome:string;
  // getStatisticOffers:string;

  start_day:string;
  end_day:string;
  today:any;
  dd:number;
  mm:number;
  yy:number;

  list = {rows: [], pagination: (<any>Object), sort: (<any>Object), filterParams:(<any>Object),total_count:(<any>Object),filterTime:(<any>Object)};

  private offer_value:string='0';
  private publisher_value:string='0';

  private publisher_values=[];
  private offer_values=[];
  date:number;
  roda = false;
  private chartData:any;
  private ShareData:{[index:string]:any}={};
  private chartData2:{[index:string]:any}={};
  private period_type:{[index:string]:any}={};
  private perfomers_type:{[index:string]:any}={};
  private period_arr:{[index:string]:any}=[];
  private value:any = "Choose_action";
  private values=[{'id':'choose_action','title':'Choose action'}];
  calendar_value:string = "choose_action";
  public calendar_values=[{'id':'choose_action','title':'Choose action'},{'id':'today','title':'Today'},{'id':'yesterday','title':'Yesterday'},{'id':'this_w','title':'This week'},{'id':'last_w','title':'Last week'},{'id':'this_m','title':'This month'},{'id':'last_m','title':'Last month'},{'id':'this_y','title':'This year'},{'id':'last_y','title':'Last year'},{'id':'custom','title':'Custom'}]
  cr_chart:any;
  field_arr=['uniques','raw','cr','epv','leads','profit_margin','revenue','profit'];

  some_data=[
  [1,12],
  [2,5],
  [3,18],
  [4,13],
  [5,7],
  [6,4],
  [7,9],
  [8,10],
  [9,15],
  [10,22]
]
  calendar_data:boolean;
  period_value='';
  hour_arr=['0h','1h','2h','3h','4h','5h','6h','7h','8h','9h','10h','11h','12h','13h','14h','15h','16h','17h','18','19h','20h','21h','22h','23h'];
  day_arr=['Mon','Tue','Wen','Thu','Fri','Sut','Sun'];
  month_arr=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
 geo_arr=[];
  chart_value:string='hour';
  table_value:string='pub';
  public eventEmitter$: EventEmitter<any>;

  hide_calendar:boolean=true;

  chartColors_arr={'raw':'#a4e6f0','uniques':'#2bb6f5','epv':'#FF8C00','revenue':'#2F4F4F','leads':'#A0522D','profit':'#7FFFD4','profit_margin':'#4169E1','cr':'#696969'};
  constructor(private filters:Filters,public router: Router, private calendarService:CalendarService,http: Http,domains:Domains,private checkboxTableService:CheckboxTableService, public globalLogin:GlobalLogin) {
    this._http = http;
    this.domain=domains.domain;
    this.csrf = domains.csrf;
    this.urlGetListOffersPublishers = domains.urlGetListOffersPublishers;
    this.urlsendStatistic = domains.sendStatistic;
    this.urlsendChartStatistic = domains.sendChartStatistic;
    this.getStatisticHome = domains.getStatisticHome;
    this.urlgetTableStatistic = domains.getTableStatistic;
    this.eventEmitter$ = new EventEmitter();

    this.calendarService.name_class='home_calendar';
    this.calendarService.id='id_home_calendar';
    this.calendarService.id2='id2_home_calendar';

    this.calendarService.hideCalendar();
    this.hide_calendar=true;

    if(this.globalLogin.role=='publisher'){
      this.field_arr=['uniques','raw','cr','leads','revenue'];
      this.table_value='ofr';
    
    }
    let dat=new Date();
    this.date=dat.getTime();
    
    this.period_type['geo']=false;
    this.period_type['dow']=false;
    this.period_type['month']=false;
    this.period_type['hour']=false;
    
    this.period_arr['dow_arr']=['Mon','Tue','Wen','Thu','Fri','Sut','Sun'];
    this.period_arr['month_arr']=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.period_arr['hour_arr']=['0h','1h','2h','3h','4h','5h','6h','7h','8h','9h','10h','11h','12h','13h','14h','15h','16h','17h','18','19h','20h','21h','22h','23h'];
    this.period_arr['geo_arr']=['0h','1h','2h','3h','4h','5h','6h','7h','8h','9h','10h','11h','12h','13h','14h','15h','16h','17h','18','19h','20h','21h','22h','23h'];

    this.perfomers_type['geo']=false;
    this.perfomers_type['pub']=false;
    this.perfomers_type['ofr']=false;
    this.perfomers_type['am']=false;
    this.perfomers_type['adv']=false;

    this._http.get(this.domain + this.csrf)
        .map((res: Response) => {
          this.body = res.json();
          console.log('csrf=',this.body.csrf)
        })
        .subscribe(
            res=>this.result=res
        );

    this._http.get(this.domain + this.urlGetListOffersPublishers)
        .map((res: Response) => {
          return res.json();
         
        })
        .subscribe(
            res=>{
              this.offer_values=res.listoffers;
              this.offer_values.unshift({'id':'0','title':'All offers'});
              this.publisher_values=res.listpublishers;
              this.publisher_values.unshift({'id':'0','title':'All accounts'});
              this.calendar_value=res.filterTime.type;
    
              if(this.calendar_value=='custom'){
                this.calendar_data=true;
                this.start_day=res.filterTime.start;
                this.calendarService.start_day=res.filterTime.start;
                this.end_day=res.filterTime.end;
                this.calendarService.end_day=res.filterTime.end;
              
                // jQuery( ".datepicker" ).datepicker( "setDate", this.start_day );
                // jQuery('.calendar_ok').addClass('hidden_calendar_ok');
                jQuery('.hidden_calendar_ok').hide();
                this.calendarService.showCalendar();
                this.hide_calendar=false;
                this.sendStatistic();
                // this.sendChartStatistic(this.chart_value);
              }else{
                this.calendar_data=false;
                this.sendStatistic();
                // this.sendChartStatistic('hour');
              }
    
            },
            (err) => {
              let error=err.json();
              if(error.logged==false){

                // window.location.replace(this.domain);
                this.router.navigate(['/']);
                let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                localStorage.setItem('current_breadcrumb',current_breadcrumb);
                localStorage.setItem('current_url',this.router.url);
                this.globalLogin.serverTime=false;
                this.globalLogin.role=null;
              }


            }
        );


    // this._http.get(this.domain + this.urlGetListPublishers)
    //     .map((res: Response) => {
    //       return res.json();
    //
    //     })
    //     .subscribe(
    //         res=>{this.publisher_values=res.listpublishers;this.publisher_values.unshift({'id':'0','title':'All accounts'})}
    //     );

    setTimeout(() => {
      if (Highcharts) {
        this.roda = true;
      } else {
        console.log(`Highcharts is not defined`);
      }
    }, 1000);
  }
ngAfterViewInit(){

  this.eventEmitter$.subscribe(items=>{
    for(let i=0;i<items.rows.length;i++){
    
      this.ShareData[items.rows[i].name] = new Highcharts.chart(items.rows[i].name,{
        chart: {
          type: 'pie',
          width: 25,
          height: 25,
          backgroundColor: 'transparent'
        },
        title: {
          text: ''
        },
        subtitle: {
          
        },
        plotOptions: {
          series: {
            size: 22,
            dataLabels: {
              enabled: false,
              format: '{point.name}: {point.y:.1f}%'
            },
            events: {
              mouseOver: function () {
                this.chart.chartBackground.css({
                  color: '#656565',
                });
              },
              mouseOut: function () {
                this.chart.chartBackground.css({
                  color: 'transparent',
                });
              }
              },
            states: {
              hover: {
                enabled: false
              }
            }
          }
        },

        tooltip: {
          enabled: false
          // headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          // pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
          
        },
        series: [{
          name: '',
          colorByPoint: false,
          data: [
            {
              name: '',
              y: 80

            },
            {
              name: '',
              y: 20,
              color: '#FFFFFF'
            },
            ]
        }],
        navigation: {
          buttonOptions: {
            enabled: false
          }
        },
        credits: {
          enabled: false
        },
   
      });
 
    }
  })
}
  ngOnInit() {
    console.log(this.globalLogin);

    for(let i=0;i<this.field_arr.length;i++){
      this.chartData2[this.field_arr[i]]=new Highcharts.chart(this.field_arr[i],{

        chart: {
          // zoomType: 'x',
          type: 'line',
          plotBorderWidth: 0,
          margin: [0, 0, 0, 0],
          spacing: [0, 0, 0, 0],
          maxWidth: 300,
          minWidth:150,
          height:48
        },
        title: {
          text: ''
        },
        subtitle: {
          // text: document.ontouchstart === undefined ?
          //     'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
          type: 'datetime',
          labels: {
            enabled: false
          },
          gridLineWidth: 0.5,
          visible: false,

        },
        yAxis: {
          softMax:-1,
          title: {
            text: '',

          },
          // min: 0,
          // startOnTick: false,
          // endOnTick: false,
          // max:100,
          labels: {
            enabled: false
          },
          gridLineWidth: 0.5,
          visible: false,
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          series: {
            pointStart: this.date,
            seriespointInterval: 3600 * 1000,
            width: '100%',
            marker: {
              enabled: false
            },
            turboThreshold:1000,
            fillColor: null,
            fillOpacity: 1
          },
          area: {
            fillColor: {
              // linearGradient: {
              //   x1: 0,
              //   y1: 0,
              //   x2: 0,
              //   y2: 1
              // },
              stops: [
                [0, Highcharts.getOptions().colors[0]],
                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
              ]
            },
            marker: {
              radius: 0,
              enabled:false
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1,
                enabled:false
              },
              
            },
            threshold: null
          }
        },
        responsive: {
          rules: [{
            condition: {
              maxWidth: 1650,
              minWidth:1280
            },
            chartOptions: {
              chart: {
                height: 48
              },
              subtitle: {
                text: null
              },
              navigator: {
                enabled: false
              }
            }
          }]
        },

        series: [{
          type: 'area',
          name: this.field_arr[i],
          color: '#43c9e0',
          // data: [303836,172013,152132,151974,152089]
        }],
        navigation: {
          buttonOptions: {
            enabled: false
          }
        },
      

        credits: {
          enabled: false
        },

        tooltip: {
          enabled: false
        //   formatter: function() {
        //     var r = (this.points[0].y/this.points[1].y * 100 - 100);
        //     if(r > 0){
        //       return '<span style="color: blue">'  + r.toFixed(2) + '%</span>';
        //     }
        //     else {
        //       return '<span style="color: red">' + r.toFixed(2) + '%</span>';
        //     }
        //   },
        //   shared: true
        }
      });
    }
    let self=this;
  this.chartData = new Highcharts.chart('main_chart',{
    chart: {
      type: 'line',
      marginLeft: 0,
      spacingLeft: 10,
      // margin: [0, 0, 0, 0],
      // spacingRight: 0,
      // marginRight: 0,
      
      events: {
        load: function(chart) {
          console.log(typeof chart)
         if(typeof chart.type=='undefined' ){
      
        
          // var chart = this;
         
          jQuery.each(chart.legend.allItems, function(i, item){
          
            // let check = jQuery(item.checkbox),
            let check = jQuery(item.checkbox),
               
                left = parseFloat(check.css('left')),
                right = parseFloat(check.css('right')),
                label = item.legendItem;
          
              //   check.css({
              // left: '',
              // righdebugger;t: 155 + 'px'
              check.css({
            left: ((left+right)-137)+'px'
            // right: 155 + 'px'
          
            });
          
            console.log('check',check);
            console.log(chart);
          });
        
        }
        }
      }
      // colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9',
      //   '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1']
    },
    // responsive: {
    //   rules: [{
    //     // condition: {
    //     //   maxWidth: 500
    //     // },
    //     chartOptions: {
    //       legend: {
    //         align: 'right',
    //         // verticalAlign: 'bottom',
    //         // layout: 'horizontal'
    //       }
    //     }
    //   }]
    // },
    xAxis: {
      // title:'Periode',
      categories:this.period_arr['hour_arr'],
      labels: {
        enabled: false
      },
      visible: false,
      gridLineWidth: 0.5,
    },
    yAxis: {

      gridLineWidth: 0.5,
      visible: false,
      labels: {
        enabled: false
      },
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      // itemWidth : 100,
      width : 134,
      // verticalAlign: 'middle',
      itemMarginBottom: 7,
      floating:false,
      x: 10,
      symbolPadding:7,
      symbolWidth: 25,
      itemStyle: {
          color: '#3b3b3b',
          fontSize: '13px',
          fontWeight: 'normal',
          fontFamily:' Arial,Helvetica Neue,Helvetica,sans-serif',
       
          
    }
    },
    // tooltip: {
    //   xDateFormat: '%hour',
    //   shared: false
    // },
    plotOptions: {
      series: {
        showCheckbox: true,
        pointStart: 0,
        marker:{
          // lineWidth: 50,
          // lineColor: '#FFFFFF',
          radius: 5
        },
        
        // seriespointInterval: 1,
        events: {
          checkboxClick: function (event) {
            if (!event.checked) {

              this.hide();
              // this.legendSymbol.hide();
            } else {

              this.show();
              // this.legendSymbol.hide();
            }

          }

        }
      }
    },
    title:{
      text:''
    },
    series: [
      // {
      //   name:'Profit margin',
      //   lineWidth: 3.5,
      //   marker: {
      //     lineWidth: 2,
      //     lineColor: "#ffffff"
      //   },
      // }
    ],
    navigation: {
      buttonOptions: {
        enabled: false
      }
    },
    credits: {
      enabled: false
    },
  });

  console.log(this.chartData);
       
    // let self=this;
    jQuery("."+self.calendarService.name_class).datepicker({
      onSelect:function(d,t){
        // self.start_day=
    
        if(t.id==self.calendarService.id){
          self.start_day=d;
          debugger;
        }else{
          self.end_day=d;
        }

      }
    });

    
  }
  pushOnOffers($event){
    // let data='MetricGraphs[offer_id]='+this.offer_value+'&_csrf='+this.body.csrf;
    // let headers=new Headers();
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // if(this.offer_value=='0'){
    //   this._http.get(this.domain + this.urlGetListOffersPublishers)
    //       .map((res: Response) => {
    //         return res.json();
    //
    //       })
    //       .subscribe(
    //           res=>{
    //             this.offer_values=res.listoffers;
    //             this.offer_values.unshift({'id':'0','title':'All offers'});
    //             this.offer_value='0';
    //             this.publisher_values=res.listpublishers;
    //             this.publisher_values.unshift({'id':'0','title':'All accounts'});
    //             this.publisher_value='0';
    //           }
    //       );
    // }else{
    //   this._http.get(this.domain + this.getStatisticHome+'&offer_id='+this.offer_value)
    //       .map((res: Response) => {
    //         return res.json();
    //
    //       })
    //       .subscribe(
    //           res=>{this.publisher_values=res.listpublishers;
    //             this.publisher_values.unshift({'id':'0','title':'All accounts'});
    //             this.publisher_value='0';
    //           }
    //       );
    // }
   
  }
  pushOnPublishers($event){
 
    // let data='MetricGraphs[user_id]='+this.publisher_value+'&_csrf='+this.body.csrf;
    // let headers=new Headers();
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    if(this.publisher_value=='0'){
      this._http.get(this.domain + this.urlGetListOffersPublishers)
          .map((res: Response) => {
            return res.json();

          })
          .subscribe(
              res=>{
                this.publisher_values=res.listpublishers;
                this.publisher_values.unshift({'id':'0','title':'All accounts'});
                this.offer_value='0';
                this.offer_values=res.listoffers;
                this.offer_values.unshift({'id':'0','title':'All offers'});
                this.offer_value='0';
              },
              (err) => {
                let error=err.json();
                if(error.logged==false){

                  // window.location.replace(this.domain);
                  this.router.navigate(['/']);
                  let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                  localStorage.setItem('current_breadcrumb',current_breadcrumb);
                  localStorage.setItem('current_url',this.router.url);
                  this.globalLogin.serverTime=false;
                  this.globalLogin.role=null;
                }


              }
          );
    }else{
      this._http.get(this.domain + this.getStatisticHome+'&user_id='+this.publisher_value)
          .map((res: Response) => {
            return res.json();

          })
          .subscribe(
              res=>{this.offer_values=res.listoffers;this.offer_values.unshift({'id':'0','title':'All offers'});this.offer_value='0';},
              (err) => {
                let error=err.json();
                if(error.logged==false){

                  // window.location.replace(this.domain);
                  this.router.navigate(['/']);
                  let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                  localStorage.setItem('current_breadcrumb',current_breadcrumb);
                  localStorage.setItem('current_url',this.router.url);
                  this.globalLogin.serverTime=false;
                  this.globalLogin.role=null;
                }


              }
          );
    }
 
  }
  sendStatistic(){
    let url_data;
    if(this.calendar_data==true){
      url_data='&filterDateStart='+this.start_day+'&filterDateEnd='+this.end_day;
      debugger;
    }else{
      url_data="&filterPeriod="+this.calendar_value;
    }
        this.sendChartStatistic(this.chart_value);
    
    this.getTableStatistic(this.table_value);
    this._http.get(this.domain + this.urlsendStatistic+'?user_id='+this.publisher_value+'&offer_id='+this.offer_value+url_data)
          .map((res: Response) => {
            return res.json();
    
          })
          .subscribe(
              res=>{
                
                for(let key in res.graphs){

                  this.chartData2[key].series[0].setData(res.graphs[key][0].data);
                
                  // this.chartData2[key].series[1].setData(res.graphs[key][1].data);
                  // this.chartData2[key].options.plotOptions.series.pointStart=res.graphs[key][1].start;
                  this.chartData2[key].options.plotOptions.series.pointStart=res.graphs[key][0].start;
                  // this.chartData2[key].options.plotOptions.series.seriespointInterval=res.graphs[key][1].step*1000;
                  this.chartData2[key].options.plotOptions.series.seriespointInterval=res.graphs[key][0].step*1000;
                  if(res.graphs[key][1].total=='0'){
                    this.chartData2['percent_'+key]='0';
                  }else{
                    this.chartData2['percent_'+key]=(res.graphs[key][0].total/res.graphs[key][1].total*100-100).toFixed(2);   
                  }
                 
                  this.chartData2['total_'+key]=res.graphs[key][0].total;
                 
                }
              },
              (err) => {
                let error=err.json();
                if(error.logged==false){

                  // window.location.replace(this.domain);
                  this.router.navigate(['/']);
                  let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                  localStorage.setItem('current_breadcrumb',current_breadcrumb);
                  localStorage.setItem('current_url',this.router.url);
                  this.globalLogin.serverTime=false;
                  this.globalLogin.role=null;
                }


              }
          );
  }
  firstToUpperCase( str ) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
  }
  sendChartStatistic(value){
    this.chart_value=value;
    for(let key in this.period_type){
      this.period_type[key]=false;
      this.period_type[value]=true;
    }

    
    let url_data;
    this.chartData.series=[];

    if(this.calendar_data==true){
      url_data='&filterDateStart='+this.start_day+'&filterDateEnd='+this.end_day
    }else{
      url_data="&filterPeriod="+this.calendar_value;
    }
    this._http.get(this.domain + this.urlsendChartStatistic+'?user_id='+this.publisher_value+'&offer_id='+this.offer_value+url_data+'&t='+value)
        .map((res: Response) => {
          return res.json();

        })
        .subscribe(data=>{
          // if(this.chartData.series.length!=0){
          //     for(let i=this.chartData.series.length - 1; i > -1; i--){
          //       this.chartData.series[i].remove(true);
          //       debugger;
          //     }
          // }
          for(let key in data.chartgraph){
            if(key=='profit_margin'){
              key='profit margin';
            }
        
      
            this.chartData.addSeries({
              
              name: this.firstToUpperCase(key),
              lineWidth: 3.5,
                color: this.chartColors_arr[key],
              marker: {
                    lineWidth: 2,
                    lineColor: "#ffffff"
                  },
                  selected: true,
              data: data.chartgraph[key]
            });
               
            this.chartData.options.chart.events.load(this.chartData);
            // for(let i=0;i <this.chartData.series.length;i++){
              // this.chartData.series[i].visible=false;
              // this.chartData.series[i].userOptions.visible=true;
              // lineWidth: 3.5,
                  //   color: '#2F4F4F',
                  //   marker: {
                  //     lineWidth: 2,
                  //     lineColor: "#ffffff"
                  //   },
              // this.chartData.series.name=key;
              // this.chartData.series.lineWidth=3.5;
              // this.chartData.series.color='#2F4F4F';
              // this.chartData.series.marker.lineWidth=2;
              // this.chartData.series.marker.lineColor='#ffffff';
              // this.chartData.series[key.userOptions.showInLegend=false;
              // if(this.chartData.series[i].userOptions.alias==key){
          
                // this.chartData.series.setData(data.chartgraph[key]);
                // this.chartData.series[i].visible=true;
                // this.chartData.series[i].userOptions.visible=true;
                // this.chartData.series[i].userOptions.showInLegend=true;
              
              // }
            // }
          }
          this.chartData.xAxis[0].setCategories(this.period_arr[value+'_arr']);
           
        },
            (err) => {
              let error=err.json();
              if(error.logged==false){

                // window.location.replace(this.domain);
                this.router.navigate(['/']);
                let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                localStorage.setItem('current_breadcrumb',current_breadcrumb);
                localStorage.setItem('current_url',this.router.url);
                this.globalLogin.serverTime=false;
                this.globalLogin.role=null;
              }


            })
  }
  getTableStatistic(value){
    this.table_value=value;
    for(let key in this.perfomers_type){
      this.perfomers_type[key]=false;
      this.perfomers_type[value]=true;
    }


    let url_data;
    if(this.calendar_data==true){
      url_data='?filterDateStart='+this.start_day+'&filterDateEnd='+this.end_day
    }else{
      url_data="?filterPeriod="+this.calendar_value;
    }
    this._http.get(this.domain + this.urlgetTableStatistic+url_data+'&t='+value)
        .map((res: Response) => {
          return res.json();

        })
        .subscribe(data=>{
       
          this.list=data;
          setTimeout(()=>{this.eventEmitter$.emit(this.list);
            for(let i=0;i<this.list.rows.length;i++){
            
              this.ShareData[this.list.rows[i].name].series[0].setData([parseFloat(this.list.rows[i].share),100-parseFloat(this.list.rows[i].share)]);
              // this.ShareData[this.list.rows[i].name].series[0].setData([100-this.list.rows[i].share]);
         
            }

          },1000);

      
          
          // for(let key in data.chartgraph){
          //   for(let i=0;i <this.chartData.series.length;i++){
          //     if(this.chartData.series[i].userOptions.alias==key){
          //       this.chartData.series[i].setData(data.chartgraph[key]);
          //     }
          //   }
          // }
          // this.chartData.xAxis[0].setCategories(this.period_arr[value+'_arr']);
        },
            (err) => {
              let error=err.json();
              if(error.logged==false){

                // window.location.replace(this.domain);
                this.router.navigate(['/']);
                let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                localStorage.setItem('current_breadcrumb',current_breadcrumb);
                localStorage.setItem('current_url',this.router.url);
                this.globalLogin.serverTime=false;
                this.globalLogin.role=null;
              }


            })
  }
  change(){
    // this.chartData.series[0].data=this.some_data;
    // this.chartData2.series[0].data=this.some_data;
    let chart = new Highcharts.Chart(this.chartData);
    let chart2 = new Highcharts.Chart(this.chartData2);
    let chart3 = new Highcharts.Chart(this.chartData2);
    let chart4 = new Highcharts.Chart(this.chartData2);
    let chart5 = new Highcharts.Chart(this.chartData2);
    let chart6 = new Highcharts.Chart(this.chartData2);
    let chart7 = new Highcharts.Chart(this.chartData2);
    let chart8 = new Highcharts.Chart(this.chartData2);
    let chart9 = new Highcharts.Chart(this.chartData2);
    this.roda = true;
  }
  pushOnDate(value){
    this.calendar_value=value;
    if (value == 'custom') {
      this.calendar_data=true;
      // jQuery('.calendar_ok').addClass('hidden_calendar_ok');
      jQuery('.hidden_calendar_ok').hide();
      this.today = new Date();
      this.dd = this.today.getDate();
      this.mm = this.today.getMonth() + 1;
      this.yy = this.today.getFullYear();

      if (this.dd < 10) {
        this.dd =+ '0' + this.dd;
      }
      if (this.mm < 10){
        this.mm =+ '0' + this.mm;
      }
      this.start_day=this.mm+'/'+this.dd+'/'+this.yy;
      this.end_day=this.mm+'/'+this.dd+'/'+this.yy;
      jQuery( "."+this.calendarService.name_class).datepicker( "setDate", this.start_day );
      this.hide_calendar=true;
      this.calendarService.showCalendar();
      
    
    }else{
      this.calendarService.hideCalendar();
      this.calendar_data=false;
      // this.filters.filterPeriods(value,this.urlsendStatistic).subscribe(res=>{
      //  
      //   this.sendStatistic();
      //   // this.list=res;
      //   // this.total_revenue = this.list.total_count.revenue;
      //   // this.total_cost = this.list.total_count.cost;
      //   // this.total_profit = this.list.total_count.profit;
      //   // this.total_profit_margin = this.list.total_count.profit_margin;
      //
      //   console.log('filter')
      // })
    }
  }
  sendDate(start_day,end_day){
   
    // this.filters.sendDate(this.urlsendStatistic,start_day,end_day).subscribe(
    //     res=> {
    //       // this.list = res;
    //       // for(let i=0;i<this.list.rows.length;i++){
    //       //   this.show_offer[this.list.rows[i].bundle_id]=false;
    //       //   this.getListOffer(this.list.rows[i].bundle_id);
    //       //
    //       // }
    //     })
  }
  sort(value:string) {
    // for(let i=0;i<this.list.rows.length;i++){
    //   for(let key in this.list_offer){
    //     if(key==this.list.rows[i].bundle_id)  {
    //
    //       this.show_offer[this.list.rows[i].bundle_id]=false;
    //       this.getListOffer(this.list.rows[i].bundle_id);
    //     }
    //   }
    //
    // }
    this.filters.sorts(value, this.urlgetTableStatistic)
        .subscribe(
            res=> {
              this.list = res;
              setTimeout(()=>{this.eventEmitter$.emit(this.list);
                for(let i=0;i<this.list.rows.length;i++){

                  this.ShareData[this.list.rows[i].name].series[0].setData([parseFloat(this.list.rows[i].share),100-parseFloat(this.list.rows[i].share)]);
                  // this.ShareData[this.list.rows[i].name].series[0].setData([100-this.list.rows[i].share]);

                }

              },1000);
              // for(let i=0;i<this.list.rows.length;i++){
              //     debugger;
              //     // for (let key in this.list.rows[i]) {
              //     //     if (key == 'offers') {
              //     //         // console.log('this.list_offer4',this.list.rows[i][key]);
              //     //         this.list_offer[this.list.rows[i].bundle_id] = this.list.rows[i][key];
              //     //         console.log('this.list_offer', this.list_offer)
              //     //         this.offer_list_get = false;
              //     //
              //     //
              //     //     }
              //     //
              //     //
              //     // }
              //     this.show_offer[this.list.rows[i].bundle_id]=false;
              //     debugger;
              //    this.getListOffer(this.list.rows[i].bundle_id);
              //  
              // }
              // for(let i=0;i<this.list.rows.length;i++){
              //     this.getListOffer(this.list.rows[i].bundle_id);
              //    
              // }
            }
        );
  }

}
