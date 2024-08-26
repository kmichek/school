/* eslint-disable prettier/prettier */
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class Classroom3Exercise6Route extends Route {

  @service teacher;

  beforeModel() {
    this.teacher.quizMode = this.teacher.multiply7;
    this.teacher.questions = null;
    this.teacher.results = null;
  }
}