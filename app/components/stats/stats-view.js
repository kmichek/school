/* eslint-disable prettier/prettier */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { storageFor } from 'ember-local-storage';
import moment from 'moment';

export default class PlusMinus extends Component {

  @storageFor('stats') stats;
  @service teacher;
  @service intl;

  @tracked statLines = [];

  constructor() {
    super(...arguments);

    this.stats.forEach(statsLine => {
      let aQuiz = '';
      switch (statsLine.quiz) {
        case this.teacher.quizPlusMinus2: {
          aQuiz = this.intl.t('classrooms.exercise1'); break;
        }
        case this.teacher.quizPlusMinus3: {
          aQuiz = this.intl.t('classrooms.exercise2'); break;
        }
        case this.teacher.quizGreaterLess: {
          aQuiz = this.intl.t('classrooms.exercise3'); break;
        }
        case this.teacher.quizSign2: {
          aQuiz = this.intl.t('classrooms.exercise4'); break;
        }
        case this.teacher.quizSubtractOrder: {
          aQuiz = this.intl.t('classrooms.exercise5'); break;
        }
        case this.teacher.multiplication1: {
          aQuiz = this.intl.t('classrooms.exercise101'); break;
        }
        case this.teacher.multiply2: {
          aQuiz = this.intl.t('classrooms.exercise102'); break;
        }
        case this.teacher.multiply3: {
          aQuiz = this.intl.t('classrooms.exercise103'); break;
        }
        case this.teacher.multiply4: {
          aQuiz = this.intl.t('classrooms.exercise106'); break;
        }
        case this.teacher.divide2: {
          aQuiz = this.intl.t('classrooms.exercise104'); break;
        }
        case this.teacher.divide3: {
          aQuiz = this.intl.t('classrooms.exercise105'); break;
        }
        case this.teacher.divide4: {
          aQuiz = this.intl.t('classrooms.exercise301'); break;
        }
        case this.teacher.multiply5: {
          aQuiz = this.intl.t('classrooms.exercise302'); break;
        }
        case this.teacher.divide5: {
          aQuiz = this.intl.t('classrooms.exercise303'); break;
        }
        case this.teacher.multiply6: {
          aQuiz = this.intl.t('classrooms.exercise304'); break;
        }
        case this.teacher.divide6: {
          aQuiz = this.intl.t('classrooms.exercise305'); break;
        }
      }

      const line = {
        timeFrom: moment(new Date(statsLine.timeFrom)).format('DD.MM.YYYY hh:mm'),
        timeTo: moment(new Date(statsLine.timeTo)).format('DD.MM.YYYY hh:mm'),
        range1: statsLine.range1,
        counter: statsLine.counter,
        quiz: aQuiz,
        errors: statsLine.errors,
      }
      this.statLines.unshift(line);
    })

    console.log('this.statLines: ', this.statLines);
  }
}
