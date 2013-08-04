/*! Grunt Workflow - Made Media Ltd. - Built 2013-08-04 */
(function(){

    var Util = (function(){

        /**
         * Determines if a given module can run
         *
         * If the module has and `init` method and a `run` expression which returns true
         * then the init() method will be called.
         *
         * @param  {String} module Name of module withing the App namespace
         */
        var canRun = function( module ) {

           return (App[ module ].init !== undefined && (typeof App[ module ].init) === 'function') &&
                   ((typeof App[ module ].run) === 'function' && App[ module ].run() === true ||
                   (typeof App[ module ].run) === 'boolean' && App[ module ].run === true);

        };

        /**
         * Determines if it's safe to use console.log for debug logging
         */
        var canLog = function() {
            return (App.config.dev === true && typeof(console) !== 'undefined');
        };

        /**
         * Will log any arguments (arrays, objects, strings etc.) to the console if it exists.
         * Only logs to console if App.config.dev is set to true
         */
        var log = function() {
            if ( canLog() === true ) {
                console.log( Array.prototype.join.call(arguments, ' ') );
            }
        };

        return {
            canRun: canRun,
            canLog: canLog,
            log: log
        };

    }());

    /**
     * Expose our global object
     */
    window.Util = Util;

}());
;var App = App || {};
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
;// Setup our global Application object
window.App = App || {};
(function( $, window ){

    /**
     * Application configuration settings
     */
    App.config = {

        /**
         * If enabled, any development features will be enabled.
         * e.g, App.util.log will output useful debug information to the console.
         * @type {Boolean}
         */
        dev: true,

        /**
         * To load a module add its name to this array, e.g., App.example should be listed as just 'example'
         * The modules init() method will be called, in the order listed here, on document ready.
         * @type {Array}
         */
        runList: [
            'example'
        ]

    };

}( jQuery, window, undefined ));

$(function() {

    var runList = App.config.runList;

    /**
     * Loop through all the modules in the runList
     * check if the init() method exists and is a function and `run` is true
     */
    for ( var i = 0; i < runList.length; i++ ) {

        if ( Util.canRun( runList[i] ) ) {

            // Run the module
            App[ runList[i] ].init();

            // Output some debug logs if enabled
            if ( Util.canLog() === true ) {
                if (i === 0) { console.groupCollapsed("[App]"); }
                Util.log("Initialising App." + runList[i]);
                if (i === runList.length -1) { console.groupEnd(); }
            }

        }

    }

});
