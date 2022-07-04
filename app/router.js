import EmberRouter from '@ember/routing/router';
import config from 'school/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('home');
  this.route('classroom1', function () {
    this.route('exercise1');
    this.route('exercise2');
    this.route('exercise3');
    this.route('exercise4');
  });
  this.route('classroom2');
});
