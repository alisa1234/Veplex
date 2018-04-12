
import { Component, OnInit, EventEmitter,AfterViewInit,ViewChild } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from '../../domains';
import { Router,ActivatedRoute } from '@angular/router';
import {PopupChange} from '../../popup-change';
import {Filters} from '../../filters';
import {InitChosen} from '../../initChosen';
import {RenderStatistic} from "../render-statistic";
import {CalendarService} from "../../calendar/calendar.service";
import {GlobalLogin} from '../../global-login';

declare var jQuery:any;

@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.scss'],
  host:{'class':'root'}
})
export class ConversionComponent implements OnInit {
    _http:Http;
    currentPage:number;
    result:Object;
    field_name:string;
    params:string;
    body:any;

    domain:string;
    url:string;
    csrf:string;
    urlGetList:string;


    total_epv:any;
    total_cr:any;
    total_revenue:any;
    total_leads:any;
    total_uniques:any;
    total_raw:any;
    total_type:any;

    tid:string;
    uid:string;
    subid:string;
    subid2:string;
    subid3:string;
    subid4:string;
    ip:string;


    list = {
        rows: [],
        pagination: (<any>Object),
        sort: (<any>Object),
        filterParams: (<any>Object),
        total_count: (<any>Object),
        filterTime: (<any>Object)
    };

    display_from:any;
    display_to:any;
    display_of:any;
    displaying:boolean = true;

    page:any;
    page_count:any;
    page_button_next:boolean = true;
    page_button_next_disabled:boolean = true;
    page_button_next_arrow:boolean = true;
    page_button_prev:boolean = true;
    page_button_first:boolean = true;
    current_page:boolean = true;

    start_day:string;
    end_day:string;
    today:any;
    dd:number;
    mm:number;
    yy:number;

    not_found_result:boolean = false;

    value:string = "choose_action";
    public values = [{'id': 'choose_action', 'title': 'Choose action'}, {
        'id': 'today',
        'title': 'Today'
    }, {'id': 'yesterday', 'title': 'Yesterday'}, {'id': 'this_w', 'title': 'This week'}, {
        'id': 'last_w',
        'title': 'Last week'
    }, {'id': 'this_m', 'title': 'This month'}, {'id': 'last_m', 'title': 'Last month'}, {
        'id': 'this_y',
        'title': 'This year'
    }, {'id': 'last_y', 'title': 'Last year'}, {'id': 'custom', 'title': 'Custom'}]

    tittle_id:string;
    tittle_name:string;

