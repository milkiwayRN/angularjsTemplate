import angular from 'angular';
import phoneList from './phoneList';
import switchModule from './exampleSwitch/example-switch.module';

export default angular.module('phonecatApp', [switchModule])
    .component('phoneList', phoneList)
    .name;