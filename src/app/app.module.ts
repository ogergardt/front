import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MaterialModule} from './material/material.module';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {AlertService} from './services/alert.service';
import {JobService} from './services/job.service';
import {InputService} from './services/input.service';
import {AppRouting} from './app.routing';
import {IconComponent} from './component/buttons/icon/icon.component';
import {ContentComponent} from './content/content.component';
import {SearchPipe} from './pipes/search.pipe';
import {JwtModule, JWT_OPTIONS} from '@auth0/angular-jwt';
import {AuthService} from './services/auth.service';
import { PositionCardComponent } from './position-card/position-card.component';

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      return localStorage.getItem('token');
    },
    whitelistedDomains: ['ogergardt.me'],
    authScheme: '',
    throwNoTokenError: false,
    skipWhenExpired: false
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    IconComponent,
    ContentComponent,
    SearchPipe,
    PositionCardComponent,
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRouting,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory
      }
    }),
  ],
  providers: [
    AlertService,
    JobService,
    InputService,
    AuthService,
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
