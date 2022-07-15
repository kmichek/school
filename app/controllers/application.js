/* eslint-disable prettier/prettier */
// https://lokalise.com/blog/emberjs-i18n-a-beginners-guide/

import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

const cookieOptionsClassroom1 = {sameSite: 'none', secure: true, path: 'classroom1'};

export default class ApplicationController extends Controller {

  @service intl;
  @service cookies;
  @service teacher;

  selectedBasicTab = 0;

  @action changeLocale(locale) {
    this.cookies.write('configLocale', locale, cookieOptionsClassroom1);
    return this.intl.set('locale', locale);
  }
}
