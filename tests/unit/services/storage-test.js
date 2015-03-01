import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('service:storage', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
  setup: function() {
    this.subject().set('prefix', 'test-temp');
    this.subject().set('type', 'session');
  },
});

// Replace this with your real tests.
test('prefix exists and can be set', function(assert) {
  var service = this.subject();
  assert.equal(service.get('prefix'), 'test-temp');
  service.set('prefix', 'test');
  assert.equal(service.get('prefix'), 'test');
});

test('set prefix is applied to key', function(assert) {
  var service = this.subject();
  assert.equal(service._prefix('my-key'), 'test-temp__my-key');
});

test('integers can be set', function(assert) {
  var service = this.subject();
  service.set('age', 23);
  assert.equal(window.sessionStorage['test-temp__age'], 23);
});

test('strings can be set', function(assert) {
  var service = this.subject();
  service.set('name', 'forrest');
  assert.equal(window.sessionStorage['test-temp__name'], JSON.stringify('forrest'));
  assert.equal(service.get('name'), 'forrest');
});

test('objects can be set', function(assert) {
  var service = this.subject(),
      user = {
        name: 'forrest',
        weight: 170,
      };
  service.set('user', user);
  assert.equal(window.sessionStorage['test-temp__user'], JSON.stringify(user));
  assert.equal(JSON.stringify(service.get('user')), JSON.stringify(user));
});

test('arrays can be set', function(assert) {
  var service = this.subject(),
      friends = [
        'jenny',
      ];
  service.set('friends', friends);
  assert.equal(window.sessionStorage['test-temp__friends'], JSON.stringify(friends));
  assert.equal(JSON.stringify(service.get('friends')), JSON.stringify(friends));
});

test('items set by this service can be cleared', function(assert) {
  assert.expect(1);
  var service = this.subject(),
      length = window.sessionStorage.length;

  service.clear();
  assert.ok(length > window.sessionStorage.length);
  for (var i=0; i < window.sessionStorage.length; i++) {
    var key = window.sessionStorage.key(i);
    if (key && key.match(/^test-temp__.*?/)) {
      assert.ok(false, 'Undeleted item in storage');
    }
  }
});

