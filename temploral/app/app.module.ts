import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { AdminComponent } from './modules/admin/admin.component';
import { TeacherComponent } from './modules/teacher/teacher.component';
import { StudentComponent } from './modules/student/student.component';
import { AdminDetailComponent } from './modules/admin/admin-detail/admin-detail.component';
import { SharedService } from './services/shared.service';
import { BaseComponent } from './shared/base/base.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient } from '@angular/common/http'; // Importa solo provideHttpClient
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { HeaderComponent } from './modules/header/header.component';
import { FooterComponent } from './modules/footer/footer.component';
import { NavComponent } from './modules/nav/nav.component';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginService } from './services/auth/login.service';
import { TabMenuModule } from 'primeng/tabmenu';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { StyleClassModule } from 'primeng/styleclass';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    TeacherComponent,
    StudentComponent,
    AdminDetailComponent,
    BaseComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ProgressSpinnerModule,
    TabMenuModule,
    BadgeModule,
    AvatarModule,
    AvatarGroupModule,
    MenuModule,
    PanelMenuModule,
    StyleClassModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'), // Obtener el token de localStorage
        allowedDomains: ['example.com'], // Dominios permitidos para CORS (opcional)
        disallowedRoutes: ['example.com/example-route'], // Rutas excluidas de la verificación del token (opcional)
      },
    })
  ],
  providers: [
    SharedService,
    // Aquí agregamos la configuración para fetch
    LoginService// Agrega aquí tus servicios si es necesario
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
