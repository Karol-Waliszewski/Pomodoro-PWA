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

    if (seconds == 0 && minutes == 0) {
      countdownFinished();
      return true;
    }

    if (seconds == 0) {
      $minutes.innerHTML = minutes - 1;
      $seconds.innerHTML = 59;
    } else if (seconds < 60 && seconds > 10) {
      $seconds.innerHTML = seconds - 1;
    } else {
      $seconds.innerHTML = '0' + String(seconds - 1);
    }
  };

  var countdownFinished = function() {
    alert('Finished!')
    stopTimer();
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
    $seconds.innerHTML = (startSeconds > 9)
      ? startSeconds
      : '0' + String(startSeconds);
  };

  var init = function() {

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./serviceWorker.js').then(function() {
        console.log('[ServiceWorker] Registered');
      });
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      // Show the prompt
      e.prompt();
      // Wait for the user to respond to the prompt
      e.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
      });
    });

    window.addEventListener('appinstalled', (evt) => {
      app.logEvent('a2hs', 'installed');
    });

    window.addEventListener('offline', function() {
      alert('Offline')
    });

    window.addEventListener('online', function() {
      alert('Online')
    });

    reset();
    $start.addEventListener('click', startTimer);
    $stop.addEventListener('click', stopTimer);
    $restart.addEventListener('click', reset);
  }();

})();
