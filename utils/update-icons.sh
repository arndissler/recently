#!/bin/bash

cat src/icons/recently-icon.svg | sed "s/#000000/#2a2a2e/g" | sed "s/stroke-opacity:1/stroke-opacity:0.8/g" > src/icons/recently-icon--dark.svg
cat src/icons/recently-icon.svg | sed "s/#000000/#f9f9fa/g" | sed "s/stroke-opacity:1/stroke-opacity:0.8/g" > src/icons/recently-icon--light.svg