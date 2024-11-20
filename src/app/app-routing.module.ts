import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz-app/page/quiz/quiz.component';
import { QuizCrudPageComponent } from './quiz-app/page/quiz-crud-page/quiz-crud-page.component';
import { QuizFormPageComponent } from './quiz-app/page/quiz-form-page/quiz-form-page.component';

const routes: Routes = [
  { path: 'quiz', component: QuizComponent },
  { path: 'quiz-crud', component: QuizCrudPageComponent },
  { path: 'quiz-crud/add', component: QuizFormPageComponent },
  { path: 'quiz-crud/edit/:id', component: QuizFormPageComponent },
  { path: '', redirectTo: '/quiz-crud', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
