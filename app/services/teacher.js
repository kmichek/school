/* eslint-disable prettier/prettier */
import Service from '@ember/service';
import { inject as service } from '@ember/service';
import Evented from '@ember/object/evented'; // trigger events
import { tracked } from '@glimmer/tracking';
import { storageFor } from 'ember-local-storage';
//import { t } from 'ember-intl';

export default class TeacherService extends Service.extend(Evented) {

  @storageFor('stats') stats;

  @service intl;

  @tracked quizMode;

  quizPlusMinus2 = 'Q_PLUS_MINUS_2';
  quizPlusMinus3 = 'Q_PLUS_MINUS_3';
  quizGreaterLess = 'Q_GREATER_LESS';
  quizSign2 = 'Q_SIGN2';
  quizSubtractOrder = 'Q_SUBTRACT_ORDER';
  multiplication1 = 'Q_MULTIPLICATION_1';
  multiply2 = 'Q_MULTIPLY_2';
  multiply3 = 'Q_MULTIPLY_3';
  multiply4 = 'Q_MULTIPLY_4';
  divide2 = 'Q_DIVIDE_2';
  divide3 = 'Q_DIVIDE_3';
  divide4 = 'Q_DIVIDE_4';
  multiply5 = 'Q_MULTIPLY_5';
  divide5 = 'Q_DIVIDE_5';
  multiply6 = 'Q_MULTIPLY_6';
  divide6 = 'Q_DIVIDE_6';
  multiply7 = 'Q_MULTIPLY_7';

  @tracked questions;
  @tracked question;
  @tracked answer = '';
  @tracked completed;
  @tracked results;
  @tracked result;

  startTime;
  range1;

  addResult(result){
    this.results.unshift(result);
    this.trigger('__results', this.results);
  }

  finito() {
    if (this.results){
      if (this.results.every(this.finitoEveryOK)) {
        this.result = this.intl.t('classrooms.resultOK');

      } else {
        this.result = this.intl.t('classrooms.resultNOK');
      }

      if (this.startTime){
        this.finitoStats();
      }
    }
  }

  // eslint-disable-next-line no-unused-vars
  finitoEveryOK(value, index, array) {
    return value.status === 'OK';
  }

  finitoStats(){
    const statsLine = {
      timeFrom: this.startTime,
      timeTo: (new Date()).getTime(),
      quiz: this.quizMode,
      range1: this.range1,
      counter: this.results.filter(v => v.status === 'OK').length,
      errors: this.results.filter(v => v.status !== 'OK').length
    }

    this.stats.addObject(statsLine);

    this.startTime = null;
  }

  start(range1){
    this.questions = [];
    this.results = [];
    this.result = null;
    this.startTime = new Date().getTime();
    this.range1 = range1;
  }

}
