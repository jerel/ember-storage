import Ember from 'ember';

export default Ember.Component.extend({
  style: Ember.computed('storage.mouseX', 'storage.mouseY', function() {
    const mouseY = this.get('storage.mouseY');
    const mouseX = this.get('storage.mouseX');
    return new Ember.Handlebars.SafeString(`left: ${mouseX}px; top: ${mouseY}px`);
  }),
  trackMouse: Ember.on('init', function() {
    window.onmousemove = (e) => {
      this.x = e.x+1;
      this.y = e.y+1;

      if ( ! window.requestAnimationFrame) {
        Ember.run.throttle(this, this.updateLocation, 100);
      }
    };

    if (window.requestAnimationFrame) {
      this.updateLocation();
    }
  }),
  updateLocation: function() {
    if (this.oldX !== this.x || this.oldY !== this.y) {
      this.storage.set('mouseX', this.x);
      this.storage.set('mouseY', this.y);
      this.oldX = this.x;
      this.oldY = this.y;
    }

    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(this.updateLocation.bind(this));
    }
  },
});
