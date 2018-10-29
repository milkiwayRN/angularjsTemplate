import angular from 'angular';
import ngRedux from 'ng-redux';
import { createStore, combineReducers } from 'redux';
import exampleSwitchComponent from './example-switch.component';
import { switchExampleReducer } from '../reducers/example.reducer';


const reducer = combineReducers({exampleSwitch: switchExampleReducer});
const store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default  angular.module('switchModule', [ngRedux])
    .config($ngReduxProvider => {
        $ngReduxProvider.provideStore(store);
    })
    .component('exampleSwitch', exampleSwitchComponent)
    .name