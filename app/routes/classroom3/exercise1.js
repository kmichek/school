/* eslint-disable prettier/prettier */
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class Classroom3Exercise1Route extends Route {

  @service teacher;

  beforeModel() {
    this.teacher.quizMode = this.teacher.divide4;
    this.teacher.questions = null;
    this.teacher.results = null;
  }
}
