/* eslint-disable prettier/prettier */
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

const { keys } = Object;

export default class Quiz extends Component {

  @service intl;
  @service cookies;
  @service teacher;

  @tracked results;

  @tracked counts = ['5', '10', '15', '20', '25', '30', '35', '40', '45', '50'];
  @tracked count = '10';

  @tracked ranges1 = ['0 - 1', '0 - 2', '0 - 3', '0 - 4', '0 - 5', '0 - 6', '0 - 7', '0 - 8', '0 - 9', '0 - 10', '0 - 20', '0 - 30', '0 - 40', '0 - 50'];
  @tracked range1 = '0 - 10';

  @tracked maxResults = ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '30', '40', '50', '100'];
  @tracked maxResult = '10';

  constructor() {
    super(...arguments);

    let self = this;
    this.teacher.on('__results', function(results) {
      self.results = results;
    });

    this.configReload();
  }

  configReload(){
    let cookieService = this.cookies;
    let cookiesMap = cookieService.read();
    keys(cookiesMap).reduce((acc, key) => {
      let value = cookiesMap[key];
      switch(key) {
        case 'configCount':
          this.count = value;
          break;
        case 'configMaxResult':
          this.maxResult = value;
          break;
        case 'configRange1':
          this.range1 = value;
          break;
        case 'configLocale':
          this.intl.set('locale', value);
          break;
      }
    }, []);
  }

  @action configSelectCount(value){
    this.count = value;
    this.cookies.write('configCount', value);
  }

  @action configSelectMaxResult(value){
    this.maxResult = value;
    this.cookies.write('configMaxResult', value);
  }

  @action configSelectRange1(value){
    this.range1 = value;
    this.cookies.write('configRange1', value);
  }

  @action start() {
    if (this.teacher.quizMode == this.teacher.quizPlusMinus2 || this.teacher.quizMode == this.teacher.quizPlusMinus3) {
      this.teacher.trigger('__plusMinus', this.maxResult, this.range1, this.range1, this.count);

    } else if (this.teacher.quizMode == this.teacher.quizGreaterLess){
      this.teacher.trigger('__greaterLess', this.range1, this.range1, this.count);

    } else if (this.teacher.quizMode == this.teacher.quizSign2){
      this.teacher.trigger('__sign', this.maxResult, this.range1, this.range1, this.count);
    }
  }
}
