/* eslint-disable prettier/prettier */
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class Classroom1Exercise5Route extends Route {

  @service teacher;

  beforeModel() {
    this.teacher.quizMode = this.teacher.quizSubtractOrder;
    this.teacher.questions = null;
    this.teacher.results = null;
  }
}
