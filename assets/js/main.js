// Hey, nice you are looking at my source code
// so you are interested in my awesome page and coding skills, aren't you?
// I am just messing with you. But so that you know: usually my code is a bit cleaner
// this one is just a quick and fun page - I am not putting much afford in it

window.CLIPPY_CDN = 'assets/js/';

document.addEventListener("DOMContentLoaded", renderPage);

const SPEED        = 50;
const START_CLIPPY = 220;

function renderPage(event) {

  // handle typing text
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

  // handle clippy
  setTimeout(function () {
    clippy.load('Clippy', function (agent) {
      agent.show();
      agent.speak('Hi! I am Clippy. Your web assistant. Would you like some assistance today?');

      setTimeout(function () {
        const $social = $('.social');
        let to        = $social.offset();
        agent.moveTo(to.left, to.top + $social.height());
        agent.gestureAt(to.left + $social.width(), to.top);
      }, (start * SPEED))

      setTimeout(function () {
        agent.animate();
      }, (start * SPEED * 2))
    });
    // For now, start clippy on a specific time. An Event, or smth, would be nice
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
