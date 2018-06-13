var fireBase = (function () {
    return {
        database: {
            
        },
        init: init
    };

    function init() {
        var config = {
            apiKey: "AIzaSyDQ_2nhath3NJprpxdiOzd9sW2dY5frEFg",
            authDomain: "copter-169f5.firebaseapp.com",
            databaseURL: "https://copter-169f5.firebaseio.com",
            projectId: "copter-169f5",
            storageBucket: "copter-169f5.appspot.com",
            messagingSenderId: "779700610769"
        };
        firebase.initializeApp(config);
    }
})();