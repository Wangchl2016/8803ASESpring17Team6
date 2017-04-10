'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /welcome when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/welcome");
  });

});

describe('login', function() {

    beforeEach(function() {
        browser.get('login');
        browser.wait(function() {
            return  $('#result').isPresent(); // keeps waiting until this statement resolves to true
        }, 10000, 'message to log to console if element is not present after that time');
    });
    it('should return results', function() {

        expect($('#result').getText()).toEqual("Nothing Yet");

        // Find the element with ng-model="user" and type "jacksparrow" into it
        element(by.model('email')).sendKeys('loren@klingman.us');
        element(by.model('password')).sendKeys('test');

        // Find the first (and only) button on the page and click it
        $('button').click();

        //browser.waitsFor(1000);

        // Verify it was successful
        expect($('#result').getText()).toEqual("Valid! Got a token!");
    });

});


describe('register', function() {

    beforeEach(function() {
        browser.get('register');
    });


    it('should render register when user navigates to register', function() {
        expect($('button').getText()).
        toMatch(/Register/);
    });

});