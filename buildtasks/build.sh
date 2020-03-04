#!/usr/bin/env bash

rm -rf builds
mkdir builds
mkdir builds/paperwork-web

yarn install
yarn build

cp -r packages/paperwork-web/build/* builds/paperwork-web
