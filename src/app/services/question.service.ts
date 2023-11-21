import { Injectable, inject } from '@angular/core';
import { IAnswer, IQuestion } from '../interfaces/questionnaire.interface';
import { Observable } from 'rxjs';
import { LocalStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private localStorageService: LocalStorageService) {}
  createQuestion(question: IQuestion): void {
    let allQuestions: IQuestion[] = this.localStorageService.getAllQuestions();
    if (allQuestions) {
      allQuestions.push(question);
      localStorage.setItem('questions', JSON.stringify(allQuestions));
    } else {
      localStorage.setItem('questions', JSON.stringify([question]));
    }
  }

  answerTheQuestion(answer: IAnswer): void {
    let allAnswers: IAnswer[] = this.localStorageService.getAnswers();

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
    let allQuestions = this.localStorageService.getAllQuestions();
    let allAnsweredQuestions: IQuestion[] =
      this.localStorageService.getAnsweredQuestions();
    let currentQuestion: IQuestion;
    currentQuestion = allQuestions.find((question) => question.id === id)!;
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

  deleteQuestion(questionId: string): void {
    let allQuestions = this.localStorageService.getAllQuestions();
    let answeredQuestions = this.localStorageService.getAnsweredQuestions();
    let answers = this.localStorageService.getAnswers();
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
      if (answer.questionId === questionId) {
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

  updateQuestion(initQuestion: IQuestion): void {
    let allQuestions: IQuestion[] = this.localStorageService.getAllQuestions();
    let currentQuestion: IQuestion;
    currentQuestion = allQuestions.find(
      (question) => question.id === initQuestion.id
    )!;
    currentQuestion.question = initQuestion.question;
    currentQuestion.creationDate = initQuestion.creationDate;
    currentQuestion.type = initQuestion.type;
    currentQuestion.answers = initQuestion.answers;
    allQuestions = allQuestions.filter(
      (question) => question.id !== initQuestion.id
    );
    allQuestions.push(currentQuestion);
    localStorage.setItem('questions', JSON.stringify(allQuestions));
  }

  changeAnswer(question: IQuestion): void {
    let answeredQuestions = this.localStorageService.getAnsweredQuestions();
    let answers = this.localStorageService.getAnswers();
    const filteredAnsweredQuestions = answeredQuestions.filter(
      (answeredQuestion) => answeredQuestion.id !== question.id
    );
    const filteredAnswers = answers.filter(
      (answer) => answer.questionId !== question.id
    );
    localStorage.setItem(
      'answeredQuestions',
      JSON.stringify(filteredAnsweredQuestions)
    );
    localStorage.setItem('answers', JSON.stringify(filteredAnswers));
  }
}
