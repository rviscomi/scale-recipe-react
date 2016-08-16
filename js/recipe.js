const React = require('react');
const ReactDOM = require('react-dom');
const Quantity = require('./quantity.js');
const Measurement = require('./measurement.js');

const RECIPES = [{
  id: 'pasta-dough',
  name: 'Pasta Dough',
  serves: 4,
  ingredients: [
    {quantity: '4', unit: 'eggs'},
    {quantity: '4', unit: 'cups', item: 'flour'},
    {quantity: '1/4', unit: 'cup', item: 'olive oil'},
    {quantity: '1', unit: 'tablespoon', item: 'salt'}
  ]
}];

const Recipe = React.createClass({
  statics: {
    /**
     * Calculate a natural amount to step each change in serving size.
     * Equivalent to the largest factor <= the square root of the serving size.
     */
    getStep: (serves) => {
      let sqrt = Math.floor(Math.sqrt(serves));
      while (serves % sqrt) {
        sqrt--;
      }
      return sqrt;
    }
  },
  getInitialState: function() {
    return {
      serves: this.props.serves,
      scale: 1
    };
  },
  onChange: function(e) {
    const serves = Math.floor(Math.abs(e.target.value));
    this.setState({
      serves: serves,
      scale: serves / this.props.serves
    });
  },
  render: function() {
    return (
      <section>
        <h1>{this.props.name}</h1>
        <h2>
          Serves
          <input
            type="number" min="0"
            value={this.state.serves}
            step={Recipe.getStep(this.props.serves)}
            onChange={this.onChange} />
        </h2>
        <Ingredients ingredients={this.props.ingredients} scale={this.state.scale} />
      </section>
    );
  }
});

const Ingredients = React.createClass({
  render: function() {
    return (
      <ul>
        {this.props.ingredients.map((ingredient, i) =>
          <Ingredient key={i} scale={this.props.scale} {...ingredient} />
        )}
      </ul>
    );
  }
});

const Ingredient = React.createClass({
  render: function() {
    const quantity = new Quantity(this.props.quantity).multiply(this.props.scale);
    const unit = this.props.unit;
    const measurement = new Measurement(quantity, unit).convertUnits();
    return(
      <li>{measurement.toString()} {this.props.item}</li>
    );
  }
});

RECIPES.forEach((recipe, i) => {
  ReactDOM.render(
    <Recipe key={recipe.id} index={i} {...recipe}/>,
    document.getElementById(recipe.id));
});

document.querySelector('h2 input').focus();
