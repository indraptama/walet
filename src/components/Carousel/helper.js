import Wallop from './Wallop';

const wallopInit = () => {
  var wallopEl = document.querySelector('.Wallop');
  var wallop = new Wallop(wallopEl);

    var paginationDots = Array.prototype.slice.call(document.querySelectorAll('.Wallop-dot'));
    paginationDots.forEach(function (dotEl, index) {
      dotEl.addEventListener('click', function(e) {
        e.preventDefault();
        wallop.goTo(index);
      });
    });

    wallop.on('change', function(event) {
      removeClass(document.querySelector('.Wallop-dot--current'), 'Wallop-dot--current');
      addClass(paginationDots[event.detail.currentItemIndex], 'Wallop-dot--current');
    });

    function addClass(element, className) {
      if (!element) { return; }
      element.className = element.className.replace(/\s+$/gi, '') + ' ' + className;
    }

    function removeClass(element, className) {
      if (!element) { return; }
      element.className = element.className.replace(className, '');
    }
}
export default wallopInit;


// (function(){
//   var Wallop = require('wallop'),
//   wallopEl = document.getElementById('slider'),
//   slider = new Wallop(wallopEl, {
//     // wallop options, like custom class names, ...
//   });
//   var autoPlayMs = 4500,
//   nextTimeout,
//   loadNext = function() {
//     var nextIndex = (slider.currentItemIndex + 1) % slider.allItemsArray.length;
//     slider.goTo(nextIndex);
//   };
//   nextTimeout = setTimeout(function() {
//     loadNext();
//   }, autoPlayMs);
//   slider.on('change', function() {
//     clearTimeout(nextTimeout);
//     nextTimeout = setTimeout(function() {
//       loadNext();
//     }, autoPlayMs);
//   });
//   // the code you asked for:
//   wallopEl.addEventListener('mouseenter', function() {
//     clearTimeout(nextTimeout);
//   });
//   wallopEl.addEventListener('mouseleave', function() {
//     nextTimeout = setTimeout(function() {
//       loadNext();
//     }, autoPlayMs);
//   });
// })();
