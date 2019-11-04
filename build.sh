#!/bin/bash

MODE=${1:-production}
IMAGE=sn_hunter


npm install
npm run build -- --mode $MODE
docker build -t $IMAGE .
