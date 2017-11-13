import React, { Component } from 'react';
import './App.css';
import Accordion from 'react-bootstrap/lib/Accordion'
import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import Modal from 'react-bootstrap/lib/Modal'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'

class App extends Component {

    state = {
        recipes: [],
        showAdd: false,
        showEdit: false,
        currentIndex: 0,
        newestRecipe: { recipeName: "", ingredients: [] }
    }
    //Delete a recipe
    deleteRecipe(index) {
        let recipes = this.state.recipes.slice();
        recipes.splice(index, 1);
        localStorage.setItem('recipes',JSON.stringify(recipes));
        this.setState({ recipes });
    }
    //Update newestRecipe
    updateNewRecipe(recipeName, ingredients) {
        this.setState({ newestRecipe: { recipeName: recipeName, ingredients: ingredients } });
    }
    //Save a new recipe to recipes
    saveNewRecipe() {
        let recipes = this.state.recipes.slice();
        recipes.push({ recipeName: this.state.newestRecipe.recipeName, ingredients: this.state.newestRecipe.ingredients });
        localStorage.setItem('recipes',JSON.stringify(recipes));
        this.setState({ recipes });
        this.setState({ newestRecipe: { recipeName: '', ingredients: [] } });
        this.close();
    }
    //Closes a modal
    close = () => {
        if (this.state.showAdd) {
            this.setState({ showAdd: false });
        }
        if (this.state.showEdit) {
            this.setState({ showEdit: false });
        }
    }

    //Open a modal
    open = (state, currentIndex) => {
        this.setState({ [state]: true });
        this.setState({ currentIndex });
    }
    //Update recipeName of a recipe
    updateRecipeName(recipeName, currentIndex) {
        let recipes = this.recipes.slice();
        recipes[currentIndex] = { recipeName: recipeName, ingredients: recipes[currentIndex].ingredients };
        localStorage.setItem('recipes',JSON.stringify(recipes));
        this.setState({ recipes });
    }
    //Update ingredients of a recipe
    updateIngredients(ingredients, currentIndex) {
        let recipes = this.state.recipes.slice();
        recipes[currentIndex] = { recipeName: recipes[currentIndex].recipeName, ingredients: ingredients };
        localStorage.setItem("recipes",JSON.stringify(recipes));
        this.setState({ recipes });
    
    }
    componentDitMount() {
        let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        this.setState({ recipes });

    }


    render() {
        const { recipes, newestRecipe, currentIndex } = this.state;
        console.log(recipes);
        return (
            <div className="App container">
                {recipes.length>0 && (
                    <div>
                    <Accordion>
                        {recipes.map((recipe, index) => (
                            <Panel header={recipe.recipeName} eventkey={index} key={index}>
                                <o1>
                                    {recipe.ingredients.map((item) => (
                                        <li key={item}> {item} </li>
                                    ))}
                                </o1>
                                <ButtonToolbar>
                                    <Button bsStyle="danger" onClick={(event) => this.deleteRecipe(index)}>Delete Recipe</Button>
                                    <Button bsStyle="default" onClick={(event) => this.open("showEdit", index)}>Edit Recipe</Button>
                                </ButtonToolbar>
                            </Panel>

                        ))}
                    </Accordion>

                    <Modal show={this.state.showEdit} onHide={this.close}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Recipe</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <FormGroup controlId="formBasicTest">
                                <ControlLabel>Recipe Name</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={recipes[currentIndex].recipeName}
                                    placeholder="Enter text"
                                    onChange={(event) => this.updateRecipeName(event.target.value, currentIndex)}
                                />
                            </FormGroup>

                            <FormGroup controlId="formControlsTextarea">
                                <ControlLabel>Ingredients</ControlLabel>
                                <FormControl
                                    componentClass="textarea"
                                    onChange={(event) => this.updateIngredients(event.target.value.split(","), currentIndex)}
                                    placeholder="Enter Ingredients (Seperate By Commas)" value={recipes[currentIndex].ingredients}>
                                </FormControl>
                            </FormGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.close}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                )}



                <Modal show={this.state.showAdd} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Recipe</Modal.Title>
                        <Modal.Body>
                            <FormGroup controlId="formBasicTest">
                                <ControlLabel>Recipe Name</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={newestRecipe.recipeName}
                                    placeholder="Enter Recipe Name"
                                    onChange={(event) => this.updateNewRecipe(event.target.value, newestRecipe.ingredients)}
                                ></FormControl>
                                <FormGroup controlId="formControlsTestarea">
                                    <ControlLabel>Recipe Name</ControlLabel>
                                    <FormControl
                                        type="textarea"
                                        value={newestRecipe.recipeName}
                                        placeholder="Enter Ingredients (Seperate By Commas)"
                                        onChange={(event) => this.updateNewRecipe(newestRecipe.recipeName, event.target.value.split(","))}
                                        value={newestRecipe.ingredients}
                                    ></FormControl>
                                </FormGroup>
                            </FormGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={(event) => this.saveNewRecipe()}>Save New Recipe</Button>
                        </Modal.Footer>
                    </Modal.Header>
                </Modal>


                <Button bsStyle="primary" onClick={(event) => this.open("showAdd", currentIndex)}>Add Recipe</Button>
            </div>
        );
    }
}

export default App;
