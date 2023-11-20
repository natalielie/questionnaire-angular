import { Injectable } from '@angular/core';
import { IAnswer, IQuestion } from '../interfaces/survey.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  createQuestion(question: IQuestion): void {
    let allQuestions: IQuestion[] = JSON.parse(
      localStorage.getItem('questions')!
    );
    if (allQuestions) {
      allQuestions.push(question);
      localStorage.setItem('questions', JSON.stringify(allQuestions));
    } else {
      localStorage.setItem('questions', JSON.stringify([question]));
    }
  }

  answerTheQuestion(answer: IAnswer): void {
    let allAnswers: IAnswer[] = JSON.parse(localStorage.getItem('answers')!);

    if (allAnswers) {
      allAnswers.forEach((element) => {
        if (element.questionId === answer.questionId) {
          return;
        }
      });
      allAnswers.push(answer);
      localStorage.setItem('answers', JSON.stringify(allAnswers));
    } else {
      localStorage.setItem('answers', JSON.stringify([answer]));
    }
    this.setAnsweredQuestion(answer.questionId);
  }

  setAnsweredQuestion(id: string): void {
    let allQuestions = this.getAllQuestions();
    let allAnsweredQuestions: IQuestion[] = this.getAnsweredQuestions();
    let currentQuestion: IQuestion;
    currentQuestion = allQuestions.filter((question) => question.id === id)[0];
    if (allAnsweredQuestions) {
      allAnsweredQuestions.push(currentQuestion);
      localStorage.setItem(
        'answeredQuestions',
        JSON.stringify(allAnsweredQuestions)
      );
    } else {
      localStorage.setItem('answeredQuestions', JSON.stringify([id]));
    }
  }

  getAllQuestions(): IQuestion[] {
    return JSON.parse(localStorage.getItem('questions')!);
  }

  getAnsweredQuestions(): IQuestion[] {
    return JSON.parse(localStorage.getItem('answeredQuestions')!);
  }
  getAnswers(): IQuestion[] {
    return JSON.parse(localStorage.getItem('answers')!);
  }

  deleteQuestion(questionId: string): void {
    let allQuestions = this.getAllQuestions();
    let answeredQuestions = this.getAnsweredQuestions();
    let answers = this.getAnswers();
    allQuestions.forEach((question, index) => {
      if (question.id === questionId) {
        allQuestions.splice(index, 1);
      }
    });
    answeredQuestions.forEach((question, index) => {
      if (question.id === questionId) {
        answeredQuestions.splice(index, 1);
      }
    });
    answers.forEach((answer, index) => {
      if (answer.id === questionId) {
        answers.splice(index, 1);
      }
    });

    localStorage.setItem('questions', JSON.stringify(allQuestions));
    localStorage.setItem(
      'answeredQuestions',
      JSON.stringify(answeredQuestions)
    );
    localStorage.setItem('answers', JSON.stringify(answers));
  }
}
