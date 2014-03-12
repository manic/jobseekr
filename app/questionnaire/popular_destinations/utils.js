window.utils = {
  /**
   * Cross-browser event binding by John Resig.
   * http://ejohn.org/projects/flexible-javascript-events/
   */
  addEvent: function (obj, type, fn) {
    if (obj.attachEvent) {
      obj['e' + type + fn] = fn;
      obj[type+fn] = function () {
        obj['e'+type+fn](window.event);
      };
      obj.attachEvent('on' + type, obj[type + fn]);
    } else {
      obj.addEventListener(type, fn, false);
    }
  },
  /**
   * document.getElementsByClass is not supported by IE7- browsers.
   * http://www.dustindiaz.com/getelementsbyclass
   */
  getElementsByClass: function (searchClass, node, tag) {
    if (document.getElementsByClassName) {
      return node.getElementsByClassName(searchClass);
    }
    var classElements = new Array();
    if (node == null) {
      node = document;
    }
    if (tag == null) {
      tag = '*';
    }
    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
    for (i = 0, j = 0; i < elsLen; i++) {
      if ( pattern.test(els[i].className) ) {
        classElements[j] = els[i];
        j++;
      }
    }
    return classElements;
  },
  /**
   * Parse mustache-like template.
   */
  parse: function(tpl, attrs) {
    var i;
    for (i in attrs) {
      tpl = tpl.replace(new RegExp("{{" + i + "}}", 'g'), attrs[i]);
    }
    return tpl;
  }
}
