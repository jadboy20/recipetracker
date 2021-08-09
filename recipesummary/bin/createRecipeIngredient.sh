#!/bin/bash

#curl -X POST localhost:8080/recipeingredients/1 -w "\n" \
#-d "quantity=5&ingredientId=1"
if [ $# -lt 3 ]; then
    echo "usage: $0 [recipe_id] [ingredient_id] [quantity]"
    exit 1
fi

RECIPE_ID="$1"
INGREDIENT_ID="$2"
QUANTITY="$3"

curl -X POST localhost:8080/recipeingredients/recipe/${RECIPE_ID} -w "\n" \
-d "ingredientId=${INGREDIENT_ID}&quantity=${QUANTITY}"

exit 0