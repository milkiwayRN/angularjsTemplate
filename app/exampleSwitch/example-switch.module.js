import angular from 'angular';
import ngRedux from 'ng-redux';
import exampleSwitchComponent from './example-switch.component';
import store from '../store';

export default  angular.module('switchModule', [ngRedux])
    .config($ngReduxProvider => {
        $ngReduxProvider.provideStore(store);
    })
    .component('exampleSwitch', exampleSwitchComponent)
    .name