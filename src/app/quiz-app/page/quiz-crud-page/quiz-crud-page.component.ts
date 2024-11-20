import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-quiz-crud-page',
  templateUrl: './quiz-crud-page.component.html',
  styleUrls: ['./quiz-crud-page.component.scss']
})
export class QuizCrudPageComponent implements OnInit {
  questions: Question[] = [];

  constructor(
    private quizService: QuizService,
  ) { }

  ngOnInit(): void {
    this.quizService.getQuestions().subscribe(
      (data) => {
        this.questions = data;
      },
      (error) => {
        console.error("Error loading questions:", error);
      }
    );
  }

  deleteQuestion(id: number) {
    this.quizService.deleteQuestion(id);
  }
}
