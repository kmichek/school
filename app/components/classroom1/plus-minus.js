/* eslint-disable prettier/prettier */
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
//import { jsPDF } from "jspdf";

export default class PlusMinus extends Component {

  @service teacher;

  constructor() {
    super(...arguments);
    let self = this;
    if (!this.teacher.has('__plusMinus')) {
      this.teacher.on('__plusMinus', function (maxResult, range1, range2, count) {
        self.start(maxResult, range1, range2, count);
      });
    }
    this.teacher.question = null;
  }

  answerAllowedFor(solution) {
    if (solution == 0 || solution > 0) {
      return this.teacher.answer === null || this.teacher.answer === '' || (this.teacher.answer.toString().length < solution.toString().length);

    } else {
      return false;
    }
  }

  answerReady(solution) {
    return this.teacher.answer.toString().length === solution.toString().length;
  }

  @action calc(key) {
    let solution = this.evaluate2(this.teacher.question);

    if (this.teacher.quizMode == this.teacher.quizPlusMinus2) {
      solution = this.evaluate2(this.teacher.question);
    } else {
      solution = this.evaluate3(this.teacher.question);
    }

    if (this.answerAllowedFor(solution)) {
      this.teacher.answer = this.teacher.answer + '' + key;
      if (this.answerReady(solution)) {
        let isCorrect = false;
        if (solution == this.teacher.answer) {
          let result = { question: this.teacher.question, answer: this.teacher.answer, status: 'OK' };
          this.teacher.completed = this.teacher.question + ' = ' + this.teacher.answer;
          this.teacher.addResult(result);
          isCorrect = true;

        } else {
          let result = { question: this.teacher.question, answer: this.teacher.answer, status: ':-(' }
          this.completed = ':-(';
          this.teacher.addResult(result);
        }

        setTimeout(() => {
          this.teacher.completed = null;
          this.teacher.answer = '';
          if (isCorrect) {
            if (this.teacher.questions.length > 0) {
              this.teacher.questions.shift();
              this.teacher.question = this.teacher.questions[0];
            }
          }
          this.finish();

        }, 2000);
      }
    }
  }

  evaluate2(question) {
    if (question) {
      let token = question.split(' ');
      if (token[1] === '+') {
        return (token[0] * 1) + (token[2] * 1);

      } else if (token[1] === '-') {
        return (token[0] * 1) - (token[2] * 1);
      }
    }
  }

  evaluate3(question, maxResult) {
    if (question) {
      let expect;
      let token = question.split(' ');

      if (token[1] === '+') {
        expect = (token[0] * 1) + (token[2] * 1);
        if (expect > maxResult) {
          return -1;
        }
      } else if (token[1] === '-') {
        expect = (token[0] * 1) - (token[2] * 1);
      }
      if (token[3] === '+') {
        expect = expect + (token[4] * 1);

      } else if (token[3] === '-') {
        expect = expect - (token[4] * 1);
      }
      return expect;
    }
  }

  finish() {
    if (this.teacher.questions.length == 0) {
      document.getElementById('dvFireworks').style.display = 'block';
      document.getElementById('dvPanda').style.display = 'none';

      this.teacher.finito();
    }
  }

  @action start(maxResult, range1, range2, count) {
    this.teacher.start(range1);
    if (range1 && range2 && count) {
      if (this.teacher.quizMode == this.teacher.quizPlusMinus2) {
        this.start2(maxResult, range1, range2, count);

      } else {
        this.start3(maxResult, range1, range2, count);
      }
    } else {
      this.notify.warning('Zvolit zadání, prosím');
    }
    document.getElementById('dvFireworks').style.display = 'none';
    document.getElementById('dvPanda').style.display = 'block';
  }

  @action start2(maxResult, range1, range2, count) {
    let high1 = range1.substring(range1.indexOf(' - ') + 3, range1.length);
    let high2 = range2.substring(range2.indexOf(' - ') + 3, range2.length);
    let counter = count * 1;
    let maxZeros = Math.ceil(counter / 10);
    let notOverMaxZeros = true;
    let trueFalses = [true, false];
    while (counter > 0) {
      let random1 = Math.floor(Math.random() * high1);
      let random2 = Math.floor(Math.random() * high2);
      if (!(random1 == 0 && random2 == 0)) {
        if (random1 == 0 || random2 == 0) {
          maxZeros--;
          if (maxZeros < 0) {
            notOverMaxZeros = false;
          } else {
            notOverMaxZeros = true;
          }
        } else {
          notOverMaxZeros = true;
        }
        let trueFalseIdx = Math.round(Math.random());
        let booley = trueFalses[trueFalseIdx];
        let question = random1 + (booley ? ' + ' : ' - ') + random2;
        let result = this.evaluate2(question);
        if (result > -1 && !this.teacher.questions.includes(question) && notOverMaxZeros && result <= maxResult) {
          if (high1 == 100) {
            if (random1 >= 50) { // otherwise skip
              this.teacher.questions.push(question);
              counter--;
            }
          } else {
            this.teacher.questions.push(question);
            counter--;
          }
        }
      }
    }
    console.log('questions', this.teacher.questions);
    this.teacher.question = this.teacher.questions[0];
    this.teacher.trigger('__results', []);
    this.teacher.answer = '';
  }

  @action start3(maxResult, range1, range2, count) {
    let high1 = range1.substring(range1.indexOf(' - ') + 3, range1.length);
    let high2 = range2.substring(range2.indexOf(' - ') + 3, range2.length);
    let counter = count * 1;
    let maxZeros = Math.ceil(counter / 10);
    let notOverMaxZeros = true;
    let trueFalses = [true, false];
    let attempts = 0;
    while (counter > 0) {
      let random1 = Math.floor(Math.random() * high1);
      let random2 = Math.floor(Math.random() * high2);
      let random3 = Math.floor(Math.random() * high1);
      if (!((random1 === 0 && random2 === 0) || (random1 === 0 && random3 === 0) || (random2 === 0 && random3 === 0))) {
        if (random1 === 0 || random2 === 0 || random3 === 0) {
          maxZeros--;
          if (maxZeros < 0) {
            notOverMaxZeros = false;
          } else {
            notOverMaxZeros = true;
          }
        } else {
          notOverMaxZeros = true;
        }
        let trueFalseIdx2 = Math.round(Math.random());
        let booley2 = trueFalses[trueFalseIdx2];
        let question = random1 + ' + ' + random2 + (booley2 ? ' + ' : ' - ') + random3;
        let result = this.evaluate3(question, maxResult);
        attempts++;
        if (result > -1 && !this.teacher.questions.includes(question) && notOverMaxZeros && result <= maxResult) {
          if (high1 === 100) {
            if (random1 >= 50 || attempts > 100) {
              this.teacher.questions.push(question);
              counter--;
            }
          } else {
            this.teacher.questions.push(question);
            counter--;
          }
        }
      }
    }
    console.log('questions', this.teacher.questions);
    this.teacher.question = this.teacher.questions[0];
    this.teacher.trigger('__results', []);
    this.teacher.answer = '';
  }

  @action x() {
    this.teacher.x();
  }
}
