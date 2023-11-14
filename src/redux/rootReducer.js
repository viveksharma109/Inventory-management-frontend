import { combineReducers } from 'redux';
import orderReducer from './slices/request';

const rootReducer = combineReducers({
    order: orderReducer,
});

export default rootReducer;
