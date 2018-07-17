import Vue from 'vue';
import filters from "../filters";
import { IResourcesData, Currency } from '../classes/baseClasses';

const resourceBase = Vue.extend({
  props: {
    amount: Number,
    currency: String as () => Currency,
    resources: Object as () => IResourcesData
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
