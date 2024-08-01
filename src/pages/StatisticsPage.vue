<template>
    <router-link to="/">
        <v-btn><svg-icon type="mdi" :path="pathMenu"/></v-btn>
    </router-link>
    <Form></Form>
    <Dialog @edit="editFirstDate" :currentDate="firstDate"></Dialog>
    <Dialog @edit="editSecondDate" :currentDate="secondDate"></Dialog>
    <v-spacer></v-spacer>
    <div>
        <apexchart width="100%" type="bar" :options="options" :series="series" :key="JSON.stringify(options)"></apexchart>
    </div>
    {{ caloriesByDay }}
</template>

<script setup>
import Form from '../components/Form.vue';
import Dialog from '../components/Dialog.vue';

import { useRootStore } from '../stores/root';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiDotsVertical } from '@mdi/js';

import { reactive } from 'vue'
import { computed } from 'vue';
import { ref } from 'vue';

    const rootStore = useRootStore();
    const pathMenu = mdiDotsVertical;

    const firstDate = ref(new Date());
    const secondDate = ref(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));

    const getDaysArray = function(start, end) {
        const arr = [];
        for(const dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
            arr.push(new Date(dt).getDate() + "/" + (new Date(dt).getMonth() + 1) + "/" + new Date(dt).getFullYear());
        }
        return arr;
    };
    
    const dayArray = computed(() => { 
        return getDaysArray(firstDate.value, secondDate.value);
    })

    function editFirstDate(date) {
        firstDate.value = date;
      }

    function editSecondDate(date) {
        secondDate.value = date;
      }

    const options = reactive({
            chart: {
                id: 'daily-diet'
            },
            xaxis: {
                categories: dayArray
            }
        });

    const caloriesByDay = computed(() => { 
        const array = [];
        let sum = 0;
        for (const [key, day] of Object.entries(rootStore.dailyDiet)) {
            if(options.xaxis.categories.includes(key))
            {
                for (const [key, meal] of Object.entries(day)) {
                    meal.map(el =>
                        {
                            console.log(el)
                            console.log(parseInt(el.product.calories) / 100 * Number(el.weight))
                            sum += parseInt(el.product.calories) / 100 * Number(el.weight);
                        }
                    )
                    array.push(sum); sum = 0;
                }
            }
        }
        return array;
    })

    const series = reactive([{
            name: 'series-1',
            data: caloriesByDay
        }]);

</script>