import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrl: './admin-detail.component.css'
})
export class AdminDetailComponent implements OnInit{
  items: MenuItem[] = [
    {label: 'Home', icon: 'pi pi-fw pi-home'},
    {label: 'About', icon: 'pi pi-fw pi-info'}
    // Agrega más elementos MenuItem si es necesario
  ];
  loading: Boolean = false;
  userLoginOn:boolean=false;

  constructor (){}

  ngOnInit(): void {
    this.loading = false;
  }
}
