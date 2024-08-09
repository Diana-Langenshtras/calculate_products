<template>
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
  </template>
  
  <script setup>
    import { reactive, defineEmits } from 'vue'
    import { useVuelidate } from '@vuelidate/core'
    import { required } from '@vuelidate/validators'

    const emit = defineEmits(['calculate'])
  
    const initialState = {
      age: '',
      height: '',
      weight: '',
      activity: null,
      gender: null,
    }
  
    const state = reactive({
      ...initialState,
    })
  
    const items = ['Минимальная активность', 'Слабый уровень активности', 'Умеренный уровень активности', 'Тяжелая или трудоемкая активность', 'Экстремальный уровень']
  
    const rules = {
      age: { required },
      height: { required },
      weight: { required },
      activity: { required },
      items: { required },
      gender: { required },
    }
  
    const v$ = useVuelidate(rules, state)
  
    function clear() {
      v$.value.$reset()
  
      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value
      }
    }

    
   function calculate() {
      v$.value.$validate();
      if (state.age && state.height && state.weight && state.activity && state.gender) {
        emit('calculate', state);
        clear();
      }
    }
  
  </script>
  
<style lang="scss" scoped>

.form {
  padding-top: 20px;
}

.button-group {
  display: flex;
}

</style>