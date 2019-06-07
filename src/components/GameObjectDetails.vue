<template lang="pug">
  div
    building-details-component(v-if="isBuilding" :building="gameObject")
    idea-details-component(v-else-if="isIdea" :idea="gameObject")
    project-details-component(v-else-if="isProject" :project="gameObject")
</template>

<script lang="ts">
import baseComponent from "./baseComponent";

import GameObject from "../classes/gameObject/GameObject";
import typeGuards from "../classes/typeGuards";

import { Idea } from "../classes/Idea";

import BuildingDetailsComponent from "./BuildingDetails.vue";
import IdeaDetailsComponent from "./IdeaDetails.vue";
import ProjectDetailsComponent from "./ProjectDetails.vue";

export default baseComponent.extend({
  props: {
    gameObject: Object as () => GameObject
  },
  components: {
    'building-details-component': BuildingDetailsComponent,
    'idea-details-component': IdeaDetailsComponent,
    'project-details-component': ProjectDetailsComponent
  },
  computed: {
    isBuilding: function(): boolean {
      return typeGuards.isBuilding(this.gameObject);
    },
    isIdea: function(): boolean {
      return typeGuards.isIdea(this.gameObject);
    },
    isProject: function(): boolean {
      return typeGuards.isProject(this.gameObject);
    }
  }
});
</script>
