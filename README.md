# TypeScript 2.0 boilerplate w/ Dojo 2 and Intern

This is a boilerplate for developing an application with a little help from 
[Dojo 2](http://dojotoolkit.org/community/roadmap/) and [Intern](http://theintern.github.io/)

We hope this is a useful starting place to begin your project <3.

## Quick Start

* `npm install`
* `typings install`
* `grunt`
* launch http://localhost/_build/index.html

## Publish to GitHub Pages

This boilerplate supports publishing to a GitHub Pages website. Simply type:

`grunt publish`

Your entire project will be built, all of the libs copied to the `dist` directory, and the `dist` directory
will be checked into the `gh-pages` to be hosted by GitHub. 

## Grunt Commands

* `grunt` - compiles files
* `grunt watch` - watches files for changes and rebuilds
* `grunt lint` - validates style rules
* `grunt test` - runs intern's node client
* `grunt test-local` - runs intern's runner with local configuration
* `grunt test-proxy` - starts intern's testing proxy
* `grunt test-runner` - runs intern's runner
* `grunt ci` - runs tests in a continuous integration environment
* `grunt clean` - cleans development work
* `grunt dist` - builds a distribution ready to be published
* `grunt publish` - builds a dist and publishes it to Github Pages
