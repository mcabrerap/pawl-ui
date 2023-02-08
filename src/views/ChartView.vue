<template>
  <section class="container is-fluid">
    <div class="chart-header">
      <nav class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Start Point (V)</p>
            <p class="title">0,000</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">First Vertex (V)</p>
            <p class="title">0,700</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Second Vertex (V)</p>
            <p class="title">-0,700</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Zero Crosses</p>
            <p class="title">4</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Scan Rate (V/S)</p>
            <p class="title">0,050</p>
          </div>
        </div>
      </nav>
    </div>

    <div class="chart-graph">
      <div class="columns">
        <div class="column">
          <the-scatter-component v-if="loaded"></the-scatter-component>
          <div class="modal" :class="{'is-active': isMeasurementStarted}">
            <div class="modal-background"></div>
            <div class="modal-content">
              <div>
                <h1 class="title is-1 has-text-centered has-text-white-bis">Getting data from device</h1>
                <h2 class="subtitle is-3 has-text-centered has-text-white-bis">Please wait...</h2>
                <progress class="progress is-large is-primary" max="100"></progress>
              </div>
            </div>
          </div>
          <div class="active-device" v-if="!isMeasurementStarted && !loaded">
            <div class="active-device__item">
              <div class="active-device__image">
                <div class="active-device__description p-6">
                  <h2 class="has-text-centered">Potentiostat</h2>
                  <h4 class="has-text-centered">Device ID: {{selectedDevice}}</h4>
                </div>
                <img src="../assets/microcontroller.png" alt="">
                <h6 class="has-text-right">Image: https://www.flaticon.com/</h6>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-one-fifth">
          <div class="chart-control">
            <div class="field">
              <label class="label">Sample name</label>
              <div class="control">
                <input class="input is-rounded is-primary" type="text" placeholder="enter sample name"
                       v-model.trim="identifier">
              </div>
            </div>
            <div class="buttons">
              <button class="button is-primary is-rounded is-fullwidth" @click="startMeasurement">Start
              </button>
              <button class="button is-danger is-rounded is-fullwidth" @click="stopMeasurement">Stop
              </button>
              <button class="button is-rounded is-fullwidth" @click="reloadChart">Reload Chart</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
import TheScatterComponent from "@/components/TheScatterComponent";
import {ref, computed, onMounted} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

const store = useStore();
const router = useRouter();
const loaded = ref(false);
const identifier = ref("");

const startMeasurement = async () => {

  loaded.value = false;

  if (identifier.value === "") {
    alert("Please enter a sample name");
    return;
  }
  await store.dispatch("startMeasurement", {
    deviceId: selectedDevice.value,
    identifier: identifier.value,
  });

  if (store.getters.getLoadedChart) {
    loaded.value = true;
  }

};

const isMeasurementStarted = computed(() => {
  return store.getters.getMeasurementStarted;
});

const stopMeasurement = () => {
  console.log("stopMeasurement");
};

const reloadChart = () => {
  console.log("reload");
};

const selectedDevice = computed(() => {
  return store.getters.getSelectedDevice;
});

onMounted(() => {
  if(store.getters.getSelectedDevice === null) {
    router.push('/dashboard');
  }
});

</script>
