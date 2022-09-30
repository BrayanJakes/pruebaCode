import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: any = {};
  lists: any[] = [];
  loading = false;
  isCollapsed = true;
  ViewData: any = {};
  

  constructor(public auth: AuthService,
              private sharedService: SharedService) { }

  ngOnInit(): void {
    this.dataUser()
    this.getListado()
  }

  dataUser(){
    this.auth.user$.subscribe({
      next: (resp: any) => {
        console.log(resp)
        this.user = resp;
      }
    })
  }

  getListado(){
    this.loading = true;
    this.sharedService.getLists().subscribe({
      next: (resp: any) => {
        
        this.lists = resp.data;
        this.lists = this.lists.filter(x => x.active);
        this.lists.forEach( x => {
          if(x.grades < 3.0){
            x.bgColor = 'red'
          }
          if(x.grades > 3.0 && x.grades < 4.0){
            x.bgColor = 'yellow'
          }
          if(x.grades >= 4.0){
            x.bgColor = 'green'
          }
        })
        this.loading = false;
      }
    })
  }

  viewdataList(list: any){
    this.ViewData = list;
  }

  salir(){
    this.auth.logout();
  }
}
