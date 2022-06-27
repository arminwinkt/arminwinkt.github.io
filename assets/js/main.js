window.CLIPPY_CDN = 'assets/js/';

document.addEventListener("DOMContentLoaded", renderPage);

const SPEED        = 50;
const START_CLIPPY = 220;

function renderPage(event) {
  let start   = 0;
  const typos = document.getElementsByClassName("typo");

  for (let i = 0; i < typos.length; i++) {
    if (typos[i - 1]) {
      start += typos[i - 1].innerHTML.length;
    }

    setTimeout(function () {
      typo(typos[i]);
    }, (start * SPEED));
  }


  setTimeout(function () {
    clippy.load('Clippy', function (agent) {
      agent.show();
      agent.speak('Hi! I am Clippy. Your web assistant. Would you like some assistance today?.');

      setTimeout(function () {
        const $social = $('.social');
        let to        = $social.offset();
        agent.moveTo(to.left, to.top + $social.height());
        agent.gestureAt(200, 200);
      }, (start * SPEED))

      setTimeout(function () {
        agent.animate();
      }, (start * SPEED * 2))
    });
  }, (START_CLIPPY * SPEED));
}

function typo(element) {
  const length = element.innerHTML.length;

  if (length <= 0) {
    return;
  }

  const text        = element.innerHTML;
  element.innerHTML = '';
  element.classList.add("go");

  for (let i = 0; i < length; i++) {
    setTimeout(function () {
      element.innerHTML += text[i];
    }, SPEED * i);
  }
}
