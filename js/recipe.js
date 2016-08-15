const React = require('react');
const ReactDOM = require('react-dom');

const RECIPES = [{
  name: 'Pasta Dough',
  serves: 4,
  ingredients: [
    ['4', 'eggs'],
    ['4', 'cups', 'flour'],
    ['1/4', 'cup', 'olive oil'],
    ['1', 'tablespoon', 'salt']
  ]
}];

const Recipes = React.createClass({
  render: function() {
    return (
      <div>
        {RECIPES.map(recipe => <Recipe key={recipe.name} {...recipe}/>)}
      </div>
    );
  }
});

const Recipe = React.createClass({
  getInitialState: function() {
    return {
      serves: this.props.serves,
      ingredients: this.props.ingredients
    };
  },
  onChange: function(e) {
    this.setState({
      serves: e.target.value
    });
  },
  render: function() {
    return (
      <section>
        <h1>
          {this.props.name}
          <input
            type="number" min="0"
            value={this.state.serves}
            step={this.props.serves/4}
            onChange={this.onChange} />
        </h1>
        <Ingredients ingredients={this.state.ingredients} />
      </section>
    );
  }
});

const Ingredients = React.createClass({
  render: function() {
    return (
      <ul>
        {this.props.ingredients.map(([quantity, unit, item]) =>
          <Ingredient
            key={`${quantity} ${unit} ${item}`}
            quantity={quantity} unit={unit} item={item} />
        )}
      </ul>
    );
  }
});

const Ingredient = React.createClass({
  render: function() {
    return(
      <li>{this.props.quantity} {this.props.unit} {this.props.item}</li>
    );
  }
});

ReactDOM.render(
  <Recipes/>,
  document.getElementById('recipes')
);
