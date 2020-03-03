#!/usr/bin/env bash

rm -rf builds
docker-compose -f buildtasks/docker-compose.yml build
