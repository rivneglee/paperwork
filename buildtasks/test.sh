#!/usr/bin/env bash

docker-compose -f buildtasks/docker-compose.yml run --rm --entrypoint "yarn test" webapp-build
