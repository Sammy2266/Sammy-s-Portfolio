// Disable Right Click
document.addEventListener("contextmenu", event => event.preventDefault());

// Block Common DevTools Shortcuts
document.addEventListener("keydown", function (event) {
    if (event.key === "F12" || 
        (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J")) || 
        (event.ctrlKey && event.key === "U")) {
        event.preventDefault();
    }
});

// Hide Console Output
(function () {
    let originalConsole = console;
    Object.defineProperty(window, "console", {
        get: function () {
            return originalConsole;
        },
        set: function () {
            throw new Error("Access denied");
        }
    });

    // Block Console Log
    console.log = console.warn = console.error = function () {
        location.reload(); // Reload page when console is accessed
    };
})();

// Detect Developer Tools and Redirect Back
(function () {
    let devtools = { open: false };
    const threshold = 160;

    function detectDevTools() {
        let widthThreshold = window.outerWidth - window.innerWidth > threshold;
        let heightThreshold = window.outerHeight - window.innerHeight > threshold;

        if ((widthThreshold || heightThreshold) && !devtools.open) {
            devtools.open = true;

            // Redirect to a blank page then bring back
            window.location.replace("about:blank");
            setTimeout(() => {
                window.location.href = window.location.origin + window.location.pathname;
            }, 1000); // Delay to make it less obvious
        } else if (!widthThreshold && !heightThreshold && devtools.open) {
            devtools.open = false;
        }
    }

    setInterval(detectDevTools, 1000);
})();
