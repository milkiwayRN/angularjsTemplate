import angular from 'angular';
import phoneList from './phoneList';

export default angular.module('phonecatApp', [])
.component('phoneList', phoneList)
.name;