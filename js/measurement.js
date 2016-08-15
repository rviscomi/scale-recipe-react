const Quantity = require('./quantity.js');

class Measurement {
  /**
   * Creates a Measurement object from a quantity and unit.
   * @constructor
   * @param {!Quantity} quantity
   * @param {string} unit
   */
  constructor(quantity, unit) {
    this.quantity = quantity;
    // Chop off trailing 's' char.
    // If needed, it is added back later when pluralizing.
    this.unit = unit.replace(/s$/, '');
  };

  /**
   * Determines whether the unit should be singular.
   * @this {!Measurement}
   * @return {boolean}
   */
  isSingular() {
    return this.quantity > 0 && this.quantity <= 1;
  };

  /**
   * Pluralizes the unit if necessary.
   * @this {!Measurement}
   * @return {string}
   */
  pluralize() {
    if (this.isSingular()) {
      return this.unit;
    }
    else {
      return this.unit + 's';
    }
  };

  /**
   * Converts the unit to singular if necessary.
   * @this {!Measurement}
   * @return {string}
   */
  getSingularUnit() {
    if (this.isSingular()) {
      return this.unit;
    }
    else {
      return this.unit.replace(/s$/, '');
    }
  };

  /**
   * Readable measurement.
   * @this {!Measurement}
   * @return {string}
   */
  toString() {
    return this.quantity.toString() + ' ' + this.pluralize();
  };

  /**
   * Changes the units up/down if necessary.
   * For example, 1/8 of a cup is converted to 2 tablespoons.
   * @this {!Measurement}
   * @return {!Measurement}
   */
  convertUnits() {
    var conversion = Measurement.CONVERSIONS_[this.unit] || {};
    if (conversion.min && this.quantity < conversion.min.value) {
      this.unit = conversion.min.next;
      this.quantity.multiply(conversion.to[this.unit]);
    }
    else if (conversion.max && this.quantity >= conversion.max.value) {
      this.unit = conversion.max.next;
      this.quantity.multiply(conversion.to[this.unit]);
    }
    return this;
  };
}

/**
 * Names of measurement units.
 * @private @enum {string}
 */
Measurement.Units_ = {
  TEASPOON: 'teaspoon',
  TABLESPOON: 'tablespoon',
  CUP: 'cup'
};

/**
 * Map of units to their next up/down conversions.
 * Sets breakpoints at which to convert into the other unit.
 * @private {!Object}
 */
Measurement.CONVERSIONS_ = {
  cup: {
    to: {
      tablespoon: 16
    },
    min: {
      value: 1/4,
      next: Measurement.Units_.TABLESPOON
    }
  },
  tablespoon: {
    to: {
      teaspoon: 3,
      cup: 1/16
    },
    min: {
      value: 1,
      next: Measurement.Units_.TEASPOON
    },
    max: {
      value: 4,
      next: Measurement.Units_.CUP
    }
  },
  teaspoon: {
    to: {
      tablespoon: 1/3
    },
    max: {
      value: 3,
      next: Measurement.Units_.TABLESPOON
    }
  }
};

module.exports = Measurement;
