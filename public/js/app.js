// Setup our global Application object
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
