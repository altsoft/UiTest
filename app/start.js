/**
 * Do not edit this file manually, it will be overwritten by
 * Platypus Application Designer.
 */
// this === global
(function () {
    function ready() {
        P.require(['temp'], function(){
            var m = new temp();
            m.show();
        }, function(e){
            P.Logger.severe(e);
        });
    }
    if(!this.P) {
        this.P = {};
        P.ready = ready;
    } else {
        ready();
    }
})();
