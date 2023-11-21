import { Injectable } from '@angular/core';
import { IAnswer, IQuestion } from '../interfaces/questionnaire.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  setAnsweredQuestion(id: string): void {
    let allQuestions = this.getAllQuestions();
    let allAnsweredQuestions: IQuestion[] = this.getAnsweredQuestions();
    let currentQuestion: IQuestion;
    currentQuestion = allQuestions.filter((question) => question.id === id)[0];
    console.log(currentQuestion);
    if (allAnsweredQuestions) {
      allAnsweredQuestions.push(currentQuestion);
      localStorage.setItem(
        'answeredQuestions',
        JSON.stringify(allAnsweredQuestions)
      );
    } else {
      localStorage.setItem(
        'answeredQuestions',
        JSON.stringify([currentQuestion])
      );
    }
  }

  updateQuestion(questionId: string): void {}

  getAllQuestions(): IQuestion[] {
    return JSON.parse(localStorage.getItem('questions')!);
  }

  getAnsweredQuestions(): IQuestion[] {
    return JSON.parse(localStorage.getItem('answeredQuestions')!);
  }
  getAnswers(): IAnswer[] {
    return JSON.parse(localStorage.getItem('answers')!);
  }
}
