<template>
  <section class="container is-fluid">
<!--    <div class="chart__search-bar py-6">-->
<!--      <div class="field">-->
<!--        <p class="control has-icons-left has-icons-right">-->
<!--          <input class="input" type="email" placeholder="Search">-->
<!--          <span class="icon is-small is-left">-->
<!--              <i class="fas fa-search"></i>-->
<!--            </span>-->
<!--        </p>-->
<!--      </div>-->
<!--    </div>-->
    <div class="chart__profile">
      <the-scatter-component></the-scatter-component>
    </div>
    <div class="chart__active-devices">
    </div>

  </section>
</template>

<script setup>
import TheScatterComponent from "@/components/TheScatterComponent";

</script>
