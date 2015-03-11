export function initialize(container, application) {
  application.inject('route', 'storage', 'service:storage');
  application.inject('component', 'storage', 'service:storage');
  application.inject('controller', 'storage', 'service:storage');
}

export default {
  name: 'storage-service',
  initialize: initialize
};
