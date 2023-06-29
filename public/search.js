// JavaScript to initialize noUiSlider and update handle values
var priceSlider = document.getElementById('price-slider');
var priceInput = document.getElementById('price-range');
var priceValues = document.getElementById('price-values');

noUiSlider.create(priceSlider, {
  start: [0, 100], // Set default price range
  connect: true,
  range: {
    'min': 0,
    'max': 100
  },
  format: {
    to: function (value) {
      return Math.round(value); // Round the value to the nearest integer
    },
    from: function (value) {
      return value;
    }
  }
});

priceSlider.noUiSlider.on('update', function(values, handle) {
  priceInput.value = values[handle];
  priceValues.innerHTML = values.map(Math.round).join(' - '); // Display rounded handle values
});
