import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Question } from '../../models/question.model';


@Component({
  selector: 'app-quiz-crud-page',
  templateUrl: './quiz-crud-page.component.html',
  styleUrls: ['./quiz-crud-page.component.scss']
})
export class QuizCrudPageComponent implements OnInit {
  questions: Question[] = [];
  availableFiles = ['laufzeitumgebungenJS.json', 'npm.json', 'nodeJs.json', 'zugriffDateisystem.json', 'http-Module.json']
  selectedFiles: string[] = [];
  selectAll: boolean = false

  constructor(
    private quizService: QuizService,
  ) { }

  ngOnInit(): void {
    this.quizService.loadAllQuestions().subscribe({
      next: () => {
        this.quizService.getAllQuestions().subscribe(allQuestions => {
          this.questions = allQuestions;
        })
      },
      error: err => console.log('Error loading questions', err)
    });
  }

  onFileSelection(file: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedFiles.push(file);
    } else {
      this.selectedFiles = this.selectedFiles.filter(f => f !== file);
    }
    this.quizService.setSelectedFiles(this.selectedFiles);
  }

  selectAllCategories() {
    if (this.selectAll) {
      this.selectedFiles = [];
    } else {
      this.selectedFiles = [...this.availableFiles];
    }

    this.selectAll = !this.selectAll;
    this.quizService.setSelectedFiles(this.selectedFiles);
  }

  selectRandomCategories() {
    const randomNumber = Math.floor(Math.random() * this.availableFiles.length + 1);
    const shuffle = [...this.availableFiles].sort(() => Math.random() - 0.5);
    this.selectedFiles = shuffle.slice(0, randomNumber);
    this.quizService.setSelectedFiles(this.selectedFiles);

  }

  deleteQuestion(id: number) {
    this.quizService.deleteQuestion(id);
  }

}
