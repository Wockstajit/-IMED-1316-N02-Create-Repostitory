document.addEventListener('DOMContentLoaded', function () {
  var elements = document.querySelectorAll('.animate-on-scroll');

  elements.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.visibility = 'hidden';
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.visibility = 'visible';
          entry.target.classList.add('animate__animated', 'animate__fadeInUp');
          entry.target.classList.remove('animate-on-scroll');

          var onAnimationEnd = function () {
            entry.target.classList.remove('animate__animated', 'animate__fadeInUp');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'none';
            entry.target.style.visibility = 'visible';
            entry.target.removeEventListener('animationend', onAnimationEnd);
          };

          entry.target.addEventListener('animationend', onAnimationEnd);

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3, rootMargin: '0px 0px -20% 0px' });

    elements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    elements.forEach(function (el) {
      el.style.visibility = 'visible';
      el.classList.add('animate__animated', 'animate__fadeInUp');
    });
  }
});

