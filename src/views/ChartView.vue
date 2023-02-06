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
        </div>
        <div class="column is-one-fifth">
          <div class="chart-control">
            <div class="field">
              <label class="label">Sample name</label>
              <div class="control">
                <input class="input is-rounded is-primary" type="text" placeholder="enter sample name" v-model.trim="identifier">
              </div>
            </div>
            <div class="buttons">
              <button class="button is-primary is-rounded is-fullwidth" @click="startMeasurement">Start Measurement</button>
              <button class="button is-danger is-rounded is-fullwidth" @click="stopMeasurement">Stop Measurement</button>
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
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const loaded = ref(false);
const identifier = ref("");
const deviceId = ref("dev-001");

const startMeasurement = async () => {

  loaded.value = false;

  if (identifier.value === "") {
    alert("Please enter a sample name");
    return;
  }
  await store.dispatch("startMeasurement", {
    deviceId: deviceId.value,
    identifier: identifier.value,
  });

  if (store.getters.getLoadedChart) {
    loaded.value = true;
  }

};

const stopMeasurement = () => {
  console.log("stopMeasurement");
};

const reloadChart = () => {
  console.log("reload");
};

</script>
