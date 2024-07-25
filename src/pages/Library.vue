<template>
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
        <tr v-for="item in rootStore.products" :key="item.name">
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

    const rootStore = useRootStore();
    rootStore.getProducts();
</script>
  