<template>
    <main class="main">
        <router-link class="link" to="/">
            <v-btn class="button button-back"><svg-icon class="icon" type="mdi" :path="pathArrowLeft"/> Назад </v-btn>
        </router-link>
        <v-card class="main__card-search" flat >
          <v-toolbar 
            class="card__toolbar" 
            dense 
            floating>
              <v-text-field
                single-line
                class="card__input"
                v-model="search"
                hide-details="auto"
                bg-color="#ffffff"
                color="#4500db"
              />
              <v-btn class="button card__button" icon>
                <svg-icon type="mdi" :path="pathSearch"/>
              </v-btn>
          </v-toolbar>
        </v-card>
        <v-table height="300px" fixed-header>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Calories</th>
              <th class="text-left">carbs</th>
              <th class="text-left">fats</th>
              <th class="text-left">proteins</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in sortedProducts" :key="`${index}:${item.id}`">
              <td>{{ item.name }}</td>
              <td>{{ item.calories }}</td>
              <td>{{ item.carbs }}</td>
              <td>{{ item.fats }}</td>
              <td>{{ item.proteins }}</td>
            </tr>
          </tbody>
        </v-table>
        <addNewFoodDialog @add="addProduct"></addNewFoodDialog>
    </main>
</template>
  
<script setup>
import { useRootStore } from '../stores/root';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiArrowLeft, mdiMagnify } from '@mdi/js';

import { computed } from 'vue';
import { ref } from 'vue';

import addNewFoodDialog from '../components/addFoodDialog.vue'

    const rootStore = useRootStore();
    
    const pathArrowLeft = mdiArrowLeft;
    const pathSearch = mdiMagnify;
    const search = ref('');

    const sortedProducts = computed(() => {   
      return rootStore.products.filter(product => product.name.toLowerCase().includes(search.value.toLowerCase()));
    })

</script>

<style lang="scss" scoped>

.card__input {
  padding: 20px;
}

.v-toolbar {
  background-color: $accent-color;
}

</style>
  