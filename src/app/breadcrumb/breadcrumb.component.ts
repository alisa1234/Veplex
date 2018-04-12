import { Component, OnInit,OnDestroy,AfterViewInit } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from "@angular/router";
import "rxjs/add/operator/filter";
import {GlobalLogin} from '../global-login';

declare var jQuery:any;

interface IBreadcrumb {
  label: string;
  params?: Params;
  url: string;
  index?:number
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit,AfterViewInit {

  public breadcrumbs: IBreadcrumb[];
  breadcrumbs_old: IBreadcrumb[]=[];
  breadcrumbs_old_local: IBreadcrumb[]=[];
  subscribtion:any;
  
  regV:any;

  constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private globalLogin:GlobalLogin
  ) {
    this.breadcrumbs = [];
    this.breadcrumbs_old_local=JSON.parse(localStorage.getItem('breadcramb_arr'));

    if(this.breadcrumbs_old_local!=null){
      this.breadcrumbs_old=this.breadcrumbs_old_local;

      
    }else{
     
      this.breadcrumbs_old = [];  
    }

  }

  ngOnInit() {
 
    const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
  
      if(event instanceof NavigationEnd){
        if(event.url==='/'){
          this.breadcrumbs_old=[];
    
        }
      }
      let root: ActivatedRoute = this.activatedRoute.root;
      this.breadcrumbs = this.getBreadcrumbs(root);
    
    });

  }
  ngAfterViewInit(){

  }

  private getBreadcrumbs(route: ActivatedRoute, url: string="", breadcrumbs: IBreadcrumb[]=[]): IBreadcrumb[] {

    const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";
    let children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      return breadcrumbs;
    }
    for (let child of children) {
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }
      let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");
      url += `/${routeURL}`;
      let breadcrumb: IBreadcrumb = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        params: child.snapshot.params,
        url: url
      };
     let str:string[]=breadcrumb.url.split('/');
     
      breadcrumbs.push(breadcrumb);
     
      if(this.breadcrumbs_old.length==0){
        this.breadcrumbs_old.push(breadcrumb);
       
      }else {
        this.breadcrumbs_old.push(breadcrumb);
     
        for (let i = 0; i < this.breadcrumbs_old.length; i++) {
         
          if (this.breadcrumbs_old[i].label === breadcrumb.label) {
            let index =i;
            let newArr:any[]=this.breadcrumbs_old.slice(0,index+1);
           
            this.breadcrumbs_old=newArr;
            localStorage.setItem('breadcramb_arr',JSON.stringify(this.breadcrumbs_old));
            
          }else{
          }
              let str_old:string[] = this.breadcrumbs_old[i].url.split('/');
            for (let z = 0; z < str.length; z++) {
              if (str[2] != str_old[2]) {
                this.breadcrumbs_old=[];
                this.breadcrumbs_old.push(breadcrumb);
                
                localStorage.setItem('breadcramb_arr',JSON.stringify(this.breadcrumbs_old));
              }
            }
         
        }
     
        }
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
  }

}
