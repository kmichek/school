/* eslint-disable prettier/prettier */
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
//import { jsPDF } from "jspdf";
import { htmlSafe } from '@ember/string';

const qStart = '&emsp;&emsp;&emsp;<span style="white-space: nowrap;">';
const qMark = '&emsp;<span style="color:lightgrey;">?</span>&emsp;';
const qEqual = '&emsp;<span style="color:lightgrey;">=</span>&emsp;';
const qEnd = '</span>';

export default class Sign extends Component {

  @service teacher;

  constructor() {
    super(...arguments);
    let self = this;
    //if (!this.teacher.has('__sign')) {
      this.teacher.on('__sign',function (maxResult, range1, range2, count) {
          self.start(maxResult, range1, range2, count);
        }
      );
    //}
    this.teacher.question = null;
  }

  answerAllowedFor(solution) {
    if (solution == 0 || solution > 0) {
      return (
        this.teacher.answer == null ||
        this.teacher.answer == '' ||
        this.teacher.answer.toString().length < solution.toString().length
      );
    } else {
      return false;
    }
  }

  answerReady(solution) {
    return this.teacher.answer.toString().length == solution.toString().length;
  }

  @action calc(key) {
    let isCorrect = false;
    if (key == '+') {
      if (this.teacher.question.random1 + this.teacher.question.random2 ==this.teacher.question.questionAnswer) {
        isCorrect = true;
      }
    } else if (key == '-') {
      if (this.teacher.question.random1 - this.teacher.question.random2 ==this.teacher.question.questionAnswer) {
        isCorrect = true;
      }
    }

    if (isCorrect) {
      let result = {
        question:
          this.teacher.question.random1 + ' ? ' + this.teacher.question.random2,
        answer: key,
        status: 'OK',
      };
      this.teacher.completed =this.teacher.question.random1 +' ' +key +' ' +this.teacher.question.random2 +' = ' +this.teacher.question.questionAnswer;
      this.teacher.results.push(result);
      this.teacher.trigger('__results', this.teacher.results);
      this.teacher.question = null;
    } else {
      let result = {
        question: this.teacher.question.random1 + ' ? ' + this.teacher.question.random2,
        answer: key,
        status: ':-(',
      };
      this.teacher.completed = ':-(';
      this.teacher.results.push(result);
      this.teacher.trigger('__results', this.teacher.results);
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
      if (this.teacher.questions.length == 0) {
        document.getElementById('dvFireworks').style.display = 'block';
        document.getElementById('dvPicture').style.display = 'none';
      }
    }, 2000);
  }

  evaluate2(question) {
    if (question) {
      let token = question.split(' ');
      if (token[1] === '+') {
        return token[0] * 1 + token[2] * 1;
      } else if (token[1] === '-') {
        return token[0] * 1 - token[2] * 1;
      }
    }
  }

  @action start(maxResult, range1, range2, count) {
    if (range1 && range2 && count){
      if (this.teacher.quizMode == this.teacher.quizSign2){
        this.start2(maxResult, range1, range2, count);
      }
    } else {
      this.notify.warning('Zvolit zadání, prosím');
    }
    document.getElementById('dvFireworks').style.display = 'none';
    document.getElementById('dvPicture').style.display = 'block';
  }

  @action start2(maxResult, range1, range2, count) {
    this.teacher.questions = [];
    this.teacher.results = [];
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
        if (
          result > -1 &&
          !this.teacher.questions.includes(question) &&
          notOverMaxZeros &&
          result <= maxResult
        ) {
          let questionPre = htmlSafe(
            qStart + random1 + qMark + random2 + qEnd + qEqual + result
          );
          let question = {
            questionPre: questionPre,
            questionAnswer: result,
            random1: random1,
            random2: random2,
          };
          this.teacher.questions.push(question);
          counter--;
        }
      }
    }
    console.log('questions', this.teacher.questions);
    this.teacher.question = this.teacher.questions[0];
    this.teacher.trigger('__results', []);
    this.teacher.answer = '';
  }
}
