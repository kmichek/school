/* eslint-disable prettier/prettier */
import Service from '@ember/service';
import { inject as service } from '@ember/service';
import Evented from '@ember/object/evented'; // trigger events
import { tracked } from '@glimmer/tracking';
import { t } from 'ember-intl';

export default class TeacherService extends Service.extend(Evented) {

  @service intl;
  //
  @tracked quizMode;
  //
  @tracked quizMode;
  quizPlusMinus2 = 'Q_PLUS_MINUS_2';
  quizPlusMinus3 = 'Q_PLUS_MINUS_3';
  quizGreaterLess = 'Q_GREATER_LESS';
  quizSign2 = 'Q_SIGN2';
  //
  @tracked questions;
  @tracked question;
  @tracked answer = '';
  @tracked completed;
  @tracked results;
  @tracked result;

  finito() {
    if (this.results){
      if (this.results.every(this.everyOK)) {
        this.result = this.intl.t('classrooms.resultOK');

      } else {
        this.result = this.intl.t('classrooms.resultNOK');
      }
    }
  }

  everyOK(value, index, array) {
    return value.status === 'OK';
  }
}
