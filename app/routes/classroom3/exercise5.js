/* eslint-disable prettier/prettier */
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class Classroom3Exercise4Route extends Route {

  @service teacher;

  beforeModel() {
    this.teacher.quizMode = this.teacher.divide6;
    this.teacher.questions = null;
    this.teacher.results = null;
  }
}
