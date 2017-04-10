describe('Login', function() {
    it('should return results', function() {
        expect(element(by.css('#result')).html()).toEqual("Nothing Yet");

        // Find the element with ng-model="user" and type "jacksparrow" into it
        element(by.model('email')).sendKeys('loren@klingman.us');
        element(by.model('password')).sendKeys('test');

        // Find the first (and only) button on the page and click it
        element(by.css(':button')).click();

        // Verify it was successful
        expect(element(by.css('#result')).html()).toEqual("Valid! Got a token!");
    });
});