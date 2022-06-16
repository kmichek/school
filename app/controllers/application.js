/* eslint-disable prettier/prettier */
// https://lokalise.com/blog/emberjs-i18n-a-beginners-guide/

import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {

  @service intl;

  selectedBasicTab = 0;

  @action changeLocale(locale) {
    return this.intl.set('locale', locale);
  }
}
