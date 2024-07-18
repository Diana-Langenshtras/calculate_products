<template>
    <h1>{{ item }}</h1>
    <h2>{{ id }}</h2>
    <addFoodDialog></addFoodDialog>

</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiStarOutline } from '@mdi/js';

import addFoodDialog from '../components/addFoodDialog.vue'

  export default {
    props: {
      id: Number,
      item: String,
    },

    components: {
        SvgIcon, addFoodDialog,
    },

    data() {
        return {
          pathRate: mdiStarOutline,
     }},
  }
</script>

<style lang="scss" scoped>
@import '../assets/styles/style.scss';
</style>