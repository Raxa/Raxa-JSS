#!/bin/bash

#this will use SDK Tools 2 to build the app

sencha create jsb -a index.html -p app.jsb3
sencha build -p app.jsb3 -d ./

#this will use Compass to compile SASS into CSS

cd assets/scss

compass compile
