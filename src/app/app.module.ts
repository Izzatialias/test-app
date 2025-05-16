import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { BeginnerComponent } from './beginner/beginner.component';
import { RouterModule } from '@angular/router';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CreateProfileComponent,
    ChatbotComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,

    FormsModule,

    BeginnerComponent,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
  exports: [ChatbotComponent],
})
export class AppModule {}
