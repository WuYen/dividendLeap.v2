const publicVapidKey = 'YOUR_PUBLIC_KEY_FROM_ENV'; // Use the public VAPID key

// Register the service worker and subscribe to push notifications
async function subscribeUser() {
  // Register service worker
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/',
  });

  // Subscribe the user to push notifications
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });

  // Send subscription to the server
  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  alert('Subscribed to notifications!');
}

// Utility function to convert VAPID key to Uint8Array format
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

document.getElementById('subscribeButton').addEventListener('click', () => {
  if ('serviceWorker' in navigator) {
    subscribeUser().catch((err) => console.error('Service Worker Error', err));
  } else {
    console.error('Service workers are not supported in this browser.');
  }
});
