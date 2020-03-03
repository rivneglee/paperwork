#!/usr/bin/env bash

docker-compose -f buildtasks/docker-compose.yml run --rm --entrypoint "yarn lint" webapp-build
