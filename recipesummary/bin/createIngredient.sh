#!/bin/bash

if [ $# -lt 1 ]; then
    echo "usage: $0 [name]"
    exit 1
fi

NAME="$1"

curl -X PUT -w "\n" "localhost:8080/ingredients" \
-d "name=${NAME}"

exit 0

