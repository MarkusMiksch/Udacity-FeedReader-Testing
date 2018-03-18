/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URLs are defined', function() {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Names are defined', function() {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* This is a new test suite named "The menu" */
    describe('The menu', function() {

        /* This is a test that ensures the menu element is
         * hidden by default.
         */
        it('Menu element is hidden by default', function() {
            expect(document.body.classList).toContain("menu-hidden");
        });

         /* This is a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: the menu displays when
          * clicked and it hides when clicked again.
          */
        it('Menu element toggles visibility when clicked', function() {
            let menuIcon =  $('.menu-icon-link');
            menuIcon.click();
            expect(document.body.classList).not.toContain("menu-hidden");
            menuIcon.click();
            expect(document.body.classList).toContain("menu-hidden");
        });
    });

    /* This is a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* This is a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * The loadFeed() function is asynchronous so this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done){
            loadFeed(0, done);
        });

        it('after loadFeed() .entry element in .feed container', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /* This is a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* This is a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Again - loadFeed() is asynchronous, so it requires the
         * beforeEach and asynchronous done() function.
         */

        beforeEach(function(done){
            loadFeed(0, function(){
                let feed0 = $('.feed').html();
                loadFeed(1, function(){
                    let feed1 = $('.feed').html();
                    done;
                });
            });
        });

        it('Content changes after feed is loaded', function() {
            expect(feed0).not.toEqual(feed1);
        });
    });

}());
