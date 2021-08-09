#!/bin/bash

if [ $# -lt 1 ]; then
    echo "usage: $0 [recipe_id]"
    exit 1
fi

RECIPE_ID=$1

curl -X GET localhost:8080/recipeingredients/recipe/${RECIPE_ID} -w "\n"
echo ""
