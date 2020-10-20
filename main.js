let capturedInstallEvent;
const myInstallBtn = document.querySelector('.my-install-btn');
const myNotifBtn = document.querySelector('.my-notif-btn');


window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  myInstallBtn.hidden = true;
  capturedInstallEvent = event;
});


myInstallBtn.addEventListener('click', (event) => {
  capturedInstallEvent.prompt();

  capturedInstallEvent.userChoice.then((choice) => {
    // accepted or rejected
    console.log(choice);
  })
});



if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      // console.log('ServiceWorker registration failed: ', err);
    });
  });
}


const urlUserData = 'https://api.github.com/users/ankushdharkar';

fetch(urlUserData)
  .then(data => data.json())
  .then(data => {
    const nameText = document.createTextNode(data.name);
    document.querySelector('.name').append(nameText);
  });



Notification.requestPermission(status => {
  console.log(status);
});



const notifMsg = 'RDS: New User';
const notifOptions = {
  body: 'Squad Size ++',
  icon: 'images/logo.png',
  vibrate: [200, 100, 200, 50, 300],
  data: {
    primaryKey: 17
  }
};

function displayNotification() {
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.getRegistration()
      .then(reg => {
        reg.showNotification(notifMsg, notifOptions);
      })
  }
}


myNotifBtn.addEventListener('click', () => {
  displayNotification();
});

