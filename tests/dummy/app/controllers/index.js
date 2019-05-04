import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
    storageValues: computed('storage.{name,email,message,mouseX,mouseY}',        
        function(){
            var obj = {};

            if(this.get('storage.name') !== undefined){
                obj.name = this.get('storage.name');
            }            
            if(this.get('storage.email') !== undefined){
                obj.email = this.get('storage.email');
            }
            if(this.get('storage.message') !== undefined){
                obj.message = this.get('storage.message');
            }
            if(this.get('storage.mouseX') !== undefined){
                obj.mouseX = this.get('storage.mouseX');
            }
            if(this.get('storage.mouseY') !== undefined){
                obj.mouseY = this.get('storage.mouseY');
            }

            return obj;
        }),
});
