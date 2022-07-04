import Service from '@ember/service';
import Evented from '@ember/object/evented'; // trigger events
import { tracked } from '@glimmer/tracking';

export default class TeacherService extends Service.extend(Evented) {
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
}
