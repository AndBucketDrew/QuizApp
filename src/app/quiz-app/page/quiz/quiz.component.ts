import { Component, OnInit } from '@angular/core';
import { Question } from '../../models/question.model';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit {
  questions: Question[] = [];
  currentQuestionIndex = 0;
  score = 0;
  showCorrectAnswer: boolean = false;
  selectedAnswer: Set<string> = new Set<string>();
  isSubmited: boolean = false;

    constructor(
  private quizService: QuizService,
  ) { }

ngOnInit() {
  this.quizService.loadSelectedQuestions().subscribe(selectedQuestions => {
    this.questions = selectedQuestions;
    this.shuffle();
  })
}

shuffle() {
  this.questions = this.questions.sort(() => Math.random() - 0.5);
}

submit() {
  const currentQuestion = this.questions[this.currentQuestionIndex];
  const isCorrect = currentQuestion.options.every(
    (option) => option.isCorrect === this.selectedAnswer.has(option.text)
  );
  this.isSubmited = true;
  this.showCorrectAnswer = true;
  this.selectedAnswer.clear();
}

nextQuestion() {
  this.currentQuestionIndex++;
  this.isSubmited = false;
  this.showCorrectAnswer = false;
}

previusQuestion() {
  this.currentQuestionIndex--;
}

// onOptionCheck(event: Event) {
//   const checkbox = event.target as HTMLInputElement;
//   const value = checkbox.value;

//   if (checkbox.checked) {
//     this.userAnswer.push(value);
//   } else {
//     this.userAnswer = this.userAnswer.filter(answer => answer !== value);
//   }
// }

toggleOption(option: string, event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.checked) {
    this.selectedAnswer.add(option);
  } else {
    this.selectedAnswer.delete(option);
  }
}

getCorrectAnswers() {
  const currentQuestion = this.questions[this.currentQuestionIndex]
  return currentQuestion?.options.filter(option => option.isCorrect).map(option => option.text) || [];
}

isQuizFinished() {
  return this.currentQuestionIndex >= this.questions.length;
}
}
