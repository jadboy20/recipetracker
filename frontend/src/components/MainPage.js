import { Header, Input, List } from 'semantic-ui-react'
import { render } from 'react-dom';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BACKEND_HOST } from '../common';


class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = { recipes: [], errors: null, ingredientsWithRecipes: [] };
    }

    componentDidMount() {
        console.log("Main page");

        // When we enter this page, lets get the latest information.
        (async () => {
            // get the latest recipes.
            const response = await fetch(`${BACKEND_HOST}/recipes/all`, { method: "GET" });
            const recipes = await response.json();

            if (recipes) {
                console.log(recipes);
                this.setState({ recipes: recipes, error: null });
            }
        })();

    }

    componentWillUnmount() {
        console.log("Leaving Main page");
    }

    render() {
        return (
            <div>
                <Header>Recipes</Header>
                <Input size="small" onChange={(event, data) => {
                    // Each time the user enters a letter, it should do a
                    // search on the ingredient.
                    // If there aren't any characters, then we should leave the
                    // results empty.
                    (async () => {
                        const searchTerm = data.value;
                        if (searchTerm.trim().length === 0) {
                            this.setState({ ...this.state, ingredientsWithRecipes: [] });
                            return;
                        }
                        const response = await fetch(
                            `${BACKEND_HOST}/recipeingredients/ingredient/name/${searchTerm}`,
                            { method: "GET" });
                        const ingredientsWithRecipes = await response.json();
                        this.setState({ ...this.state, ingredientsWithRecipes });
                        console.log(ingredientsWithRecipes);

                    })();
                }}></Input>
                <div>
                    <List bulleted>

                        {
                            this.state.ingredientsWithRecipes.map(
                                ingredient => (
                                    <List.Item key={`ingredient-${ingredient.id}`}>
                                        {ingredient.name}
                                        <List.List>
                                            {
                                                ingredient.Recipes.map(
                                                    recipe => (
                                                        <List.Item key={`recipe-${recipe.id}`}>
                                                            <Link to={{
                                                                pathname: "/recipe",
                                                                id: recipe.id
                                                            }}>
                                                                {recipe.name}
                                                            </Link>
                                                        </List.Item>
                                                    )
                                                )
                                            }
                                        </List.List>
                                    </List.Item>
                                ))
                        }
                    </List>

                </div>

                <List>
                    <List.Item><Link to="/">Back home...</Link></List.Item>
                    <List.Item><Link to="/recipeform">Recipe Form</Link></List.Item>
                </List>
            </div>
        );
    }
}

export default MainPage;