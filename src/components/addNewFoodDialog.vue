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
            <v-card>
              <v-card-text>
                <v-sheet class="mx-auto" width="300">
                    <form class="form">
                      <v-text-field
                        v-model="state.age"
                        :counter="10"
                        :error-messages="v$.age.$errors.map(e => e.$message)"
                        label="Возраст"
                        required
                        @blur="v$.age.$touch"
                        @input="v$.age.$touch"
                      ></v-text-field>
                  
                      <v-text-field
                        v-model="state.height"
                        :error-messages="v$.height.$errors.map(e => e.$message)"
                        label="Рост"
                        required
                        @blur="v$.height.$touch"
                        @input="v$.height.$touch"
                      ></v-text-field>

                      <v-text-field
                        v-model="state.weight"
                        :error-messages="v$.weight.$errors.map(e => e.$message)"
                        label="Вес"
                        required
                        @blur="v$.weight.$touch"
                        @input="v$.weight.$touch"
                      ></v-text-field>
                  
                      <v-select
                        v-model="state.activity"
                        :error-messages="v$.activity.$errors.map(e => e.$message)"
                        :items="items"
                        label="Степень физической активности"
                        required
                        @blur="v$.activity.$touch"
                        @change="v$.activity.$touch"
                      ></v-select>

                      <v-radio-group 
                        v-model="state.gender" 
                        :error-messages="v$.gender.$errors.map(e => e.$message)" 
                        required 
                        @blur="v$.gender.$touch" 
                        @change="v$.gender.$touch"
                      >
                        <v-radio label="Мужчина" value="male"></v-radio>
                        <v-radio label="Женщина" value="female"></v-radio>
                      </v-radio-group>
                      <div class="button-group">
                        <v-btn class="me-4 button" @click="calculate">Рассчитать</v-btn>
                        <v-btn class="button" @click="clear">Очистить</v-btn>
                      </div>
                    </form>
                    <v-btn class="mt-2 button" type="submit" block text="Close Dialog" @click="isActive.value = closeDialog();">Добавить</v-btn>
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
            weightValue: 0,
            rules: [
              value => (value !== '') || 'Required.',
              value => (value !== 0) || 'Required.',
            ],
        }
      },

      methods: {
        closeDialog() {
            if (this.productValue === '' || this.weightValue === 0) {
              return true
            }
            else {
                this.$emit('add', this.productValue, this.weightValue);
                this.productValue = '';
                this.weightValue = 100;
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