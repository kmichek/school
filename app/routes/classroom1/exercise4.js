/* eslint-disable prettier/prettier */
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class Classroom1Exercise4Route extends Route {

  @service teacher;

  beforeModel() {
    this.teacher.quizMode = this.teacher.quizSign2;
    this.teacher.questions = null;
    this.teacher.results = null;
  }
}
