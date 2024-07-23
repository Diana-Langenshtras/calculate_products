<template>
    <h1>{{ item }}</h1>
    <h2>{{ date }}</h2>
    <v-list :items="currentDailyDiet" item-title="product.name" item-value="weight"></v-list>
    <ul class="recommendation__list" v-for="(item,index) in dailyDiet">
                <li class="recommendation__item" :key="index">
                    {{ console.log(item) }}
                </li>
            </ul>
    <addFoodDialog @add="addProduct"></addFoodDialog>

</template>

<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiStarOutline } from '@mdi/js';
import { useRootStore } from '../stores/root';
import { toRefs } from "@vue/reactivity";
import { computed } from 'vue';
import { ref } from 'vue';

import addFoodDialog from '../components/addFoodDialog.vue'

  const pathRate =  mdiStarOutline;
  const rootStore = useRootStore();
  const dailyDiet = ref(rootStore.dailyDiet);

  const props = defineProps({
      id: Number,
      item: String,
      date: Date,
    })
  
 
  const currentDate = (props.date.getDate() + "/" + (props.date.getMonth() + 1) + "/" + props.date.getFullYear());
  const currentItem = (props.item);
  const currentDailyDiet = computed(() => {
    console.log(dailyDiet?.currentDate?.currentItem)
    return dailyDiet?.currentDate?.currentItem});

  function addProduct(product, weight) {
        rootStore.updateDiet((props.date.getDate() + "/" + (props.date.getMonth() + 1) + "/" + props.date.getFullYear()), props.item, product, weight)
    }
  
</script>

<style lang="scss" scoped>
@import '../assets/styles/style.scss';
</style>