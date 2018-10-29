import angular from 'angular';
import phoneList from './phoneList';

module.exports = angular.module('phonecatApp', [])
.component('phoneList', phoneList)
.name;