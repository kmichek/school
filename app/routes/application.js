// app/routes/application.js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service router;
  @service intl;

  beforeModel() {
    //this.intl.setLocale(['en-us']);
    this.intl.setLocale(['cs-cz']);
    this.router.transitionTo('classroom1.exercise1');
    //this.router.transitionTo('typing');
  }
}
