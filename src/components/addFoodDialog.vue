<template>
      <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              v-bind="activatorProps"
              class="button"
            >
                Добавить
          </v-btn>
        </template>
        <template v-slot:default="{ isActive }">
            <v-card title="Добавить продукт">
              <v-card-text>
                <v-sheet class="mx-auto" width="300">
                  <v-autocomplete v-model="productValue" :item-props="itemProps" :items="products"></v-autocomplete>
                  <v-text-field
                    :rules="rules"
                    hide-details="auto"
                    label="Вес, г"
                    v-model="weightValue"
                  ></v-text-field>
                    <v-btn class="mt-2" type="submit" block text="Close Dialog" @click="isActive.value = closeDialog();">Добавить</v-btn>
                </v-sheet>
              </v-card-text>
            </v-card>
        </template>
      </v-dialog>
</template>
  
<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiPlus } from '@mdi/js';

import { useRootStore } from '../stores/root';
import { storeToRefs } from 'pinia';
  
    export default {
      components: {
        SvgIcon, 
      },
  
      data() {
        return {
            path: mdiPlus,
            products: [],
            productValue: '',
            weightValue: 12,
            rules: [
              value => !!value || 'Required.',
              value => (value !== 0) || 'Required.',
            ],
        }
      },

      methods: {
        closeDialog() {
            if (this.productValue === '' || this.weightValue === 0) return true;
            else {
                this.$emit('add', this.productValue, this.weightValue);
                this.productValue = '';
                this.weightValue = 0;
                return false;
            }
        },
        itemProps(item) {
          return {
            title: item.name,
            subtitle: item.name,
          }
        },
      },
      created() {
        const rootStore = useRootStore();
        rootStore.getProducts();
        const {products} = storeToRefs(rootStore);
        this.products = products;
        console.log(this.products)
      },
  }
 </script>

<style lang="scss" scoped>
  @import '../assets/styles/style.scss';

  .button {
    border-radius: 0;
  }

  .select {
    opacity: 1;
    row-gap: 8px;
  }
</style>