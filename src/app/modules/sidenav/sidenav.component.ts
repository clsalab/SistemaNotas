import { Component } from '@angular/core';
import { NavData } from '../../interfaces/nav-data';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  collapsed=false;
  navData=NavData;
  loading:Boolean=false;
  userLoginOn:boolean=false;
}
