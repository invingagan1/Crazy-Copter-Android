var utils = {
    createId: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    isMobileDevice: function(){
        return (/Mobi|Android/i.test(navigator.userAgent));
    },
    isNativeApplication: function(){
        //It will check the cordova device ready event. if it exists then then native else browser.
        var eventName = "deviceready";
        var isNative =  false;
        for(item in window.document){
            if(item === 'on'+eventName){
                isNative = true
            }
        }
        return isNative;
    }
}
