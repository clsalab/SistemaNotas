import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { AdminComponent } from './modules/admin/admin.component';
import { StudentComponent } from './modules/student/student.component';
import { AdminDetailComponent } from './modules/admin/admin-detail/admin-detail.component';
import { TeacherComponent } from './modules/teacher/teacher.component';
import { SidenavComponent } from './modules/sidenav/sidenav.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'student', component: StudentComponent},
  { path: 'teacher', component: TeacherComponent},
  { path: 'sede', component: AdminDetailComponent},
  { path: 'menu', component: SidenavComponent},

  {path: '**',redirectTo:'/login', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
