#!/usr/bin/env bash

rm -rf builds
mkdir builds
mkdir builds/paperwork-web
# mkdir builds/paperwork-web-lite
mkdir builds/ui-widgets
mkdir builds/ui-widgets-storybook

yarn install
yarn build

cp -r packages/paperwork-web/build/* builds/paperwork-web
cp -r packages/ui-widgets/build/* builds/ui-widgets

# cd packages/paperwork-web && yarn build:lite
# cp -r build/* ../../builds/paperwork-web-lite
cd packages/ui-widgets && yarn build-storybook
cp -r storybook-static/* ../../builds/ui-widgets-storybook