<template>
  <div style="">
    <Scatter :data="data" :options="options" v-if="loaded"/>
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

})

onMounted(() => {

  loaded.value = false
  const measurementData = computed(() => store.state.measurementData)
  data.value.datasets[0].data = measurementData.value
  loaded.value = true

})
</script>
