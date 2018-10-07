const Store = require('electron-store');

const store = new Store({
  defaults: {
    allowAnalytics: true
  }
});

module.exports = store;
