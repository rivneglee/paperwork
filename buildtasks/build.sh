#!/usr/bin/env bash

rm -rf builds
mkdir builds
mkdir builds/paperwork-web
mkdir builds/paperwork-web-lite

yarn install
yarn build

cp -r packages/paperwork-web/build/* builds/paperwork-web

cd packages/paperwork-web && yarn build:lite
cp -r build/* ../../builds/paperwork-web-lite
