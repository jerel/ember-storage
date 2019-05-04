export function initialize() {
  let application = arguments[1] || arguments[0];
  application.inject('route', 'storage', 'service:storage');
  application.inject('component', 'storage', 'service:storage');
  application.inject('controller', 'storage', 'service:storage');
}

export default {
  name: 'storage-service',
  initialize: initialize
};
