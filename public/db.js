let db;

const request = window.indexedDB.open("budget", 1);

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore("toAdd", {autoIncrement: true});
}

request.onsuccess = function(event) {
    db = event.target.result;
    if (navigator.onLine) {
        pendingTransactions();
    }
}
