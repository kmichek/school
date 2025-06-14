import Component from '@glimmer/component';
import { htmlSafe } from '@ember/string';

export default class ResultLine extends Component {
  question;
  answer;
  status;
  result;
  lentilClass;

  constructor() {
    super(...arguments);
    this.question = this.args.question;
    this.answer = this.args.answer;
    this.status = this.args.status;
    this.result = '<span>';
    this.result += this.question;
    this.result += ' ';
    if (this.status === 'OK') {
      this.lentilClass = 'brusselLentil';
      this.result += ' = ';
    } else {
      this.lentilClass = 'redLentil';
      this.result += ' &ne; ';
    }
    this.result += this.answer;
    this.result += '</span>';
    this.result = htmlSafe(this.result);
  }
}
