<template>
  <v-card>
    <v-toolbar
      class="toolbar"
    >
      <v-icon
        class="icon"
        color="white"
        icon="mdi-food-apple-outline"
        size="large"
      />
      <v-toolbar-title class="text-white toolbar__title">Калькулятор калорий</v-toolbar-title>
      <v-spacer/>
      <Dialog @edit="editDate" :currentDate="currentDate"/>
      <v-menu open-on-hover>
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props">
                <v-icon
                  color="white"
                  icon="mdi-dots-vertical"
                  size="large"
                />
              </v-btn>
            </template>
            <v-list>
              <router-link class="link" to="/statistics">
                <v-list-item>
                  <v-list-item-title>Статистика</v-list-item-title>
                </v-list-item>
              </router-link>
              <router-link class="link" to="/library">
                <v-list-item>
                  <v-list-item-title>Библиотека</v-list-item-title>
                </v-list-item>
              </router-link>
            </v-list>
      </v-menu>
      <template v-slot:extension>
        <v-tabs
          v-model="currentItem"
          fixed-tabs
        >
            <v-tab
              class="text-white tab__title"
              v-for="item in items"
              :key="item"
              :text="item"
              :value="'tab-' + item"
            />            
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-window v-model="currentItem">
      <v-tabs-window-item
        v-for="(item, index) in items"
        :key="item"
        :value="'tab-' + item"      
      >
        <v-card flat>
          <v-card-text>
            <Tab
              :item="item"
              :id="index"
              :date="currentDate"
            />   
          </v-card-text>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<script setup>
import Dialog from '../components/Dialog.vue'
import Tab from '../components/Tab.vue'
import { ref } from 'vue';
  
      const currentDate = ref(new Date());
      const currentItem = ref('tab-breakfast');
      const items = [
        'Завтрак', 'Обед', 'Ужин',
      ];
      
      function editDate(date) {

          currentDate.value = date;
      }
    
</script>

<style lang="scss" scoped>

.toolbar {
  background-color: $primary-color;
}

.toolbar__title {
  font-size: 28px;
}

.tab__title {
  font-size: 24px;
  text-transform: none;
}

.icon {
  margin-left: 20px;
}

</style>