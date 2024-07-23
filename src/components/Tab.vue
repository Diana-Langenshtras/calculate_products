<template>
    <h1>{{ item }}</h1>
    <h2>{{ date }}</h2>

    <addFoodDialog @add="addProduct"></addFoodDialog>

</template>

<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiStarOutline } from '@mdi/js';
import { useRootStore } from '../stores/root';
import { toRefs } from "@vue/reactivity";

import addFoodDialog from '../components/addFoodDialog.vue'

  const pathRate =  mdiStarOutline;
  const rootStore = useRootStore();

  const props = defineProps({
      id: Number,
      item: String,
      date: Date,
    })

   // const myProps = toRefs(props);

    function addProduct(product, weight) {
        rootStore.updateDiet((props.date.getDate() + "/" + (props.date.getMonth() + 1) + "/" + props.date.getFullYear()), props.item, product, weight)
      }
  
</script>

<style lang="scss" scoped>
@import '../assets/styles/style.scss';
</style>