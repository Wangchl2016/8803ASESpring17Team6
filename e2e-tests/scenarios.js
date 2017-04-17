'use strict';

describe('my app', function() {
  it('should automatically redirect to /welcome when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getCurrentUrl()).toMatch("/welcome");
  });

});

describe('login', function() {

    beforeEach(function() {
        browser.get('login');
    });
    it('should check for valid login', function() {

        expect($('#result').getText()).toEqual("Nothing Yet");

        element(by.model('email')).sendKeys('loren@klingman.us');
        element(by.model('password')).sendKeys('test');

        $('button').click();

        expect(browser.getCurrentUrl()).toMatch("/playlist");
        expect($('h1').getText()).toMatch(/Playlist Sharing App/);
        expect($('.welcome').getText()).toMatch(/You're logged in! More functionality soon!/);


    });
    it('should check for invalid login', function() {
        expect($('#result').getText()).toEqual("Nothing Yet");
        element(by.model('email')).sendKeys('invalid@email.this');
        element(by.model('password')).sendKeys('test');

        $('button').click();

        expect($('#result').getText()).toEqual("Login failed! Invalid username and password.");
    });

    it('should go back to welcome page', function() {
        element(by.linkText('Back')).click();
        expect(browser.getCurrentUrl()).toMatch("/welcome");
        expect($('h1').getText()).toMatch(/Playlist Sharing App/);
    });

});


describe('register', function() {

    beforeEach(function() {
        browser.get('register');
    });


    it('should render register when user navigates to register', function() {
        expect($('button').getText()).toMatch(/Register/);
    });

    it('should register a new user', function() {
        var date = new Date();
        var randval = date.getTime();
        element(by.model('firstname')).sendKeys( randval);
        element(by.model('lastname')).sendKeys( randval);
        element(by.model('email')).sendKeys( randval + '@ase.com');
        element(by.model('password')).sendKeys('test');

        $('button').click();

        expect(browser.getCurrentUrl()).toMatch("/playlist");

    });

    it('tries to register with existing email', function() {

        element(by.model('firstname')).sendKeys('firstname');
        element(by.model('lastname')).sendKeys('lastname');
        element(by.model('email')).sendKeys( 'loren@klingman.us');
        element(by.model('password')).sendKeys('test');

        $('button').click();

        expect($('#result').getText()).toEqual("Registration failed! User exists");
    });

});

describe('register and login', function() {
    beforeEach(function() {
        browser.get('register');
    });

    it('registers a new user and logs her in', function() {

        var date = new Date();
        var randval = date.getTime();
        element(by.model('firstname')).sendKeys(randval);
        element(by.model('lastname')).sendKeys(randval);
        element(by.model('email')).sendKeys(randval + '@ase.com');
        element(by.model('password')).sendKeys('test');

        $('button').click();

        expect(browser.getCurrentUrl()).toMatch("/playlist");

        browser.get('login');

        expect($('#result').getText()).toEqual("Nothing Yet");

        element(by.model('email')).sendKeys(randval + '@ase.com');
        element(by.model('password')).sendKeys('test');

        $('button').click();

        expect(browser.getCurrentUrl()).toMatch("/playlist");
        expect($('h1').getText()).toMatch(/Playlist Sharing App/);
        expect($('.welcome').getText()).toMatch(/You're logged in! More functionality soon!/);

    })
});