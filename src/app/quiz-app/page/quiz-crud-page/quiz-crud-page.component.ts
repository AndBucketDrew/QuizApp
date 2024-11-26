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
  availableFiles = ['laufzeitumgebungenJS.json', 'npm.json', 'nodeJs.json']
  selectedFiles: string[] = [];

  constructor(
    private quizService: QuizService,
  ) { }

  ngOnInit(): void {
    this.quizService.loadAllQuestions();
    this.quizService.getAllQuestions().subscribe(allQuestions => {
      this.questions = allQuestions;
    });
  }

  onFileSelection(file: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if(isChecked) {
      this.selectedFiles.push(file);
    } else {
      this.selectedFiles = this.selectedFiles.filter(f => f !== file);
    }
    this.quizService.setSelectedFiles(this.selectedFiles);
  }

  deleteQuestion(id: number) {
    this.quizService.deleteQuestion(id);
  }
}
