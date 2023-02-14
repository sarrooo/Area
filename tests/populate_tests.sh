#!/bin/sh
cd ../server
nvm use
npm i
npm run seed
echo 'Done populating tests'