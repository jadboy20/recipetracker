import { Header, Button, Form } from 'semantic-ui-react'
import { render } from 'react-dom';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { isStandardString, BACKEND_HOST } from '../common';

/**
 * We can pass props: id, and
 */
class RecipeForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            author: "",
            serves: "",
            showNameError: false,
            showAuthorError: false,
            showServesError: false
        };

        this.submitButtonClicked = this.submitButtonClicked.bind(this);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    handleNameChange(event) {
        console.log(event.target.value);
        const capturedName = event.target.value;
        this.setState({...this.state, name: capturedName})
    }
    submitButtonClicked() {
        // Lets validate form first.
        if (!isStandardString(this.state.name)) {
            alert("Must have a name");
            return;
        }

        if (!isStandardString(this.state.author)) {
            alert("Must have an author");
            return;
        }

        if (!isStandardString(this.state.serves)) {
            alert("Must have a serving size. How many people does it serve?");
            return;
        }

        console.log(`Submitting name: ${this.state.name}, author: ${this.state.author}, serving size: ${this.state.serves}`);

        (async function (name, author, serves) {
            // Here we make communication with the server.
            var formData = new URLSearchParams();
            formData.append('name', name);
            formData.append('author', author);
            formData.append('serves', serves);

            const response = await fetch(`${BACKEND_HOST}/recipes/`,
            {
                method: "POST",
                body: formData
            });
            const content = await response.json();
            console.log(content);
        })(this.state.name, this.state.author, this.state.serves);
    }

    render() {
        return (
            <div>
                <Header>Enter New Recipe</Header>

                <Form>
                    <Form.Field>
                        <label>Name</label>
                        <input value={this.state.name}
                            onChange={ (data) => {
                                    const value = data.target.value;
                                    //this.setState({...this.state,
                                      //  name: data.value})
                                    this.setState({...this.state, name: value});

                            }}
                            name='name'
                            placeholder="Recipe name..."/>
                    </Form.Field>

                    <Form.Field>
                        <label>Author</label>
                        <input
                            name='author'
                            placeholder="Author of recipe..."
                            onChange={ (data) => {
                                this.setState({...this.state, author: data.target.value});
                            }}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Serves</label>
                        <input
                            name='serves'
                            value={this.state.serves}
                            placeholder="Number of people this serves..."
                            onChange={ (data) => {
                                if (!isNaN(data.target.value)) {
                                    this.setState({...this.state, serves: data.target.value})
                                }
                            }}
                        />
                    </Form.Field>

                    <Button onClick={this.submitButtonClicked} type='submit'>Add Recipe</Button>
                </Form>

                <br/>
                <Link to="/main">Go back to recipe ingredients...</Link>
            </div>

        );
    }
}

export default RecipeForm;
