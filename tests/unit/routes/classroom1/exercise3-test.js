import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | classroom1/exercise3', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:classroom1/exercise3');
    assert.ok(route);
  });
});
