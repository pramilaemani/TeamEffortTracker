var protractor = require('protractor');
path = require('path');
var driver = require('selenium-webdriver');

//fetch data from the excel in order to provide data to the test cases
cellFromXLS = function (cellId) {
    'use strict';
    //Define sheetNumber
    var sheetNumber = 0;
    //Define file Path name    
	var fileNamePath = path.join('C:/NewEffortTracker-master/test/', 'data.xls');	
    //NodeJs read file
    var XLS;
    if (typeof require !== 'undefined') {
        XLS = require('xlsjs');
    }
    //Working with workbook
    var workbook = XLS.readFile(fileNamePath);
    var sheetNamelist = workbook.SheetNames;
    var value = workbook.Sheets[sheetNamelist[sheetNumber]][cellId].v;
    return value;
};

function waitForElementToBePresent(element){
browser.wait(function () {
return element.isPresent();
},60000);

browser.wait(function () {
return element.isDisplayed();
},60000);
};

describe('Effort Tracker App Test', function() {
         browser.get('http://localhost:3000/');
            // ptor = protractor.getInstance();
         

  
        it('should login to App', function() {
               element(by.xpath('/html/body/ul/li[2]/a')).click();
               
           expect(element(by.xpath('//h3')).getText()).toEqual('Campaign Details Page');
           });
        it('should return campaigns for the vinid entered', function(){
          browser.get('http://localhost:8000/getCampDetails');
          var vinid = cellFromXLS('B2');
          var input = element(by.xpath(".//*[@id='inputVinId']"));
          var button = element(by.id('btnSubmit'));
              input.sendKeys(vinid);
              button.click();
              results = element.all(by.repeater('campdet in selCampDetails'));
              expect(results.count()).toEqual(2);
              element(by.model('form.vinid')).clear();          
        });
        //Negative test case: Querying for Campaigns associated to VINID that does not exist
        it('should not return any campaign ids', function(){
          browser.get('http://localhost:8000/getCampDetails');
          
          var vinid = cellFromXLS('B3');
          var input = element(by.xpath(".//*[@id='inputVinId']"));
          var button = element(by.id('btnSubmit'));
              input.sendKeys(vinid);
              button.click();
              results = element.all(by.repeater('campdet in selCampDetails'));
              expect(results.count()).toEqual(0);//No results
        });
        it('should click on the Vin Details Link', function() {
               element(by.xpath('/html/body/ul/li[3]/a')).click();
           expect(element(by.xpath('//h3')).getText()).toEqual('Vin Details Page');
           });                     
        it('should return Vins for the campid entered', function(){
          browser.get('http://localhost:8000/getVinDetails');
          var campid = cellFromXLS('C4');
          var input  = element(by.model("form.campid"));
          var button = element(by.id('btnSubmit'));
              input.sendKeys(campid);
              button.click();
              results = element.all(by.repeater('vindet in selVinDetails'));
              expect(results.count()).toEqual(5);
        });
        //Negative test case: Querying for VINS associated to CAMPAIGN that does not exist
        it('should not return any Vins for the campid entered', function(){
          browser.get('http://localhost:8000/getVinDetails');
          var campid = cellFromXLS('C5');
          var input  = element(by.model("form.campid"));
          var button = element(by.id('btnSubmit'));
              input.sendKeys(campid);
              button.click();
              results = element.all(by.repeater('vindet in selVinDetails'));
              expect(results.count()).toEqual(0);
        });
});
