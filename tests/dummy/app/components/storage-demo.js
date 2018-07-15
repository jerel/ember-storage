import Component from '@ember/component';
import { computed } from '@ember/object';
import { throttle } from '@ember/runloop';
import { htmlSafe } from "@ember/string";

export default Component.extend({

  style: computed('storage.{mouseX,mouseY}', function() {
    const mouseY = this.get('storage.mouseY');
    const mouseX = this.get('storage.mouseX');
    return new htmlSafe(`left:${mouseX}px; top:${mouseY}px`);
  }),

  didInsertElement() {
    this._super(...arguments);

     window.onmousemove = (e) => {
      this.x = e.x+1;
      this.y = e.y+1;

      if ( ! window.requestAnimationFrame ) {
        throttle(this, this.updateLocation, 100);
      }
    };

    if (window.requestAnimationFrame) {
      this.updateLocation();
    }
  },

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
  }

});
