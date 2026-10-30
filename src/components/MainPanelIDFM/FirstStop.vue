<script setup lang="ts">
interface Props {
  direction: string;
  departureDate: string;
}
const props = defineProps<Props>();

import { computed, ref } from "vue";
import { getSecondesFromDate, getMinSecFromDate } from "../../utils";
import { useIntervalFn } from "@vueuse/core";

interface Props {
  departureDate: string;
}

function padTime(value: number): string {
  return value.toString().padStart(2, "0");
}

const remainingSeconds = ref(getSecondesFromDate(props.departureDate));
const realCountdown = computed(() => getMinSecFromDate(props.departureDate));
const displayedMinutes = computed(() => {
  const [minutes, seconds] = realCountdown.value;
  if (minutes === 0 && seconds <= 59) {
    return "Départ imminent";
  }
  return `${padTime(minutes)}:${padTime(seconds)}`;
});
const isImminent = computed(() => remainingSeconds.value <= 59);

useIntervalFn(() => {
  remainingSeconds.value = getSecondesFromDate(props.departureDate);
}, 1_000, { immediate: true });

</script>
<template>
  <main
    v-if="remainingSeconds <= 5*60"
    class="direction">
      <div class="direction-label">
        <span>Direction</span>
      </div>
      <div class="direction-separator">
      </div>
      <div class="direction-name">
        {{ props.direction }}
      </div>
      <div
        class="countdown"
        :class="{imminent: isImminent }"
      >
        {{ displayedMinutes }}
      </div>
  </main>
  <main
    v-else
    class="direction">
      <div class="welcome-label">
        <span>Bienvenue sur le réseau</span>
      </div>
      <img class="welcome-logo" src="../../assets/img/logo-idfm.svg" alt="Île-de-France mobilités" />
  </main>
</template>
<style lang="css" scoped>
.direction {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  font-size: 3cqw;
  color: black;
}
.direction-name {
  font-size: calc(1cqw * (100/1920)*100);
  font-family: "IDFMBold";
  text-align: center;
  align-self: center;
  color: black;
  margin-bottom: calc(1cqw * (40/1920)*100);
  text-box: trim-both cap alphabetic;
}
.direction-label {
  font-size: calc(1cqw * (45/1920)*100);
  font-family: "IDFMBold";
  color: black;
  margin-bottom: calc(1cqw * (30/1920)*100);
  text-box: trim-both cap alphabetic;
}
.direction-separator {
  width: calc(1cqw * (400/1920)*100);
  height: calc(1cqw * (2/1920)*100);
  background-color: black;
  margin-bottom: calc(1cqw * (40/1920)*100);
  box-sizing: border-box;
}
.countdown {
  width: calc(1cqw * (200/1920)*100);
  height: calc(1cqw * (80/1920)*100);
  background-color: var(--idfm-grey);
  font-size: calc(1cqw * (38/1920)*100);
  font-family: "IDFMBold";
  text-box: trim-both cap alphabetic;
  border-radius: calc(1cqw * (8/1920)*100);
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
}
.imminent {
  width: calc(1cqw * (450/1920)*100);
}
.welcome-label {
  font-size: calc(1cqw * (65/1920)*100);
  font-family: "IDFMBold";
  color: black;
  margin-bottom: calc(1cqw * (65/1920)*100);
  text-box: trim-both cap alphabetic;
}
.welcome-logo {
  height: calc(1cqw * (130/1920)*100);
  width: auto;
}

</style>
