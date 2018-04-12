/**
 * Created by Алиска on 19.05.2017.
 */
import { Router} from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
    import {HeaderComponent} from './header/header.component'

@Injectable()
export class GlobalLogin {
    
    name:string;
    role:string;
    login:boolean;
    serverTime:boolean;
    public eventEmitter$: EventEmitter<any>;
    constructor(public router: Router){

        this.role=localStorage.getItem("role");
        this.name=localStorage.getItem("name");
        this.serverTime= JSON.parse(localStorage.getItem("serverTime"));
     

    }
    
    show_elements(name,role,login,current_url){
      
        this.name=name;
        this.role=role;
        this.login=login;
        this.serverTime=true;
    
     
        localStorage.setItem('serverTime',JSON.stringify(this.serverTime));
  
        if(current_url!=null){
       
            this.router.navigate([current_url]);
          
        }else{
         
            this.router.navigate(['/home']);
      
        }
       
    
        // this.hidden=false;
     
        // this.headerComponent.name=this.name;
        // this.headerComponent.role=this.role;
        // this.headerComponent.login=this.login;
    }
}