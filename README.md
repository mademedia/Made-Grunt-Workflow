# Made Grunt Workflow

Grunt workflow document for Made.

## What is Grunt

Grunt is a command line task runner for automating common tasks (think Rake or Make but . We use it to automate common tasks such as compiling LESS files, checking JavaScript files for errors, running client-side unit tests and concatenating and minifying files for production use. In short, automating all important stuff. The [Grunt website](http://gruntjs.com/) puts it pretty well:

> In one word: automation. The less work you have to do when performing repetitive tasks like minification, compilation, unit testing, linting, etc, the easier your job becomes. After you've configured it, a task runner can do most of that mundane work for you—and your team—with basically zero effort.

## Getting Started

To start using Grunt you need to have the following things installed.

- [Node.js & npm](http://nodejs.org/download/) (npm comes bundled with Node.js),
- [Grunt CLI](http://gruntjs.com/getting-started), requires npm, run `npm install -g grunt-cli`
- (**optional**) [PhantomJS](http://phantomjs.org/) for running JavaScript unit tests.

You only need to follow these steps the first time you use Grunt. Once you've got everything installed, run `npm install` at the root of the project to install the project-specific dependencies. Once all the project-specific dependecies are installed you are good to go.

## Running Tasks

Run `grunt --help` to see a list of available tasks. Each project may have it's own tasks but this documents the tasks we typically have on all projects (the ones in the sample [Gruntfile.js](Gruntfile.js))

### `grunt`

Running `grunt` with no arguments runs the default task, which typically compiles LESS files, runs JSHint (JavaScript code quality check) and builds JavaScript files.

### `grunt watch`

**This is the most useful task, think of it like a built-in CodeKit. Basically, run this in the background and then work as normal**

Running `grunt watch` will watch files for changes and then run relevant tasks when they change. e.g, If a LESS file changes Grunt will automatically compile the LESS files and if a JavaScript file changes it may run it through JSHint or run unit tests depending on the tasks defined in `Gruntfile.js`

### `grunt build`

`grunt build` will typically compile LESS, run JSHint, and build JS files.
`grunt build:js` will run only the JavaScript build tasks
`grunt build:production` will run all build tasks plus will minify JavaScript files for production.

### `grunt less`

Compiles Less.

### `grunt lint`

Runs JS files through JSHint.

## Do I have to use Grunt?

No.

Grunt is the a command line tool, it's really nice and easy to use once you're set up but not everyone is comfortable with the command line.

Some tasks may require Grunt but for common things like compiling LESS files or optimising a few images then using something like [CodeKit](https://incident57.com/codekit/) is good.