    constructor(http:Http, domains:Domains, public router:Router, public route:ActivatedRoute, public popupChange:PopupChange, public filters:Filters, public initChosen:InitChosen, public calendarService:CalendarService, public renderStatistic:RenderStatistic, public globalLogin:GlobalLogin) {
        this._http = http;
        // this.url = domains.url;
        this.domain = domains.domain;
        this.csrf = domains.csrf;
        this.urlGetList = domains.urlGetOfferConversions;
        this.calendarService.name_class='statistic-conversion_calendar';
        this.calendarService.id='id_statistic-conversion_calendar';
        this.calendarService.id2='id2_statistic-conversion_calendar';
        this.calendarService.hideCalendar();
        let result:any;
        this.tittle_id = localStorage.getItem('statistic_offer_id');
        this.tittle_name = localStorage.getItem('statistic_offer_name');

        if (this.route.snapshot.data['name'] == 'conversionsStatistic') {

            this.route.snapshot.data['breadcrumb'] = 'Conversions ' + this.tittle_name;
        }

        this._http.get(this.domain + this.csrf)
            .map((res:Response) => {
                this.body = res.json();
            })
            .subscribe(
                res=>result = res
            );
        this.renderStatistic.eventEmitters.subscribe(data=> {
            this.list = data;
            if (this.list.rows.length == 0) {
                this.not_found_result = true;
            } else {
                this.value = this.list.filterTime.type;
                if (this.value == 'custom') {

                    this.calendarService.showCalendar();
                    this.calendarService.start_day = this.list.filterTime.start;
                    this.calendarService.end_day = this.list.filterTime.end;
                }

                // this.total_type= this.list.rows[0].total_type;
                this.total_type = this.list.total_count.type;
                this.total_raw = this.list.total_count.raw;
                this.total_uniques = this.list.total_count.uniques;
                this.total_leads = this.list.total_count.leads;
                this.total_revenue = this.list.total_count.revenue;
                this.total_cr = this.list.total_count.cr;
                this.total_epv = this.list.total_count.epv;

                this.currentPage = this.list.pagination.page + 1;
                this.page_count = this.list.pagination.pageCount;
                if (this.currentPage < this.page_count) {
                    this.page_button_next = false;
                }
                if (this.currentPage == this.page_count) {
                    this.page_button_next_disabled = false;
                }
                if (this.currentPage <= this.page_count) {
                    this.displaying = false;
                }

                if (this.list.pagination.totalCount > 100) {

                    this.display_from = this.list.pagination.pageSize * (this.list.pagination.page + 1) - (this.list.pagination.pageSize - 1);
                    this.display_to = this.list.pagination.pageSize * (this.list.pagination.page + 1);
                    this.display_of = this.list.pagination.totalCount;
                } else {

                    this.display_from = this.list.pagination.pageSize * (this.list.pagination.page + 1) - (this.list.pagination.pageSize - 1);
                    this.display_to = this.list.pagination.totalCount;
                    this.display_of = this.list.pagination.totalCount;
                }

                if (typeof this.list.filterParams != 'undefined') {

                    if (typeof this.list.filterParams.tid != 'undefined') {
                        this.tid = this.list.filterParams.tid.params;

                    }
                    if (typeof this.list.filterParams.uid != 'undefined') {
                        this.uid = this.list.filterParams.uid.params;

                    }
                    if (typeof this.list.filterParams.subid != 'undefined') {
                        this.subid = this.list.filterParams.subid.params;

                    }
                    if (typeof this.list.filterParams.subid2 != 'undefined') {
                        this.subid2 = this.list.filterParams.subid2.params;

                    }
                    if (typeof this.list.filterParams.subid3 != 'undefined') {
                        this.subid3 = this.list.filterParams.subid3.params;

                    }
                    if (typeof this.list.filterParams.subid4 != 'undefined') {
                        this.subid4 = this.list.filterParams.subid4.params;

                    }
                    if (typeof this.list.filterParams.ip != 'undefined') {
                        this.ip = this.list.filterParams.ip.params;

                    }
                }
            }
        })

    }

    ngOnInit() {
        this.route
            .params
            .subscribe(params => {
                console.log(params);
                this.tittle_id = params['id'];
                // this.offer_id = params['id'];
                // this.publisher_id = params['id'];
                this.renderStatistic.getOfferConversions(this.tittle_id);
                // this.code = params['code'];
                // this.userEmail = params['email'];
            });
    }

    pushOnDate(value) {
        if (value == 'custom') {
            this.today = new Date();
            this.dd = this.today.getDate();
            this.mm = this.today.getMonth() + 1;
            this.yy = this.today.getFullYear();

            if (this.dd < 10) {
                this.dd = +'0' + this.dd;
            }
            if (this.mm < 10) {
                this.mm = +'0' + this.mm;
            }
            this.start_day = this.mm + '/' + this.dd + '/' + this.yy;
            this.end_day = this.mm + '/' + this.dd + '/' + this.yy;
            jQuery("."+this.calendarService.name_class).datepicker("setDate", this.start_day);

            this.calendarService.showCalendar();
        } else {
            this.calendarService.hideCalendar();

            this.filters.filterPeriods(value, this.urlGetList).subscribe(res=> {
                    this.list = res;
                    this.total_raw = this.list.total_count.raw;
                    this.total_uniques = this.list.total_count.uniques;
                    this.total_leads = this.list.total_count.leads;
                    this.total_revenue = this.list.total_count.revenue;
                    this.total_cr = this.list.total_count.cr;
                    this.total_epv = this.list.total_count.epv;


                },
                (err) => {
                    let error = err.json();
                    if (error.logged == false) {

                        // window.location.replace(this.domain);
                        this.router.navigate(['/']);
                        let current_breadcrumb = localStorage.getItem('breadcramb_arr');
                        localStorage.setItem('current_breadcrumb', current_breadcrumb);
                        localStorage.setItem('current_url', this.router.url);
                        this.globalLogin.serverTime = false;
                        this.globalLogin.role = null;
                    }


                })
        }
    }

