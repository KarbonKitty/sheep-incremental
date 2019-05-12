import filters from "../filters";
import { Currency } from '../classes/baseClasses';
import baseComponent from "./baseComponent";

const resourceBase = baseComponent.extend({
  props: {
    amount: Number,
    currency: String as () => Currency
  },
  computed: {
    notEnough: function() {
      return this.resources[this.currency].amount < this.amount;
    },
    lackingStorage: function() {
      return (this.resources[this.currency].limit || 0) < this.amount;
    },
    resourceName: function() {
      return this.resources[this.currency].template.name;
    },
    resourcePrecision: function() {
      return this.resources[this.currency].template.precision;
    },
    resourceAmount: function(): number {
      return this.resources[this.currency].amount;
    }
  },
  filters
});

export default resourceBase;
