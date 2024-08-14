<template>
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            class="button"
          >
              {{ date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() }}
          </v-btn>
      </template>
      <template v-slot:default="{ isActive }">
          <v-card>
            <v-card-text>
              <v-sheet class="mx-auto" width="300">
                  <v-date-picker v-model="date"/>
                  <v-btn 
                    class="mt-2 button" 
                    type="submit" 
                    block 
                    text="Close Dialog" 
                    @click="isActive.value = closeDialog();"
                  >
                    Выбрать
                  </v-btn>
              </v-sheet>
            </v-card-text>
          </v-card>
      </template>
    </v-dialog>
</template>
  
<script setup>
import { ref } from 'vue';

  const emit = defineEmits(['edit']);

  const props = defineProps({
      currentDate: {
        type: Date,
        default: new Date()
      }
  })

  const date = ref(props.currentDate);

  function closeDialog() {    

      emit('edit', this.date);               
  }
  
 </script>

<style lang="scss" scoped>
  @import '../assets/styles/style.scss';

  .button {
    border-radius: 0;
  }
</style>