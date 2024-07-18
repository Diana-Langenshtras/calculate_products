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
            <v-card title="Dialog">
              <v-card-text>
                <v-sheet class="mx-auto" width="300">
                    <v-date-picker v-model="date"></v-date-picker>
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
  
    export default {
      components: {
        SvgIcon, 
      },
  
      data() {
        return {
            path: mdiPlus,
            date: new Date(),
        }
      },

      methods: {
        closeDialog() {
            if (this.inputValue === '') return true;
            else {
              //  this.$emit('add', this.inputValue);
                this.inputValue = '';
                return false;
            }
        }
    }
  }
 </script>

<style lang="scss" scoped>
  @import '../assets/styles/style.scss';

  .button {
    border-radius: 0;
  }
</style>