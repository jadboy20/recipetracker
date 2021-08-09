#!/bin/bash

if [ $# -lt 3 ]; then
    echo "usage: $0 [name] [author] [serves]"
    exit 1
fi

NAME=$1
AUTHOR=$2
SERVES=$3

curl -v "http://localhost:8080/recipes/" -X POST  \
-d "name=${NAME}&author=${AUTHOR}&serves=${SERVES}"

# curl localhost:8080/recipes/all -w "\n" -X GET --verbose

echo ""
exit 0