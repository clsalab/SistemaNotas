import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent implements OnInit{
  loading:Boolean = false;
  userLoginOn:boolean=false;
  
  constructor () {}


  ngOnInit(): void {
    this.loading = false;
  }

}
