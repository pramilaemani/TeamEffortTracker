(function () {
    'use strict';

    angular
        .module('app')
        .controller('Report.IndexController', reportController);

    function reportController($scope, $http, TaskService) {
        var vm = this;

        vm.user = null;
        vm.tasks = null;        
        vm.projects = null;      
        getReport();

$scope.gridOptions = {
    columnDefs: [ 
    {   field : 'Project'}, 
    {   field : 'Resource'}, 
    {   field : 'TaskName'}, 
    {   field : 'TaskStatus'}, 
    {   field : 'EstimatedStartDate'}, 
    {   field : 'EstimatedEndDate'}, 
    {   field : 'ActualStartDate'}, 
    {   field : 'ActualEndDate'}, 
    {   field : 'EstimatedEffort'} , 
    {   field : 'ActualEffort'}  
    ],
    enableGridMenu: true,
    enableSelectAll: true,
    exporterCsvFilename: 'myFile.csv',
    exporterPdfDefaultStyle: {fontSize: 9},
    exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
    exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
    exporterPdfHeader: { text: "My Header", style: 'headerStyle' },
    exporterPdfFooter: function ( currentPage, pageCount ) {
      return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
    },
    exporterPdfCustomFormatter: function ( docDefinition ) {
      docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
      docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
      return docDefinition;
    },
    exporterPdfOrientation: 'portrait',
    exporterPdfPageSize: 'LETTER',
    exporterPdfMaxGridWidth: 500,
    exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    }
  }; 

  function getReport() {           
    TaskService.getTasks().then(function (tasks){
      $scope.gridOptions.data = tasks;
    });            
  }

 }

})();