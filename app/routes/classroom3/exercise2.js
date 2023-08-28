/* eslint-disable prettier/prettier */
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class Classroom3Exercise2Route extends Route {

  @service teacher;

  beforeModel() {
    this.teacher.quizMode = this.teacher.multiply5;
    this.teacher.questions = null;
    this.teacher.results = null;
  }
}
