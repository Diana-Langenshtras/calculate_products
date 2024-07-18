<template>
  <v-card>
    <v-toolbar
      color="deep-purple-accent-4"
    >
      <svg-icon type="mdi" :path="pathApple"></svg-icon>
      <v-toolbar-title>Калькулятор калорий</v-toolbar-title>

      <v-spacer></v-spacer>
      <Dialog @edit="editDate"></Dialog>
     

      <v-menu open-on-hover>
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props"><svg-icon type="mdi" :path="pathMenu"></svg-icon></v-btn>
            </template>

            <v-list>
              <v-list-item v-for="(item, i) in menu" :key="i">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
      </v-menu>


      <template v-slot:extension>
        <v-tabs
          v-model="currentItem"
          fixed-tabs
        >
          <v-tab
            v-for="item in items"
            :key="item"
            :text="item"
            :value="'tab-' + item"
          >
          
        </v-tab>

          
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
            <h2>{{ item }}</h2>
            <Tab
            :item="item"
            :id="index"
            ></Tab>   
          </v-card-text>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiDotsVertical } from '@mdi/js';
import { mdiFoodAppleOutline } from '@mdi/js';

import { useRootStore } from '../stores/root';
import { storeToRefs } from 'pinia';

import Dialog from '../components/Dialog.vue'
import Tab from '../components/Tab.vue'

  export default {
    components: {
      Dialog, SvgIcon, Tab,
    },

    data: () => ({
      pathMenu: mdiDotsVertical,
      pathApple: mdiFoodAppleOutline,
      menu: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
      currentItem: 'tab-Web',
      items: [
        'Завтрак', 'Обед', 'Ужин',
      ],
    }),

    methods: {
      addItem (item) {
        const removed = this.items.splice(0, 1)
        this.items.push(
          ...this.more.splice(this.more.indexOf(item), 1),
        )
        this.more.push(...removed)
        this.$nextTick(() => { this.currentItem = 'tab-' + item })
      },
      
      editDate(date) {
        console.log(date);
      }
    },
  }
</script>