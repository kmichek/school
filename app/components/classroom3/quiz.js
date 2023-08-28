/* eslint-disable prettier/prettier */
// https://www.umimematiku.cz/matematika-detail-2-trida
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

const { keys } = Object;
const cookieOptionsClassroom3 = { sameSite: 'none', secure: true, path: 'classroom3' };

export default class Quiz extends Component {

  @service intl;
  @service cookies;
  @service teacher;

  @tracked results;

  @tracked counts = ['5', '10', '15', '20', '25', '30', '35', '40', '45', '50'];
  @tracked count = '10';

  @tracked ranges1 = ['1 - 2', '1 - 3', '1 - 4', '1 - 5', '1 - 6', '1 - 7', '1 - 8', '1 - 9', '1 - 10', '1 - 20', '1 - 30', '1 - 40', '1 - 50', '50 - 100'];
  @tracked range1 = '1 - 50';

  @tracked maxResults = ['10', '15', '20', '30', '40', '50', '60', '70', '80', '90', '100'];
  @tracked maxResult = '10';

  constructor() {
    super(...arguments);

    let self = this;
    this.teacher.on('__results', function (results) {
      self.results = results;
    });

    this.configReload3();
  }

  configReload3() {
    let cookieService = this.cookies;
    let cookiesMap = cookieService.read();
    keys(cookiesMap).reduce((acc, key) => {
      let value = cookiesMap[key];
      switch (key) {
        case 'configCount3':
          this.count = value;
          break;
        case 'configMaxResult3':
          this.maxResult = value;
          break;
        case 'configRange3':
          this.range1 = value;
          break;
        case 'configLocale':
          this.intl.set('locale', value);
          break;
      }
    }, []);
  }

  @action configSelectCount3(value) {
    this.count = value;
    this.cookies.write('configCount3', value, cookieOptionsClassroom3);
  }

  @action configSelectRange3(value) {
    this.range1 = value;
    this.cookies.write('configRange3', value, cookieOptionsClassroom3);
  }

  @action start() {
    if (this.teacher.quizMode === this.teacher.divide4) {
      this.teacher.trigger('__divide4', this.maxResult, this.range1, this.range1, this.count);

    } else if (this.teacher.quizMode === this.teacher.multiply5) {
      this.teacher.trigger('__multiply5', this.maxResult, this.range1, this.range1, this.count);

    /*
    } else if (this.teacher.quizMode === this.teacher.multiply3) {
      this.teacher.trigger('__multiply3', this.maxResult, this.range1, this.range1, this.count);

    } else if (this.teacher.quizMode === this.teacher.multiply4) {
      this.teacher.trigger('__multiply4', this.maxResult, this.range1, this.range1, this.count);

    } else if (this.teacher.quizMode === this.teacher.divide2) {
      this.teacher.trigger('__divide2', this.maxResult, this.range1, this.range1, this.count);

    } else if (this.teacher.quizMode === this.teacher.divide3) {
      this.teacher.trigger('__divide3', this.maxResult, this.range1, this.range1, this.count);
      */
    }
  }
}
