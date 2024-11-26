import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private baseQuestionsUrl = '/assets/';
  private allQuestions: Question[] = [];
  private selectedQuestions: Question[] = [];
  private selectedFiles: string[] = [];

  constructor(private http: HttpClient) { }

  // Load questions from JSON and cache them in the 'questions' array
  loadAllQuestions(): Observable<void | never[]> {
    const files = ['laufzeitumgebungenJS.json', 'npm.json', 'nodeJs.json'];
    const obsevables = files.map(file => this.loadQuestionsFromFile(file));

    return forkJoin(obsevables).pipe(
      map(results => {
        this.allQuestions = results.flat()
      }),
      catchError(error => {
        console.log('Error loading all questions:', error);
        return of([]);
      })
    )
  }

  loadSelectedQuestions(): Observable<Question[]> {
    this.selectedQuestions = [];
    const obsevables = this.selectedFiles.map(file =>
      this.loadQuestionsFromFile(file)
    );

    return forkJoin(obsevables).pipe(
      map(results => {
        this.selectedQuestions = results.flat();
        return this.selectedQuestions;
      }),
      catchError(error => {
        console.error('Error loading selected questions:', error);
        return of([]);
      })
    )
  }

  setSelectedFiles(files: string[]) {
    this.selectedFiles = files;
  }

  getAllQuestions(): Observable<Question[]> {
    return of(this.allQuestions);
  }

  getSelectedQuestions(): Observable<Question[]> {
    return of(this.selectedQuestions);
  }

  getQuestion(id: number): Observable<Question | undefined> {
    return of(this.allQuestions[id]);
  }

  saveQuestionsToLocalStorage(): void {
    localStorage.setItem('questions', JSON.stringify(this.allQuestions));
  }

  addQuestion(question: Question): void {
    this.allQuestions.push(question);
    this.saveQuestionsToLocalStorage();
  }

  updateQuestion(id: number, updatedQuestion: Question): void {
    this.allQuestions[id] = updatedQuestion;
    this.saveQuestionsToLocalStorage();
  }

  deleteQuestion(id: number): void {
    this.allQuestions.splice(id, 1);
    this.saveQuestionsToLocalStorage();
  }

  private loadQuestionsFromFile(fileName: string): Observable<Question[]> {
    const fileUrl = `${this.baseQuestionsUrl}${fileName}`
    return this.http.get<Question[]>(fileUrl).pipe(
      catchError(err => {
        console.log(`Error loading questions from ${fileUrl}:`, err);
        return of([]);
      })
    )
  }
}