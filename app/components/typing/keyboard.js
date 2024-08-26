/* eslint-disable prettier/prettier */
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Keyboard extends Component {

  @tracked copyLine = 'abc abc abc abc abc abc abc abc abc abc abc ';
  @tracked typeIn;

  constructor() {
    super(...arguments);
    console.log('keyboard !!!');
  }

  @action keyed(value){
    console.log('keyed::', value);
  }

  @action typed(value){
    console.log('typed::', value);
    this.typeIn = value;
  }

  @action void(){

  }
}
