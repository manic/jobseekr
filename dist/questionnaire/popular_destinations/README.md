README File
-----------

This folder contains my implementation for Popular Destinations.

* At the beginning I wanted to use CSS3 Multiple Columns and do some elegant downgrade for IE9- browsers. Finally I decided to use a general solution because it would be more straightforward.
    * General solution: Use multiple UL and CSS floating.
* No libraries or tools being used. I only copied several functions such as `addEvent` or `getElementsByClass` which doesn't support in legend IE browsers.
* Tested on IE6, IE7, Chrome, Firefox, and Safari.

## File List

* `base.css` - Reusable CSS.
* `util.js` - Mostly for legend IE browsers.
* `_popular_destination_list.css` - Main stylesheet.
    * I used some CSS3 effects which only takes effects on modern browsers.
    * Also write CSS hacks for IE directly. It's not necessary to create another file to do this for now.
* `_popular_destination_list.js` - Main JavaScript.
    * I assign city to different columns and output it into `.bd`. A very straightforward approach.
    * The bonus is the tooltip shows if URL hash exists.
* `data.js` - The cities data which the assignment provides.
    * I assign the data to `window.data['popular-destination-list']` global variable.
* `index.html` - Testing HTML page.
    * `#tpl-city`: I imitate the Mustache way for templating.

---
- E-mail: [josephj6802@gmail.com](mailto:josephj6802@gmail.com)
- Github: [josephj](http://github.com/josephj)

