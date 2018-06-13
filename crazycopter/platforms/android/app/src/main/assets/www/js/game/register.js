var CrazyCandy = CrazyCandy || {};
CrazyCandy.Register = function () { }
CrazyCandy.Register.prototype = {
    preload: function () { },
    create: function () {
        var isRegister = true; 
        if(isRegister){
            this.game.state.start('selection');
        }else{
            var name = prompt('Enter your name!!!');
            if(name === ''){
                name = 'Guest-'+ Math.ceil(99999999 * Math.random());;
            }
            CrazyCandy.name = name;
            // Save name to storage
            this.game.state.start('selection') 
        }
    },
    update: function () { }
}