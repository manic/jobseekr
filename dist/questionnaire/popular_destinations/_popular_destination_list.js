/*jslint nomen: true, indent: 2, white: true, forin: true*/
/*global window: true, document: true, utils: true */
(function () { // Anonymous function to avoid pollute globally.

  'use strict';

  var COLUMN_AMOUNT = 3,
      MODULE_ID = 'popular-destination-list',
      //==================
      // Shared Variables
      //==================
      _cities = window.data[MODULE_ID],
      _columns = [],
      _el = document.getElementById(MODULE_ID),
      _lastEl,
      _linkEl,
      _bodyEl = utils.getElementsByClass('bd', _el)[0],
      _template = document.getElementById('tpl-city').innerHTML,
      //==================
      // Methods
      //==================
      _assignColumns,
      _generateHTML,
      _toggleTip;

  /**
   * Assign cities to different columns.
   */
  _assignColumns = function (cities, columnAmount) {
    var columns = [],
      total,
      capacity,
      offset = 0,
      remainder = 0,
      city,
      filled,
      overed,
      i;
    total = cities.length;
    remainder = total % columnAmount;
    capacity = parseInt(total / columnAmount, 10);
    for (i in cities) {
      city = cities[i];
      city.id = city.name.toLowerCase();
      columns[offset] = columns[offset] || [];
      columns[offset].push(city);
      filled = (columns[offset].length === capacity);
      overed = (columns[offset].length > capacity);
      if (filled && !overed && remainder > 0) {
        remainder -= 1;
      } else {
        offset = (filled || overed) ? offset + 1 : offset;
      }
    }
    return columns;
  };

  /**
   * Generate HTML according to columns data.
   */
  _generateHTML = function (columns, tpl) {
    var html = [],
        i,
        j;
    for (i in columns) {
      if (columns.hasOwnProperty(i)) {
        html.push('<ul>');
        for (j in columns[i]) {
          html.push(utils.parse(tpl, columns[i][j]));
        }
        html.push('</ul>');
      }
    }
    return html.join('');
  };

  /**
   * Toggle the visibility of tooltip.
   */
  _toggleTip = function (el) {
    if (el.className.indexOf('active') === -1) {
      el.className += ' active';
    } else {
      el.className = el.className.replace(' active', '');
    }
    _lastEl = el;
    return el;
  };

  // Step 1. Sort by city name alphabetically.
  _cities.sort(function (x, y) {
    return x.name.toLowerCase().localeCompare(y.name.toLowerCase());
  });

  // Step 2. Arrange cities to different columns.
  _columns = _assignColumns(_cities, COLUMN_AMOUNT);

  // Step 3. Display HTML.
  _bodyEl.innerHTML = _generateHTML(_columns, _template);

  // Step 4. Bind events by using delegation.
  utils.addEvent(document, 'click', function (e) {
    var target = e.target || e.srcElement,
        className = target.className;
    if (_lastEl) {
      _lastEl.className = _lastEl.className.replace(' active', '');
      _lastEl = null;
    }
    if (className.indexOf('city-link') > -1) {
      _toggleTip(target);
    } else if (className.indexOf('badge') > -1 || className.indexOf('.tooltip') > -1) {
      _toggleTip(target.parentNode);
    }
  });

  // Sweet: Shows tooltips when page loaded if hash exists.
  if (window.location.hash) {
    _linkEl = document.getElementById('city-link-' + window.location.hash.replace('#', ''));
    if (_linkEl) {
      _toggleTip(_linkEl);
    }
  }

}());
