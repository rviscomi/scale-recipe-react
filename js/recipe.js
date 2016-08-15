const React = require('react');
const ReactDOM = require('react-dom');

const RECIPES = [{
  id: 'pasta-dough',
  name: 'Pasta Dough',
  serves: 4,
  ingredients: [
    {quantity: '4', unit: 'eggs'},
    {quantity: '4', unit: 'cups', item: 'flour'},
    {quantity: '0.25', unit: 'cup', item: 'olive oil'},
    {quantity: '1', unit: 'tablespoon', item: 'salt'}
  ]
}];

const cloneObject = o => JSON.parse(JSON.stringify(o));

const Recipe = React.createClass({
  getInitialState: function() {
    return {
      serves: this.props.serves,
      scale: 1
    };
  },
  onChange: function(e) {
    const serves = Math.abs(e.target.value);
    this.setState({
      serves: serves,
      scale: serves / this.props.serves
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
    return(
      <li>{this.props.quantity * this.props.scale} {this.props.unit} {this.props.item}</li>
    );
  }
});

RECIPES.forEach((recipe, i) => {
  ReactDOM.render(
    <Recipe key={recipe.id} index={i} {...recipe}/>,
    document.getElementById(recipe.id));
});
