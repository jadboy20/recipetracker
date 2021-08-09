#!/bin/bash

if [ $# -lt 1 ]; then
    echo "usage: $0 [recipe_id]"
    exit 1
fi

RECIPE_ID="$1"

curl -X DELETE localhost:8080/recipes/${RECIPE_ID} -w "\n"
