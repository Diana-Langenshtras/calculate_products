<template>
     <v-list>
      <v-list-item
        v-for="(item, index) in currentDailyDiet"
        :key="item.product.name"
        :subtitle="`${item.weight}, г`"
        :title="item.product.name"
      >
        <template v-slot:append>
          <v-btn
            color="#000000"
            icon="mdi-information"
            variant="text"
            @click="deleteItem(index)"
          >
            <svg-icon type="mdi" :path="pathDelete"/>
          </v-btn>
        </template>
      </v-list-item>
    </v-list> 
    <addFoodDialog @add="addProduct"/>
</template>

<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiDeleteOutline } from '@mdi/js';
import { useRootStore } from '../stores/root';
import { computed } from 'vue';
import addFoodDialog from '../components/addFoodDialog.vue'

  const rootStore = useRootStore();
  const pathDelete = mdiDeleteOutline;

  const props = defineProps({
      id: {
          type: Number,
          required: true,
      },
      item: {
          type: String,
          required: true,
      },
      date: {
          type: Date,
          required: true,
      },
    })

  const currentDailyDiet = computed(() => {

      const currentDate = (props.date.getDate() + "/" + (props.date.getMonth() + 1) + "/" + props.date.getFullYear());
      const currentItem = (props.item);
      if (currentDate in rootStore?.dailyDiet)
        if (currentItem in rootStore?.dailyDiet[currentDate])
          return rootStore?.dailyDiet[currentDate][currentItem];
  });

  function addProduct(product, weight) {

      rootStore.addToDiet((props.date.getDate() + "/" + (props.date.getMonth() + 1) + "/" + props.date.getFullYear()), props.item, product, weight)
  }

  function deleteItem(index) {

      rootStore.removeFromDiet((props.date.getDate() + "/" + (props.date.getMonth() + 1) + "/" + props.date.getFullYear()), props.item, index)
  }
  
</script>

<style lang="scss" scoped>
@import '../assets/styles/style.scss';
</style>