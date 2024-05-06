import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit {
  loading:Boolean=false;
  userLoginOn:boolean=false;

  constructor(){}

  ngOnInit(): void {
    this.loading = false;
  
}
}