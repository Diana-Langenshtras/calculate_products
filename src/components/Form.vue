<template>
    <form>
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
        v-model="state.select"
        :error-messages="v$.select.$errors.map(e => e.$message)"
        :items="items"
        label="Степень физической активности"
        required
        @blur="v$.select.$touch"
        @change="v$.select.$touch"
      ></v-select>
  
      <v-checkbox
        v-model="state.checkbox"
        :error-messages="v$.checkbox.$errors.map(e => e.$message)"
        label="Do you agree?"
        required
        @blur="v$.checkbox.$touch"
        @change="v$.checkbox.$touch"
      ></v-checkbox>
  
      <v-btn class="me-4" @click="v$.$validate"> submit </v-btn>
      <v-btn @click="clear"> clear </v-btn>
    </form>
  </template>
  
  <script setup>
    import { reactive } from 'vue'
    import { useVuelidate } from '@vuelidate/core'
    import { required } from '@vuelidate/validators'
  
    const initialState = {
      age: '',
      height: '',
      weight: '',
      select: null,
      checkbox: null,
    }
  
    const state = reactive({
      ...initialState,
    })
  
    const items = ['Минимальная активность', 'Слабый уровень активности', 'Умеренный уровень активности', 'Тяжелая или трудоемкая активность', 'Экстремальный уровень']
  
    const rules = {
      age: { required },
      height: { required },
      weight: { required },
      select: { required },
      items: { required },
      checkbox: { required },
    }
  
    const v$ = useVuelidate(rules, state)
  
    function clear() {
      v$.value.$reset()
  
      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value
      }
    }
  </script>
  