    sort(value:string) {

        this.filters.sorts(value, this.urlGetList)
            .subscribe(
                res=> {
                    this.list = res;

                },
                (err) => {
                    let error = err.json();
                    if (error.logged == false) {

                        // window.location.replace(this.domain);
                        this.router.navigate(['/']);
                        let current_breadcrumb = localStorage.getItem('breadcramb_arr');
                        localStorage.setItem('current_breadcrumb', current_breadcrumb);
                        localStorage.setItem('current_url', this.router.url);
                        this.globalLogin.serverTime = false;
                        this.globalLogin.role = null;
                    }


                });
    }

    enter_search(value, object) {

        this.filters.searches(value, this.urlGetList).subscribe(
            res=> {
                this.list = res;

                this.total_type = this.list.total_count.type;
                this.total_raw = this.list.total_count.raw;
                this.total_uniques = this.list.total_count.uniques;
                this.total_leads = this.list.total_count.leads;
                this.total_revenue = this.list.total_count.revenue;
                this.total_cr = this.list.total_count.cr;
                this.total_epv = this.list.total_count.epv;
                if (typeof this.list.filterParams != 'undefined') {

                    // jQuery('button[value="' + value + '"]').addClass('active');
                    object.hidden_delete = false;
                } else {

                    // jQuery('button[value="' + value + '"]').removeClass('active')
                    object.hidden_delete = true;
                }
                object.hidden = true;

                return true;
            },
            (err) => {
                let error = err.json();
                if (error.logged == false) {

                    // window.location.replace(this.domain);
                    this.router.navigate(['/']);
                    let current_breadcrumb = localStorage.getItem('breadcramb_arr');
                    localStorage.setItem('current_breadcrumb', current_breadcrumb);
                    localStorage.setItem('current_url', this.router.url);
                    this.globalLogin.serverTime = false;
                    this.globalLogin.role = null;
                }


            });
    }

    clear(value:string, object) {

        this.filters.clears(value, this.urlGetList).subscribe(
            res=> {
                this.list = res;

                this.total_type = this.list.total_count.type;
                this.total_raw = this.list.total_count.raw;
                this.total_uniques = this.list.total_count.uniques;
                this.total_leads = this.list.total_count.leads;
                this.total_revenue = this.list.total_count.revenue;
                this.total_cr = this.list.total_count.cr;
                this.total_epv = this.list.total_count.epv;
                object.hidden_delete = true;
                object.hidden = true;

                jQuery('button[value="' + value + '"]').removeClass('actives')
            },
            (err) => {
                let error = err.json();
                if (error.logged == false) {

                    // window.location.replace(this.domain);
                    this.router.navigate(['/']);
                    let current_breadcrumb = localStorage.getItem('breadcramb_arr');
                    localStorage.setItem('current_breadcrumb', current_breadcrumb);
                    localStorage.setItem('current_url', this.router.url);
                    this.globalLogin.serverTime = false;
                    this.globalLogin.role = null;
                }


            });
    }

