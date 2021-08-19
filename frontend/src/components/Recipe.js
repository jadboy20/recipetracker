import { Header, Button, List, Popup } from 'semantic-ui-react'
import { render } from 'react-dom';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
            ingredients: []
         };
    }

    componentDidMount() {
        console.log("Recipe...");
        const { id } = this.props.location;
        console.log(id);
        // Lets get the ingredients for this.
        (async () => {
            const response = await fetch('http://192.168.0.83/backend/recipeingredients/recipe/' + id, {method: "GET"});
            const recipeIngredients = await response.json();

            this.setState({recipe: {
                id: recipeIngredients.id,
                name: recipeIngredients.name,
                serves: recipeIngredients.serves
            }, ingredients: recipeIngredients.Ingredients});

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
                <br/>
                <br/>

                <Header as='h2'>Ingredients</Header>
                <div>
                <List bulleted>
                    {ingredients.map((ingredient) =>
                    <Popup position='top left' trigger={
                        <List.Item key={`ingredient-${ingredient.id}`}>
                            <List.Icon/>
                            <List.Content>
                                {ingredient.name} x {ingredient.Recipe_Ingredient.quantity}
                            </List.Content>
                        </List.Item>
                    }>
                        <Popup.Content>Click here to see recipes using {ingredient.name}</Popup.Content>
                    </Popup>
                    )}
                </List>
                </div>
                <br/>
                <br/>
                <Link to='/main'>Back to main page...</Link>
            </div>
        );
    }
}

export default Recipe;