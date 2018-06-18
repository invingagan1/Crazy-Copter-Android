var loginEnum = {
    'connected': "connected",
    'not_authorized': "not_authorized",
    'unknown': "unknown"
}
var facebookHandler = {

    loginStatus: loginEnum.unknown,
    authResponse: null,
    userInfo: null,
    config: {
        appId: 177634852909478,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v3.0'
    },

    init: function () {
        FB.init(this.config);
    },

    isLoggedIn: function () {
        var that = this;
        return new Promise(function (resolve, reject) {
            FB.getLoginStatus(function (response) {
                if (response.status === loginEnum.connected) {

                    that.loginStatus = loginEnum.connected;
                    that.authResponse = response.authResponse;

                } else if (response.status === loginEnum.not_authorized) {
                    that.loginStatus = loginEnum.not_authorized;
                } else {
                    that.loginStatus = loginEnum.unknown;
                }
                resolve(that.loginStatus);
            });
        });
    },
    login: function () {
        var that = this;
        return new Promise(function (resolve, reject) {
            FB.login(function (response) {
                if (response.status === loginEnum.connected) {

                    that.loginStatus = loginEnum.connected;
                    that.authResponse = response.authResponse;

                } else if (response.status === loginEnum.not_authorized) {
                    that.loginStatus = loginEnum.not_authorized;
                } else {
                    that.loginStatus = loginEnum.unknown;
                }
                resolve(that.loginStatus);
            }, {});
        });
    },
    getUserInfo: function () {
        var that = this;
        return new Promise(function (resolve, reject) {
            if (that.loginStatus !== loginEnum.connected) {
                reject('Not authenticated');
            } else {
                if (that.userInfo === null) {
                    FB.api('/me', function (response) {
                        console.log(response);
                    });
                }
                resolve(that.userInfo);
            }

        });
    }
};

var testFacebookHandler = {
    start: function () {
        facebookHandler.init();
        // this.testIsLoggedIn();
        // this.testLogin();
        this.testUserInfo();
    },

    testIsLoggedIn: function () {
        facebookHandler.isLoggedIn().then(console.log).catch(console.error);
    },

    testLogin: function () {
        facebookHandler.login().then(console.log).catch(console.error);
    },
    testUserInfo: function () {
        facebookHandler.isLoggedIn().then(function (status) {
            if (loginEnum.connected === status) {
                facebookHandler.getUserInfo().then(console.log).catch(console.error);
            }
        }).catch(console.error);
        // facebookHandler.getUserInfo().then(console.log).catch(console.error);
    }
};
window.onload = testFacebookHandler.start();