    next() {
        this.filters.nexts(this.urlGetList, this).subscribe(
            res=> {
                this.list = res;


                this.display_from = this.list.pagination.pageSize * (this.list.pagination.page + 1) - (this.list.pagination.pageSize - 1);
                this.display_to = this.list.pagination.pageSize * (this.list.pagination.page + 1);
                this.display_of = this.list.pagination.totalCount;
                if (this.currentPage == this.page_count) {
                    this.display_to = this.list.pagination.totalCount;
                }
            },
            (err) => {
                let error = err.json();
                if (error.logged == false) {

                    // window.location.replace(this.domain);
                    this.router.navigate(['/']);
                    let current_breadcrumb = localStorage.getItem('breadcramb_arr');
                    localStorage.setItem('current_breadcrumb', current_breadcrumb);
                    localStorage.setItem('current_url', this.router.url);
                    this.globalLogin.serverTime = false;
                    this.globalLogin.role = null;
                }


            });

        if (this.currentPage < this.page_count && this.currentPage != this.page_count) {
            this.page_button_next_arrow = false;
            this.page_button_prev = false;
            this.page_button_next = true;
            this.current_page = false;
        } else {
            this.page_button_next = true;
            this.page_button_first = false;
            this.page_button_next_arrow = true;
        }
        if (this.currentPage > 2) {
            this.page_button_first = false;
        }
    }

    prev() {
        this.filters.prevs(this.urlGetList, this).subscribe(
            res=> {
                this.list = res;

                this.display_from = this.list.pagination.pageSize * (this.list.pagination.page + 1) - (this.list.pagination.pageSize - 1);
                this.display_to = this.list.pagination.pageSize * (this.list.pagination.page + 1);
                this.display_of = this.list.pagination.totalCount;
            },
            (err) => {
                let error = err.json();
                if (error.logged == false) {

                    // window.location.replace(this.domain);
                    this.router.navigate(['/']);
                    let current_breadcrumb = localStorage.getItem('breadcramb_arr');
                    localStorage.setItem('current_breadcrumb', current_breadcrumb);
                    localStorage.setItem('current_url', this.router.url);
                    this.globalLogin.serverTime = false;
                    this.globalLogin.role = null;
                }


            });
        if (this.currentPage < this.page_count && this.currentPage != 1) {
            this.page_button_next_arrow = false;
            this.page_button_prev = false;
            this.current_page = false;

        }
        if (this.currentPage == 1) {
            this.page_button_prev = true;
            this.page_button_next = false;
            this.page_button_next_arrow = true;
            this.page_button_first = true;
            this.current_page = true;
        }
        if (this.currentPage == 2) {
            this.page_button_first = true;
        }
    }

    first() {
        this.currentPage = 1;
        this.filters.firsts(this.urlGetList, this).subscribe(
            res=> {
                this.list = res;

                this.display_from = this.list.pagination.pageSize * (this.list.pagination.page + 1) - (this.list.pagination.pageSize - 1);
                this.display_to = this.list.pagination.pageSize * (this.list.pagination.page + 1);
                this.display_of = this.list.pagination.totalCount;
            },
            (err) => {
                let error = err.json();
                if (error.logged == false) {

                    // window.location.replace(this.domain);
                    this.router.navigate(['/']);
                    let current_breadcrumb = localStorage.getItem('breadcramb_arr');
                    localStorage.setItem('current_breadcrumb', current_breadcrumb);
                    localStorage.setItem('current_url', this.router.url);
                    this.globalLogin.serverTime = false;
                    this.globalLogin.role = null;
                }


            });
        if (this.currentPage == 1) {
            this.page_button_first = true;
            this.page_button_prev = true;
            this.page_button_next = false;
            this.current_page = true;
        }
    }

    sendDate(start_day, end_day) {

        this.filters.sendDate(this.urlGetList, start_day, end_day).subscribe(
            res=> {
                this.list = res;

            },
            (err) => {
                let error = err.json();
                if (error.logged == false) {

                    // window.location.replace(this.domain);
                    this.router.navigate(['/']);
                    let current_breadcrumb = localStorage.getItem('breadcramb_arr');
                    localStorage.setItem('current_breadcrumb', current_breadcrumb);
                    localStorage.setItem('current_url', this.router.url);
                    this.globalLogin.serverTime = false;
                    this.globalLogin.role = null;
                }


            })

    }
}
