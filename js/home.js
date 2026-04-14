(function () {
  'use strict';

  var subnav = document.querySelector('.dm-subnav');
  if (!subnav) return;

  var links = [].slice.call(subnav.querySelectorAll('a[href^="#"]'));
  if (!links.length || !('IntersectionObserver' in window)) return;

  var idToLink = {};
  links.forEach(function (a) {
    var id = a.getAttribute('href').slice(1);
    if (id) idToLink[id] = a;
  });

  var sections = links
    .map(function (a) {
      return document.getElementById(a.getAttribute('href').slice(1));
    })
    .filter(Boolean);

  function setActive(id) {
    links.forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
    });
  }

  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        if (id && idToLink[id]) setActive(id);
      });
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
  );

  sections.forEach(function (el) {
    obs.observe(el);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    var car = document.querySelector('.dm-carousel');
    if (!car || !car.contains(document.activeElement)) return;
    var rail = car.querySelector('.dm-carousel-track');
    if (!rail) return;
    var delta = e.key === 'ArrowLeft' ? -1 : 1;
    rail.scrollBy({ left: delta * Math.max(320, rail.clientWidth * 0.85), behavior: 'smooth' });
  });
})();

(function () {
  'use strict';

  document.querySelectorAll('.dm-carousel').forEach(function (root) {
    var track = root.querySelector('.dm-carousel-track');
    if (!track) return;

    root.querySelectorAll('[data-carousel-dir]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var dir = parseInt(btn.getAttribute('data-carousel-dir'), 10) || 1;
        var delta = dir * Math.max(300, track.clientWidth * 0.82);
        track.scrollBy({ left: delta, behavior: 'smooth' });
      });
    });
  });
})();
