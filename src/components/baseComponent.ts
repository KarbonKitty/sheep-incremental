import Vue from 'vue';
import filters from "../filters";
import { state } from '@/engine';

const baseComponent = Vue.extend({
    data: () => state,
    filters
});

export default baseComponent;
