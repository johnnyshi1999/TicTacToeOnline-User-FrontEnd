import {createStore} from 'redux';

import AppReducer from './reducers/AppReducer';
const CaroOnlineStore = createStore(AppReducer);

export default CaroOnlineStore;