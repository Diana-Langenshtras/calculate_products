<template>
    <main class="main">
        <router-link class="link" to="/">
            <v-btn class="button button-back">
              <svg-icon 
                class="icon" 
                type="mdi" 
                :path="pathArrowLeft"
              /> 
                Назад 
            </v-btn>
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
                color="#1c8000"
              />
              <v-btn class="button button-search" icon>
                <svg-icon type="mdi" :path="pathSearch"/>
              </v-btn>
          </v-toolbar>
        </v-card>
        <v-table height="300px" fixed-header>
          <thead>
            <tr>
              <th class="text-left">Название</th>
              <th class="text-left">Калории</th>
              <th class="text-left">Углеводы</th>
              <th class="text-left">Жиры</th>
              <th class="text-left">Белки</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in sortedProducts" :key="item.name">
              <td>{{ item.name }}</td>
              <td>{{ item.calories }}</td>
              <td>{{ item.carbs }}</td>
              <td>{{ item.fats }}</td>
              <td>{{ item.proteins }}</td>
            </tr>
          </tbody>
        </v-table>
        <addNewFoodDialog/>
    </main>
</template>
  
<script setup>
import { useRootStore } from '../stores/root';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiArrowLeft, mdiMagnify } from '@mdi/js';

import { computed, ref } from 'vue';

import addNewFoodDialog from '../components/addNewFoodDialog.vue'

    const rootStore = useRootStore();
    
    const pathArrowLeft = mdiArrowLeft;
    const pathSearch = mdiMagnify;
    const search = ref('');

    const sortedProducts = computed(() => {   

        const array = rootStore.products.concat(rootStore.addedProducts);
        return array.filter(product => product.name.toLowerCase().includes(search.value.toLowerCase()));
    })

</script>

<style lang="scss" scoped>

.main {
  display: flex;
  gap: 20px;
  flex-direction: column;
}

.card__input {
  padding: 20px;
}

.v-toolbar {
  background-color: $primary-color;
}

.button-search {
  background-color: $primary-color;
  border-radius: 0;
  color: $secondary-color;
}

.v-toolbar__content > .v-btn:last-child {
  margin-inline-end: 15px;
}

</style>
  