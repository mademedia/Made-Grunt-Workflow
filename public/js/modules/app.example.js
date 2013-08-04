var App = App || {};
(function( $, window, undefined ){

    App.example = (function() {

        var selector = '.example',
            $elem = $( selector );

        var run = function(){
            return ( $elem.length) ? true : false;
        };

        var init = function() {

            console.log( $elem );

        };

        return {
            init: init,
            run: run
        };

    }());

}( jQuery, window ));
