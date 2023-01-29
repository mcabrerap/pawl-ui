<template>
  <div style="">
    <Scatter :data="data" :options="options"/>
  </div>
</template>

<script setup>

import {ref} from 'vue'
import {Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend} from 'chart.js'
import {Scatter} from 'vue-chartjs'

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)

const data = ref({
  datasets: [
    {
      label: 'Scatter Dataset 1',
      fill: false,
      borderColor: '#f87979',
      backgroundColor: '#f87979',
      data: [
        {
          x: -2,
          y: 4
        },
        {
          x: -1,
          y: 1
        },
        {
          x: 0,
          y: 0
        },
        {
          x: 1,
          y: 1
        },
        {
          x: 2,
          y: 4
        }
      ],
    }
  ]
})

const options = ref({
  responsive: true,
  maintainAspectRatio: true,
  showLine: true,

})

</script>
