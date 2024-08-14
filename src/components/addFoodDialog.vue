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
                  <v-autocomplete
                    v-model="state.productValue"
                    :error-messages="v$.productValue.$errors.map(e => e.$message)"
                    label="Продукт"
                    required
                    @blur="v$.productValue.$touch"
                    @change="v$.productValue.$touch"
                    :item-props="itemProps" 
                    :items="products"
                  />
                  <v-text-field
                    v-model="state.weightValue"
                    :error-messages="v$.weightValue.$errors.map(e => e.$message)"
                    label="Вес, г"
                    required
                    @blur="v$.weightValue.$touch"
                    @input="v$.weightValue.$touch"
                  />
                  <v-btn 
                    class="mt-2 button" 
                    type="submit" 
                    block text="Close Dialog" 
                    @click="isActive.value = closeDialog();"
                  >
                    Добавить
                  </v-btn>
                </v-sheet>
              </v-card-text>
            </v-card>
        </template>
      </v-dialog>
</template>
  
<script setup>
import { reactive, defineEmits, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { numeric, required } from '@vuelidate/validators'
import { useRootStore } from '../stores/root';
  
  const emit = defineEmits(['add']);
  const rootStore = useRootStore();
  
  const initialState = {
    weightValue: 100,
    productValue: '',
  }
  
  const state = reactive({
    ...initialState,
  })
  
  const rules = {
    productValue: { required },
    weightValue: { required, numeric },
  }
  
  const v$ = useVuelidate(rules, state)
  
  function clear() {

      v$.value.$reset()
      for (const [key, value] of Object.entries(initialState)) {
          state[key] = value
        }
  }
  
  function closeDialog() {

      v$.value.$validate();
      if (state.productValue === '' || state.weightValue === 0) {
            return true
        }
      else {
          emit('add', state.productValue, state.weightValue);
          clear();
          return false;    
        }
  }

  function itemProps(item) {

      return {
          title: item.name,
          subtitle: item.name,
      }
  }

  const products = computed(() => {

      const array = rootStore.products.concat(rootStore.addedProducts);
      return array;
  });
    
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