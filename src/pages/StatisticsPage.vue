<template>
    <main class="main">
        <router-link class="link" to="/">
            <v-btn class="button button-back"><svg-icon class="icon" type="mdi" :path="pathArrowLeft"/> Назад </v-btn>
        </router-link>
        <Form @calculate="calculateDiet"></Form>
        <div class="date-group">
            <Dialog @edit="editFirstDate" :currentDate="firstDate"></Dialog>
            <span class="icon"><svg-icon type="mdi" :path="pathMinus"/></span>
            <Dialog @edit="editSecondDate" :currentDate="secondDate"></Dialog>
        </div>
        <v-spacer></v-spacer>
        <div>
            <apexchart class="chart" width="100%" type="bar" :options="options" :series="series" :key="JSON.stringify(series)"></apexchart>
        </div>
    </main>
</template>

<script setup>
import Form from '../components/Form.vue';
import Dialog from '../components/Dialog.vue';

import { useRootStore } from '../stores/root';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMinus, mdiArrowLeft } from '@mdi/js';

import { reactive } from 'vue'
import { computed } from 'vue';
import { ref } from 'vue';

    const activity = {
        'Минимальная активность': 1.2,
        'Слабый уровень активности': 1.375,
        'Умеренный уровень активности': 1.55,
        'Тяжелая или трудоемкая активность': 1.7,
        'Экстремальный уровень': 1.9,
    }

    const calorieAllowance = ref(0);

    const rootStore = useRootStore();

    const pathMinus = mdiMinus;
    const pathArrowLeft = mdiArrowLeft;

    function calculateDiet(data){
        console.log(data);
        if (data.gender === 'male')
        {
            console.log((10 * data.weight + 6.25 * data.height - 5 * data.age + 5) * activity[data.activity])
            calorieAllowance.value = (10 * data.weight + 6.25 * data.height - 5 * data.age + 5) * activity[data.activity];
        }
        if (data.gender === 'female')
        {
            calorieAllowance.value = (10 * data.weight + 6.25 * data.height - 5 * data.age - 161) * activity[data.activity];
        }
    }

    const firstDate = ref(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
    const secondDate = ref(new Date());
    
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

    //функция преобразует cтроку формата DD/MM/YYYY в Date
    function convertToDate(dateString) {
        const dateParts = dateString.split("/");
        const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
        return dateObject;
    }

    //вычисляет разницу в днях между датами
    function daysDifference(d0, d1) {
        var diff = new Date(+d1).setHours(12) - new Date(+d0).setHours(12);
        return Math.round(diff/8.64e7);
    }

    const options = reactive({
            chart: {
                id: 'daily-diet',
            },
            xaxis: {
                categories: dayArray
            },
            colors: ['#1c8000', '#4500db'],
        });

    const caloriesByDay = computed(() => { 
        const array = new Array(options.xaxis.categories.length).fill(0);
        let sum = 0;
        for (const [day, meal] of Object.entries(rootStore.dailyDiet)) {
            if(options.xaxis.categories.includes(day))
            {
                const index = daysDifference(firstDate.value, convertToDate(day));
                for (const [key, product] of Object.entries(meal)) {
                    product.map(el =>
                        {
                            sum += parseInt(el.product.calories) / 100 * Number(el.weight);
                        }
                    )
                    array[index] = Math.floor(sum); sum = 0;
                }
            }
        }
        console.log(array)
        return array;
    })

    const allowance = computed(() => { 
        const array = new Array(options.xaxis.categories.length).fill(Math.floor(calorieAllowance.value));
        console.log(array)
        return array;
    })

    const series = reactive([{
            name: 'Калории',
            data: caloriesByDay      
        },
        {
            name: 'Норма',
            data: allowance
       }]
    );

</script>

<style lang="scss" scoped>

.chart {
    padding: 20px;
}

.date-group {
    display: flex;
    justify-content: center;
    gap: 20px;
}

</style>