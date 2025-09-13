// plant.js - Handles quantity increment/decrement for plant cards
function updateQty(btn, delta) {
  var span = btn.parentNode.querySelector('span');
  var val = parseInt(span.textContent) + delta;
  if (val < 1) val = 1;
  span.textContent = val;
}
