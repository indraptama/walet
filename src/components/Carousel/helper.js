import Wallop from 'wallop';

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
