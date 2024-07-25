<template>
    <Dialog @edit="editFirstDate" :currentDate="firstDate"></Dialog>
    <Dialog @edit="editSecondDate" :currentDate="secondDate"></Dialog>
    <v-spacer></v-spacer>
    <div>
        <apexchart width="500" type="bar" :options="options" :series="series"></apexchart>
    </div>
</template>

<script setup>
import Dialog from '../components/Dialog.vue';
import { ref } from 'vue';
import { useRootStore } from '../stores/root';

    const rootStore = useRootStore();

    const options = {
            chart: {
                id: 'vuechart-example'
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
            }
        };
    const series = [{
            name: 'series-1',
            data: [30, 40, 45, 50, 49, 60, 70, 91]
        }];

    const firstDate = ref(new Date());
    const secondDate = ref(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
        
    function editFirstDate(date) {
        firstDate.value = date;
      }

    function editSecondDate(date) {
        secondDate.value = date;
      }
    
</script>