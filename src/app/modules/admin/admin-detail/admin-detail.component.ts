import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrl: './admin-detail.component.css'
})
export class AdminDetailComponent implements OnInit{
  
  loading: Boolean = false;
  userLoginOn:boolean=false;

  constructor (){}

  ngOnInit(): void {
    this.loading = false;
  }
}