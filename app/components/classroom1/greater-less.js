/* eslint-disable prettier/prettier */
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/string';
//import { jsPDF } from "jspdf";

export default class PlusMinus extends Component {

  @service teacher;

  constructor() {
    super(...arguments);
    let self = this;
    if (!this.teacher.has('__greaterLess')) {
      this.teacher.on('__greaterLess', function (range1, range2, count) {
        self.start(range1, range2, count);
      });
    }
    this.teacher.question = null;
  }

  @action calc(key) {
    let isCorrect = false;
    if (key == this.teacher.question.questionAnswer) {
      let result = {
        question: this.teacher.question.questionPre2,
        answer: key,
        status: 'OK',
      };
      this.teacher.completed =
      this.teacher.question.random1 +' ' +key +' ' +this.teacher.question.random2;
      this.teacher.addResult(result);
      isCorrect = true;
      this.teacher.question = null;
    } else {
      let result = {
        question: this.teacher.question.questionPre2,
        answer: key,
        status: ':-(',
      };
      this.teacher.completed = ':-(';
      this.teacher.addResult(result);
    }
    this.teacher.answer = '';

    setTimeout(() => {
      this.teacher.completed = null;
      if (isCorrect) {
        if (this.teacher.questions.length > 0) {
          this.teacher.questions.shift();
          this.teacher.question = this.teacher.questions[0];
        }
      }
      this.finito();

    }, 2000);
  }

  finito() {
    if (this.teacher.questions.length == 0) {
      document.getElementById('dvFireworks').style.display = 'block';
      document.getElementById('dvPicture').style.display = 'none';

      this.teacher.finito();
    }
  }

  @action start(range1, range2, count) {
    if (range1 && range2 && count) {
      this.teacher.start(range1);
      let high1 = range1.substring(range1.indexOf(' - ') + 3, range1.length);
      let high2 = range2.substring(range2.indexOf(' - ') + 3, range2.length);
      let counter = count * 1;
      while (counter > 0) {
        let random1 = Math.floor(Math.random() * high1);
        let random2 = Math.floor(Math.random() * high2);
        if (!(random1 == 0 && random2 == 0)) {
          let questionPre1 = htmlSafe(
            '&emsp;&emsp;<span style="white-space: nowrap;">' +
              random1 +
              '&emsp;&emsp;<span style="color:lightgrey;">?</span>&emsp;&emsp;' +
              random2 +
              '</span>'
          );
          let questionPre2 = random1 + ' ? ' + random2;
          let questionAnswer =
            random1 > random2
              ? '>'
              : random1 < random2
              ? '<'
              : random1 == random2
              ? '='
              : '?';
          let question = {
            questionPre1: questionPre1,
            questionPre2: questionPre2,
            questionAnswer: questionAnswer,
            random1: random1,
            random2: random2,
          };
          this.teacher.questions.push(question);
          counter--;
        }
      }
      console.log('questions', this.teacher.questions);
      this.teacher.question = this.teacher.questions[0];
      console.log('question', this.teacher.question);
      this.teacher.trigger('__results', []);
      this.teacher.answer = '';
    } else {
      this.notify.warning('Zvolit zadání, prosím');
    }
    document.getElementById('dvFireworks').style.display = 'none';
    document.getElementById('dvPicture').style.display = 'block';
  }
}
