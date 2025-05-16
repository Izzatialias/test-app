import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { BeginnerComponent } from './beginner/beginner.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent, CreateProfileComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HomeComponent,
    BeginnerComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
