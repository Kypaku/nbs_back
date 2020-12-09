import {uuid} from '../helpers/index.js';

const token = (new Date()).getTime().toString(36) + Math.random().toString(36) + Math.random().toString(36)
console.log('Token: ', token);

export default token