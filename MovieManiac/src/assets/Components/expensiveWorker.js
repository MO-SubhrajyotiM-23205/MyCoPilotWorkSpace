// Web Worker for expensive calculation
self.onmessage = function(e) {
    // Simulate expensive calculation
    let result = 0;
    console.log("Worker received data:", e.data);
    for(let i = 0; i < e.data; i++) {
        result += result + 1;
    }
    self.postMessage(result);
};
