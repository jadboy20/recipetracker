import { Header, List, Popup, Dropdown } from 'semantic-ui-react'
import { render } from 'react-dom';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BACKEND_HOST } from '../common'

/**
 * We can pass props: id, and
 */
class Recipe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recipe: {
                name: 'Getting name...',
                id: 'Getting id',
                serves: 'Getting serving size'
            },
            ingredients: [],
            ingredientSearchTerm: '',
            foundIngredients: [
                {name: 'hello'}
            ]
        };
    }

    componentDidMount() {
        console.log("Recipe...");
        const { id } = this.props.location;
        console.log(id);
        // Lets get the ingredients for this.
        (async () => {
            const response = await fetch(`${BACKEND_HOST}/recipeingredients/recipe/${id}`, { method: "GET" });
            const recipeIngredients = await response.json();

            this.setState({
                recipe: {
                    id: recipeIngredients.id,
                    name: recipeIngredients.name,
                    serves: recipeIngredients.serves
                }, ingredients: recipeIngredients.Ingredients
            });

        })();

    }

    componentWillUnmount() {

    }

    render() {
        const recipe = this.state.recipe;
        const ingredients = this.state.ingredients || [];
        console.log(ingredients);
        return (

            <div>
                <Header as='h1'>{recipe.name}</Header>
                <table>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <td>{recipe.id}</td>
                        </tr>

                        <tr>
                            <th>Author</th>
                            <td>{recipe.author}</td>
                        </tr>

                        <tr>
                            <th>Serves</th>
                            <td>{recipe.serves}</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <br />

                <Header as='h2'>Ingredients</Header>
                <div>
                    <List bulleted>
                        {ingredients.map((ingredient) =>
                            <Popup position='top left' trigger={
                                <List.Item key={`ingredient-${ingredient.id}`}>
                                    <List.Content>
                                        {ingredient.name} x {ingredient.Recipe_Ingredient.quantity}
                                    </List.Content>
                                </List.Item>
                            }>
                                <Popup.Content>Click here to see recipes using {ingredient.name}</Popup.Content>
                            </Popup>
                        )}
                    </List>

                    <Dropdown
                        options={this.state.foundIngredients}
                        search
                        selection
                        placeholder='Add ingredient...'
                        allowAdditions
                        inline
                        onAddItem={(e, {value}) => {
                            console.log(`I added ${value}`);
                        }}
                        onChange={(e, {value, name}) => {
                            const selectedIngredientId = value;
                            const thisRecipeId = this.state.recipe.id;
                            // If this was selected, then we know that
                            // the ingredient already exists.
                            (async (selectedIngredientId) => {
                                console.log(`Adding ingredient id: ${selectedIngredientId}`);

                                // Here we make communication with the server.
                                var formData = new URLSearchParams();
                                    formData.append('ingredientId', selectedIngredientId);

                                const response = await fetch(`${BACKEND_HOST}/recipeingredients/recipe/${thisRecipeId}`, {
                                    method: "POST",
                                    body: formData
                                });

                                const result = await response.json();

                                console.log(result);

                            })(selectedIngredientId);

                        }}
                        onSearchChange={(e, { value }) => {
                            const searchTerm = e.target.value;
                            console.log(searchTerm);
                            (async () => {
                                if (!searchTerm) {
                                    // There is no search, then we clear the options.
                                    this.setState({
                                        ...this.state,
                                        foundIngredients: []
                                    })
                                    return;
                                }
                                const response = await fetch(`${BACKEND_HOST}/ingredients/name/${searchTerm}`, {
                                    method: 'GET'
                                });

                                const ingredients = await response.json();

                                // Map to object.
                                let objectIngredients = {};
                                this.state.ingredients.forEach((ingredient) => {
                                    objectIngredients[ingredient.id] = {
                                        name: ingredient.name,
                                        createdAt: ingredient.createdAt
                                    };
                                });

                                const filteredIngredients = ingredients.filter((ingredient) => {
                                    if (objectIngredients[ingredient.id]) {
                                        return false;
                                    }
                                    return true;
                                })
                                .map((ingredient) => ({
                                    key: ingredient.id,
                                    text: ingredient.name,
                                    value: ingredient.id
                                }));

                                this.setState({
                                    ...this.state,
                                    foundIngredients: filteredIngredients
                                });
                            })();
                        }}
                    />
                </div>
                <br />
                <br />
                {/*
                    Here we want to give the user some input to add a recipe.
                    While they are entering it, it will give them suggestions to
                    ingredients that already exist.
                */}

                <br/>
                <Link to='/main'>Back to main page...</Link>
            </div>
        );
    }
}

export default Recipe;