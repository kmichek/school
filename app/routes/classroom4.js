/* eslint-disable prettier/prettier */
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class Classroom3Route extends Route {

    @service router;

    beforeModel() {
        this.router.transitionTo('classroom4.exercise1');
    }
}
