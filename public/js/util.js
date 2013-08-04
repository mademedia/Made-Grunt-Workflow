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
