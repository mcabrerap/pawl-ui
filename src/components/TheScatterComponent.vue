<template>
  <div style="position: relative">
    <Scatter :data="data" :options="options" v-if="loaded"/>
  </div>
  <div class="button-graph is-primary is-rounded">
    <a :href="csvData" download="data.csv" class="button is-rounded button-graph--button ">Download data</a>
    <a :href="csvData" download="data.csv" class="button is-rounded button-graph--button">Download graph</a>
  </div>
</template>

<script setup>

import {ref, computed, onMounted} from 'vue'
import {Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend} from 'chart.js'
import {Scatter} from 'vue-chartjs'
import {useStore} from 'vuex'

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)

const store = useStore()
const loaded = ref(false)

const data = ref({
  datasets: [
    {
      label: 'Potentiostat Curve',
      fill: false,
      borderColor: '#e49e00',
      backgroundColor: '#e49e00',
      data: [],
    }
  ]
})

const options = ref({
  responsive: true,
  maintainAspectRatio: true,
  showLine: true,
  borderWidth: 1,
  pointRadius: 0,
   scales: {
    x: {
      title: {
        display: true,
        text: 'Voltaje Appliet to Cell',
        font: {
          size: 16
        },
      },
    },
    y: {
      title: {
        display: true,
        text: 'Current Measured',
        font: {
          size: 16
        },
      },
    },
  },
})

const csvData = computed(() => {
  const measurementData = store.state.measurementData
  const informationsData = "Data Potentiostat"+'\n'+"Biomicrosystems - Universidad de los Andes"
  const dateTime = new Date().toLocaleString()
  const headers = ['Voltaje ', ' Current']
  const rows = [...measurementData.map(point => [point.x, point.y]), []]
  const csv = informationsData + '\n' + dateTime + '\n\n' + headers.join(' | ') + '\n' + rows.map(row => row.join(' ; ')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  return URL.createObjectURL(blob)
})


onMounted(() => {
  loaded.value = false
  const measurementData = computed(() => store.state.measurementData)
  data.value.datasets[0].data = measurementData.value
  loaded.value = true
})

</script>
