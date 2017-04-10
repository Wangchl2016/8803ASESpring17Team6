'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /welcome when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/welcome");
  });


  describe('login', function() {

    beforeEach(function() {
      browser.get('/login');
    });


    it('should return results', function() {
        expect(element(by.id('result')).first().getText()).toEqual("Nothing Yet");

        // Find the element with ng-model="user" and type "jacksparrow" into it
        element(by.model('email')).sendKeys('loren@klingman.us');
        element(by.model('password')).sendKeys('test');

        // Find the first (and only) button on the page and click it
        element(by.css(':button')).click();

        // Verify it was successful
        expect(element(by.id('result')).first().getText()).toEqual("Valid! Got a token!");
    });

  });


  describe('view2', function() {

    beforeEach(function() {
      browser.get('index.html#!/view2');
    });


    it('should render view2 when user navigates to /view2', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});

