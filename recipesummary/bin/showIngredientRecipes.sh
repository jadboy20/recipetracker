#!/bin/bash

if [ $# -lt 1 ]; then
    echo "usage: $0 [ingredient_id]"
    exit 1
fi

INGREDIENT_ID="$1"

curl -X GET localhost:8080/recipeingredients/ingredient/${INGREDIENT_ID} -w "\n"
exit 0
