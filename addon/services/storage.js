import Ember from 'ember';

var storage = {
  'local': window.localStorage,
  'session': window.sessionStorage,
};

export default Ember.Service.extend({
  prefix: 'es',
  type: 'local',

  _prefix(key) {
    return this.get('prefix')+'__'+key;
  },
  setUpEventListener: Ember.on('init', function() {
    let self = this,
        regexp = new RegExp('^('+this.get('prefix')+'__)');
    this._notify = function(evnt) {
      self.notifyPropertyChange(evnt.key.replace(regexp, ''));
    };
    window.addEventListener('storage', this._notify, false);
  }),
  willDestroy() {
    this._super();
    window.removeEventListener('storage', this._notify, false);
  },
  unknownProperty(k) {
    var key = this._prefix(k),
        type = this.get('type');
    // if we don't use JSON.parse here then observing a boolean doesn't work
    return storage[type][key] && JSON.parse(storage[type][key]);
  },
  setUnknownProperty(k, value) {
    let key = this._prefix(k),
        type = this.get('type');

    if(Ember.isNone(value)) {
      delete storage[type][key];
    } else {
      storage[type][key] = JSON.stringify(value);
    }
    this.notifyPropertyChange(k);
    return value;
  },
  clear(keyPrefix) {
    this.beginPropertyChanges();
    let prefix = keyPrefix || this.get('prefix'),
        regexp = new RegExp('^('+prefix+'__)'),
        type = this.get('type'),
        toDelete = [];

    for (var i=0; i < storage[type].length; i++){
      let key = storage[type].key(i);
      // don't nuke *everything* in localStorage... just keys that match our pattern
      if (key.match(regexp)) {
        toDelete.push(key);
      }
    }
    toDelete.forEach(function(key) {
      delete storage[type][key];
      key = key.replace(regexp, '');
      this.set(key);
    }, this);
    this.endPropertyChanges();
  }
});
