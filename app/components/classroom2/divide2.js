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

    if (!this.teacher.has('__divide2')) {
      this.teacher.on('__divide2', function (maxResult, range1, range2, count) {
        self.start(maxResult, range1, range2, count);
      });
    }
    this.teacher.question = null;
  }

  answerAllowedFor(solution) {
    if (solution == 0 || solution > 0) {
      return this.teacher.answer == null || this.teacher.answer == '' || (this.teacher.answer.toString().length < solution.toString().length);

    } else {
      return false;
    }
  }

  answerReady(solution) {
    return this.teacher.answer.toString().length == solution.toString().length;
  }

  @action calc(key) {

    let solution = this.evaluate(this.teacher.question);

    if (this.answerAllowedFor(solution)) {
      this.teacher.answer = this.teacher.answer + '' + key;
      if (this.answerReady(solution)) {
        let isCorrect = false;
        if (solution == this.teacher.answer) {
          let result = { question: this.teacher.question, answer: this.teacher.answer, status: 'OK' };
          this.teacher.completed = this.teacher.question + ' = ' + this.teacher.answer;
          this.teacher.addResult(result);
          isCorrect = true;
          ////this.teacher.question = null;

        } else {
          let result = { question: this.teacher.question, answer: this.teacher.answer, status: ':-(' }
          this.completed = ':-(';
          this.teacher.addResult(result);
        }
        /////this.teacher.answer = '';

        setTimeout(() => {
          this.teacher.completed = null;
          this.teacher.answer = '';
          if (isCorrect) {
            if (this.teacher.questions.length > 0) {
              this.teacher.questions.shift();
              this.teacher.question = this.teacher.questions[0];
            }
          }
          this.finito();

        }, 2000);
      }
    }
  }

  evaluate(question) {
    if (question) {
      let token = question.split(' ');
      return (token[0] * 1) / (token[2] * 1);
    }
  }

  finito() {
    if (this.teacher.questions.length == 0) {
      document.getElementById('dvFireworks').style.display = 'block';
      document.getElementById('dvPicture').style.display = 'none';

      this.teacher.finito();
    }
  }

  @action start(maxResult, range1, range2, count) {
    this.teacher.start(range1);
    let high1 = range1.substring(range1.indexOf(' - ') + 3, range1.length);
    let high2 = 1;
    let counter = count * 1;
    let max = 1;
    while (counter > 0 && max < 100) {
      max++;
      let random1 = (Math.floor(Math.random() * (high1 - high2)) + high2) * 2;
      if (random1 > 0 && random1 <= high1) {
        let question = random1 + ' / ' + 2;
        //if (!this.teacher.questions.includes(question)) {
        this.teacher.questions.push(question);
        counter--;
        //}
      }
    }

    console.log('questions', this.teacher.questions);
    this.teacher.question = this.teacher.questions[0];
    this.teacher.trigger('__results', []);
    this.teacher.answer = '';

    document.getElementById('dvFireworks').style.display = 'none';
    document.getElementById('dvPicture').style.display = 'block';
  }

}