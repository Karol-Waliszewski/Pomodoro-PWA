(function() {

  const startMinutes = 25;
  const startSeconds = 0;

  var timer;

  var $minutes = document.getElementById('minutes');
  var $seconds = document.getElementById('seconds');
  var $start = document.getElementById('start');
  var $stop = document.getElementById('stop');
  var $restart = document.getElementById('restart');

  var countdown = function() {
    let minutes = $minutes.innerHTML;
    let seconds = $seconds.innerHTML;

    if (seconds == 0) {
      $minutes.innerHTML = minutes - 1;
      $seconds.innerHTML = 59;
    } else if (seconds < 60 && seconds > 10) {
      $seconds.innerHTML = seconds - 1;
    } else {
      $seconds.innerHTML = '0' + String(seconds - 1);
    }
  };

  var startTimer = function() {
    if (timer == null) {
      countdown();
      timer = setInterval(countdown, 1000);
    }
  };


  var stopTimer = function() {
    clearInterval(timer);
    timer = null;
  };

  var reset = function() {
    stopTimer();
    $minutes.innerHTML = startMinutes;
    $seconds.innerHTML = (startSeconds > 9) ? startSeconds : '0' + String(startSeconds);
  };

  var init = function() {

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('./js/serviceWorker.js')
        .then(function() {
          console.log('[ServiceWorker] Registered');
        });
    }

    reset();
    $start.addEventListener('click', startTimer);
    $stop.addEventListener('click', stopTimer);
    $restart.addEventListener('click', reset);
  }();

})();
