import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private questionsUrl = '/assets/laufzeitumgebungenJS.json';
  private questions: Question[] = []; 

  constructor(private http: HttpClient) {
    this.loadQuestions(); 
  }

  // Load questions from JSON and cache them in the 'questions' array
  private loadQuestions(): void {
    this.http.get<Question[]>(this.questionsUrl).subscribe(
      data => this.questions = data,
      error => console.error('Error loading questions:', error)
    );
  }

  getQuestions(): Observable<Question[]> {
    if (this.questions.length > 0) {

      return of(this.questions);
    } else {
  
      return this.http.get<Question[]>(this.questionsUrl).pipe(
        tap(data => this.questions = data), 
        catchError(error => {
          console.error('Error fetching questions:', error);
          return of([]);
        })
      );
    }
  }

  getQuestion(id: number): Observable<Question | undefined> {
    return of(this.questions[id]);
  }

  saveQuestionsToLocalStorage(): void {
    localStorage.setItem('questions', JSON.stringify(this.questions));
  }

  addQuestion(question: Question): void {
    this.questions.push(question);
    this.saveQuestionsToLocalStorage();
  }

  updateQuestion(id: number, updatedQuestion: Question): void {
    this.questions[id] = updatedQuestion;
    this.saveQuestionsToLocalStorage();
  }

  deleteQuestion(id: number): void {
    this.questions.splice(id, 1);
    this.saveQuestionsToLocalStorage();
  }
}