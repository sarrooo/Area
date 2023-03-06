#!/bin/sh

echo "Copying certs"

mkdir ./certs

cp /etc/letsencrypt/live/trirea-epitech.store/chain.pem ./certs/chain.pem
cp /etc/letsencrypt/live/trirea-epitech.store/privkey.pem ./certs/privkey.pem
cp /etc/letsencrypt/live/trirea-epitech.store/cert.pem ./certs/cert.pem

echo "Done"