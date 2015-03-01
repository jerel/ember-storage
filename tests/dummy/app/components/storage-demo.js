import Ember from 'ember';

export default Ember.Component.extend({
  trackMouse: function() {
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
  }.on('init'),
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

