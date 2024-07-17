<template>
  <v-card>
    <v-toolbar
      color="deep-purple-accent-4"
    >
      <v-app-bar-nav-icon>
      
      </v-app-bar-nav-icon>

      <v-toolbar-title>калькулятор калорий</v-toolbar-title>

      <v-spacer></v-spacer>

      

      <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props">lol</v-btn>
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
          ></v-tab>

          <v-menu v-if="more.length">
            <template v-slot:activator="{ props }">
              <v-btn
                class="align-self-center me-4"
                height="100%"
                rounded="0"
                variant="plain"
                v-bind="props"
              >
                more

                <v-icon icon="mdi-menu-down" end></v-icon>
              </v-btn>
            </template>

            <v-list class="bg-grey-lighten-3">
              <v-list-item
                v-for="item in more"
                :key="item"
                :title="item"
                @click="addItem(item)"
              ></v-list-item>
            </v-list>
          </v-menu>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-window v-model="currentItem">
      <v-tabs-window-item
        v-for="item in items.concat(more)"
        :key="item"
        :value="'tab-' + item"
      >
        <v-card flat>
          <v-card-text>
            <h2>{{ item }}</h2>
            {{ text }}
            <v-date-picker></v-date-picker>
          </v-card-text>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      menu: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
      currentItem: 'tab-Web',
      items: [
        'Breakfast', 'Lunch', 'Dinner',
      ],
      more: [
        'News', 'Maps', 'Books', 'Flights', 'Apps',
      ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
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
    },
  }
</script>