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
  /**
   * @class DetailComponent
   * @constructor
   */
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
    //
    // this.subscribtion=this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
    //   console.log(event,NavigationEnd)
    //   debugger;
    //   if(event instanceof NavigationEnd){
    //     if(event.url==='/'){
    //       this.breadcrumbs_old=[];
    //
    //     }
    //     // 
    //     console.log(event.url)
    //
    //   }
    //   let root: ActivatedRoute = this.activatedRoute.root;
    //   this.breadcrumbs = this.getBreadcrumbs(root);
    //
    // });



    
  }

  /**
   * Let's go!
   *
   * @class DetailComponent
   * @method ngOnInit
   */
  ngOnInit() {
 
    const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      console.log(event,NavigationEnd)
  
      if(event instanceof NavigationEnd){
        if(event.url==='/'){
          this.breadcrumbs_old=[];
    
        }
        // 
        console.log(event.url)
    
      }
      let root: ActivatedRoute = this.activatedRoute.root;
      this.breadcrumbs = this.getBreadcrumbs(root);
    
    });
    // this.router.events.subscribe(event => {
    //   // console.log(event,NavigationEnd)
    //   // debugger;
    //   // if(event instanceof NavigationEnd){
    //   //   if(event.url==='/'){
    //   //     this.breadcrumbs_old=[];
    //   //
    //   //   }
    //   // 
    //   console.log(event)
    //   debugger;
    //
    //   // }
    //   // let root: ActivatedRoute = this.activatedRoute.root;
    //   // this.breadcrumbs = this.getBreadcrumbs(root);
    //
    // });
    //subscribe to the NavigationEnd event

    
  }
  ngAfterViewInit(){

  }
  // ngOnDestroy(){
  //   this.subscribtion.unsubscribe();
  // }

  /**
   * Returns array of IBreadcrumb objects that represent the breadcrumb
   *
   * @class DetailComponent
   * @method getBreadcrumbs
   * @param {ActivateRoute} route
   * @param {string} url
   * @param {IBreadcrumb[]} breadcrumbs
   */
  private getBreadcrumbs(route: ActivatedRoute, url: string="", breadcrumbs: IBreadcrumb[]=[]): IBreadcrumb[] {

    const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";

    //get the child routes
    let children: ActivatedRoute[] = route.children;
   
    //return if there are no more children
    if (children.length === 0) {
      return breadcrumbs;
    }

    //iterate over each children
    for (let child of children) {
      //verify primary route
      if (child.outlet !== PRIMARY_OUTLET) {
        
        continue;
      }

      //verify the custom data property "breadcrumb" is specified on the route
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      //get the route's URL segment
      let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");
     
      //append route URL to URL
      url += `/${routeURL}`;
      // for(let i=0;i<i<this.breadcrumbs_old.length;i++){
      //   if(this.breadcrumbs_old[i].url!=`/${routeURL}`){
      //     this.breadcrumbs_old=[];
      //     
      //   }
      // }
      //add breadcrumb
      let breadcrumb: IBreadcrumb = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        params: child.snapshot.params,
        url: url
      };
     let str:string[]=breadcrumb.url.split('/');
     
      breadcrumbs.push(breadcrumb);
     
      if(this.breadcrumbs_old.length==0){
        this.breadcrumbs_old.push(breadcrumb);
        // localStorage.setItem('breadcramb_arr',JSON.stringify(this.breadcrumbs_old));
        // debugger;
       
      }else {
        this.breadcrumbs_old.push(breadcrumb);
     
        for (let i = 0; i < this.breadcrumbs_old.length; i++) {
         
          if (this.breadcrumbs_old[i].label === breadcrumb.label) {
            let index =i;
            let newArr:any[]=this.breadcrumbs_old.slice(0,index+1);
           
            this.breadcrumbs_old=newArr;
         
            // if(this.breadcrumbs_old[i].label === 'Home'){
            //   this.breadcrumbs_old=[];
            //   
            // }
            localStorage.setItem('breadcramb_arr',JSON.stringify(this.breadcrumbs_old));
          
            // this.breadcrumbs_old = [];

            // this.breadcrumbs_old.shift();
            // this.breadcrumbs_old.push(breadcrumb);
           
            
          }else{
            
          
          }
        


        // }
          // else {
           
            // for(let y=0;y<this.breadcrumbs_old.length;y++){
              let str_old:string[] = this.breadcrumbs_old[i].url.split('/');
            // // if(typeof str_old[3]=='undefined'){  continue;}else{
            // if(this.breadcrumbs_old[i].label != breadcrumb.label && str[2] == str_old[2] && typeof str_old[3]!='undefined'){
            //   this.breadcrumbs_old.push(breadcrumb);
            //   
            //  break;
            // }else{ this.breadcrumbs_old.push(breadcrumb);
            //    break;}
            // 
           
            for (let z = 0; z < str.length; z++) {
              if (str[2] != str_old[2]) {
                this.breadcrumbs_old=[];
                this.breadcrumbs_old.push(breadcrumb);
                
                localStorage.setItem('breadcramb_arr',JSON.stringify(this.breadcrumbs_old));
             
                // if(!this.breadcrumbs_old[i].url.indexOf(breadcrumb.url)+1){
                //   console.log(this.breadcrumbs_old[i].url.indexOf(breadcrumb.url))

                // }
              }
            }
         
        }
      
        // break;
            // }
            // }

            // this.breadcrumbs_old.shift();
            // this.breadcrumbs_old.push(breadcrumb);
            // 
     
        }
      // }
      

    
      // if(breadcrumb.label=='Home'){
      // debugger;
      //   this.breadcrumbs_old.shift();
      //  
      //   jQuery('.breadcrumbs ul li:first-child a').css('textIndent','20px');
      //   console.log(jQuery('.breadcrumbs ul li').length);
      //  
      //   // jQuery('.breadcrumbs ul li.home a').css('display','none');
      //   //   
      // }else{
      //   console.log(this.globalLogin);
      //   debugger;
      //   jQuery('.breadcrumbs ul li:first-child a').css('textIndent','-9999px');
      //   console.log(jQuery('.breadcrumbs ul li').length)
      //  
      // }
      
    
    
      //recursive
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
  }

}
