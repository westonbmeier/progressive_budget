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

request.onerror = function(event) {console.log("Error " + event)};

function saveRecord(dataToAdd) {
    const transaction = db.transaction(["toAdd"], "readwrite");
    const store = transaction.objectStore("toAdd");
    store.add(dataToAdd);
}