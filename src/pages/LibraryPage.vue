<template>
  <router-link to="/">
    <v-btn v-bind="props"><svg-icon type="mdi" :path="pathMenu"/></v-btn>
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
            bg-color="#202020"
            color="#002677"
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
</template>
  
<script setup>
import { useRootStore } from '../stores/root';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiDotsVertical, mdiMagnify } from '@mdi/js';

import { computed } from 'vue';
import { ref } from 'vue';

    const rootStore = useRootStore();
    
    const pathMenu = mdiDotsVertical;
    const pathSearch = mdiMagnify;
    const search = ref('');

    const sortedProducts = computed(() => {   
      return rootStore.products.filter(product => product.name.toLowerCase().includes(search.value.toLowerCase()));
    })

</script>
  