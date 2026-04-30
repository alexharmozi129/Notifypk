importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAwevFjzHgGNCcc_J25lwTEtqBuz5R2lfA",
  authDomain: "notifypk-63d4e.firebaseapp.com",
  projectId: "notifypk-63d4e",
  storageBucket: "notifypk-63d4e.firebasestorage.app",
  messagingSenderId: "709684153833",
  appId: "1:709684153833:web:72c0d9b9108629eb700f78"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || '/icon.png',
    data: { clickUrl: payload.data?.clickUrl || payload.fcmOptions?.link }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const clickUrl = event.notification.data?.clickUrl;
  if (clickUrl) {
    event.waitUntil(clients.openWindow(clickUrl));
  }
});
