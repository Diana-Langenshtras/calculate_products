<template>
    <h1>{{ item }}</h1>
    <h2>{{ id }}</h2>
    <addFoodDialog @add="addProduct"></addFoodDialog>

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
    methods: {
      addProduct(product, weight) {
        console.log(product)
      }
    },
  }
</script>

<style lang="scss" scoped>
@import '../assets/styles/style.scss';
</style>