var Admob = function () {
    if (/(android)/i.test(navigator.userAgent)) { // for android & amazon-fireos
        admobid = {
            banner: 'ca-app-pub-xxx/xxx', // or DFP format "/6253334/dfp_example_ad"
            interstitial: 'ca-app-pub-xxx/yyy'
        };
    }
    return {

    }
}