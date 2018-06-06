import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';


module('Unit | Service | storage', function(hooks) {
  setupTest(hooks);

  // setup
  hooks.beforeEach(function() {
    const service = this.owner.lookup('service:storage');
    service.set('prefix', 'test-temp');
    service.set('type', 'session');
  });

  // Replace this with your real tests.
  test('prefix exists and can be set', function(assert) {
    const service = this.owner.lookup('service:storage');
    assert.equal(service.get('prefix'), 'test-temp');
    service.set('prefix', 'test');
    assert.equal(service.get('prefix'), 'test');
  });

  test('set prefix is applied to key', function(assert) {
    const service = this.owner.lookup('service:storage');
    assert.equal(service._prefix('my-key'), 'test-temp__my-key');
  });

  test('integers can be set', function(assert) {
    const service = this.owner.lookup('service:storage');
    service.set('age', 23);
    assert.equal(window.sessionStorage['test-temp__age'], 23);
  });

  test('strings can be set', function(assert) {
    const service = this.owner.lookup('service:storage');
    service.set('name', 'forrest');
    assert.equal(window.sessionStorage['test-temp__name'], JSON.stringify('forrest'));
    assert.equal(service.get('name'), 'forrest');
  });

  test('objects can be set', function(assert) {
    const service = this.owner.lookup('service:storage');

    let user = {
          name: 'forrest',
          weight: 170,
        };
    service.set('user', user);
    assert.equal(window.sessionStorage['test-temp__user'], JSON.stringify(user));
    assert.equal(JSON.stringify(service.get('user')), JSON.stringify(user));
  });

  test('arrays can be set', function(assert) {
    const service = this.owner.lookup('service:storage');

    let friends = [
          'jenny',
        ];
    service.set('friends', friends);
    assert.equal(window.sessionStorage['test-temp__friends'], JSON.stringify(friends));
    assert.equal(JSON.stringify(service.get('friends')), JSON.stringify(friends));
  });

  test('items set by this service can be cleared', function(assert) {
    assert.expect(1);

    const service = this.owner.lookup('service:storage');
    let length = window.sessionStorage.length;

    service.clear();
    assert.ok(length > window.sessionStorage.length);
    for (var i=0; i < window.sessionStorage.length; i++) {
      var key = window.sessionStorage.key(i);
      if (key && key.match(/^test-temp__.*?/)) {
        assert.ok(false, 'Undeleted item in storage');
      }
    }
  });

});

