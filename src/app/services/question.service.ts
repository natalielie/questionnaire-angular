import { Injectable } from '@angular/core';
import { IAnswer, IQuestion } from '../interfaces/questionnaire.interface';
import { LocalStorageService } from './localStorage.service';

/**
 * A Question Storage for processing the questions
 */
@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private localStorageService: LocalStorageService) {}

  /**
   * Create a new question
   */
  createQuestion(question: IQuestion): void {
    let allQuestions: IQuestion[] = this.localStorageService.getAllQuestions();
    if (allQuestions) {
      allQuestions.push(question);
      this.localStorageService.setItem('questions', allQuestions);
    } else {
      this.localStorageService.setItem('questions', [question]);
    }
  }

  /**
   * Answer the question
   */
  answerTheQuestion(answer: IAnswer): void {
    let allAnswers: IAnswer[] = this.localStorageService.getAnswers();

    if (allAnswers) {
      allAnswers.forEach((element) => {
        if (element.questionId === answer.questionId) {
          return;
        }
      });
      allAnswers.push(answer);
      this.localStorageService.setItem('answers', allAnswers);
    } else {
      this.localStorageService.setItem('answers', [answer]);
    }
    //this.setAnsweredQuestion(answer.questionId);
    this.updateQuestionByAnswerDate(answer.questionId, new Date());
  }

  /**
   * Delete a question
   */
  deleteQuestion(questionId: string): void {
    this.deleteFromAllQuestion(questionId);
    this.deleteFromAnswers(questionId);
  }

  deleteFromAllQuestion(questionId: string): void {
    let allQuestions = this.localStorageService.getAllQuestions();

    allQuestions.forEach((question, index) => {
      if (question.id === questionId) {
        allQuestions.splice(index, 1);
      }
    });
    this.localStorageService.setItem('questions', allQuestions);
  }

  deleteFromAnswers(questionId: string): void {
    let answers = this.localStorageService.getAnswers();

    answers.forEach((answer, index) => {
      if (answer.questionId === questionId) {
        answers.splice(index, 1);
      }
    });
    this.localStorageService.setItem('answers', answers);
  }

  /**
   * Update a question
   */
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
    this.localStorageService.setItem('questions', allQuestions);
    // putting a question into the unanswered section
    this.updateQuestionByAnswerDate(currentQuestion.id, null);
  }

  updateQuestionByAnswerDate(id: string, date: Date | null): void {
    let allQuestions: IQuestion[] = this.localStorageService.getAllQuestions();

    let currentQuestion: IQuestion;
    currentQuestion = allQuestions.find((question) => question.id === id)!;
    currentQuestion.answerDate = date;
    allQuestions = allQuestions.filter((question) => question.id !== id);

    allQuestions.push(currentQuestion);
    this.localStorageService.setItem('questions', allQuestions);
  }

  /**
   * Rollback for a question after answering
   */
  changeAnswer(question: IQuestion): void {
    let answers = this.localStorageService.getAnswers();

    const filteredAnswers = answers.filter(
      (answer) => answer.questionId !== question.id
    );

    this.updateQuestionByAnswerDate(question.id, null);

    this.localStorageService.setItem('answers', filteredAnswers);
  }
}
