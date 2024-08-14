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
                        v-model="state.name"
                        :counter="10"
                        :error-messages="v$.name.$errors.map(e => e.$message)"
                        label="name"
                        required
                        @blur="v$.name.$touch"
                        @input="v$.name.$touch"
                      />
                  
                      <v-text-field
                        v-model="state.calories"
                        :error-messages="v$.calories.$errors.map(e => e.$message)"
                        label="calories"
                        required
                        @blur="v$.calories.$touch"
                        @input="v$.calories.$touch"
                      />

                      <v-text-field
                        v-model="state.carbs"
                        :error-messages="v$.carbs.$errors.map(e => e.$message)"
                        label="carbs"
                        required
                        @blur="v$.carbs.$touch"
                        @input="v$.carbs.$touch"
                      />

                      <v-text-field
                        v-model="state.fats"
                        :error-messages="v$.fats.$errors.map(e => e.$message)"
                        label="fats"
                        required
                        @blur="v$.fats.$touch"
                        @input="v$.fats.$touch"
                      />

                      <v-text-field
                        v-model="state.proteins"
                        :error-messages="v$.proteins.$errors.map(e => e.$message)"
                        label="proteins"
                        required
                        @blur="v$.proteins.$touch"
                        @input="v$.proteins.$touch"
                      />            
                    </form>
                    <v-btn 
                      class="mt-2 button" 
                      type="submit" 
                      block 
                      text="Close Dialog" 
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
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { numeric, required } from '@vuelidate/validators'
import { useRootStore } from '../stores/root';

  const rootStore = useRootStore();
  
  const initialState = {
    name: '',
    calories: '',
    carbs: '',
    fats: '',
    proteins: '',
  }
  
  const state = reactive({
    ...initialState,
  })
  
  const rules = {
    name: { required },
    calories: { required, numeric },
    carbs: { required, numeric },
    fats: { required, numeric },
    proteins: { required, numeric },
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
      if (state.name && state.calories && state.carbs && state.fats && state.proteins) {
          rootStore.addToProducts(state);
          clear();
          return false;    
      }
      else return true;
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