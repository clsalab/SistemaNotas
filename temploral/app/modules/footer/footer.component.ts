import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{
  loading:Boolean = false;
  userLoginOn:boolean=false;

  constructor () {}

  ngOnInit(): void {
    this.loading = false;
  }

}
