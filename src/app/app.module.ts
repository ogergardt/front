import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MaterialModule} from './material/material.module';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {AuthService} from './services/auth.service';
import {AlertService} from './services/alert.service';
import {JobService} from './services/job.service';
import {AppRouting} from './app.routing';
import {IconComponent} from './component/buttons/icon/icon.component';
import {ContentComponent} from './content/content.component';
import {AutofocusDirective} from './shared/autofocus.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    IconComponent,
    ContentComponent,
    AutofocusDirective,
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRouting,
  ],
  providers: [
    AuthService,
    AlertService,
    JobService,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
