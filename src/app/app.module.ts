import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizComponent } from './quiz-app/page/quiz/quiz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuizCrudPageComponent } from './quiz-app/page/quiz-crud-page/quiz-crud-page.component';
import { QuizFormPageComponent } from './quiz-app/page/quiz-form-page/quiz-form-page.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    QuizCrudPageComponent,
    QuizFormPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
