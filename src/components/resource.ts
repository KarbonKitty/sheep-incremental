import Vue from "vue";

import filters from "../filters"

export default Vue.extend({
  template: `<div>{{ name }}: {{ amount | decimal(precision) }}`,
  props: [ 'name', 'amount', 'precision' ],
  filters
});