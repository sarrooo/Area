#!/bin/sh
rm -rf ./server/prisma/migrations
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker image rmi $(docker images -a -q)
docker volume rm $(docker volume ls -q)