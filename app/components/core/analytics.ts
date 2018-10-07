import * as electron from 'electron';

const track = electron.remote.require('./analytics').track;

export { track };
