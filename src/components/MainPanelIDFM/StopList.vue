<script setup lang="ts">
import { computed } from "vue";
import Stop from "./Stop.vue";
import { StopWithTime } from "../../types";

const props = defineProps<{ stops: StopWithTime[]; primaryColor: string; textColor: string }>();

const terminusLabel = "HELLO";
const nextStopLabel = "WORLD";

const currentDescription = computed(() => {
  if (props.stops.length === 0) return "";
  const isTerminusScenario =
    props.stops[props.stops.length - 1].isTerminus && props.stops.length === 1;

  return isTerminusScenario ? terminusLabel : nextStopLabel;
});

const getIndexForStop = (i: number) => {
  const stop0 = props.stops[0];
  const stop1 = props.stops[1];
  if (!stop0.isStopSkipped) return i === 0 ? 0 : 1;
  if (stop1 && !stop1.isStopSkipped) return i === 1 ? 0 : 1;
  return 1;
};

</script>

<template>
  <div class="stops-list-container">
    <ol class="stops-list">
      <Stop
        v-for="(stopWithTime, index) in stops.slice(0, stops.length - 1)"
        :index="getIndexForStop(index)"
        :real-index="index"
        :key="stopWithTime.stop.id"
        :stop="stopWithTime"
        :is-last="false"
        :primary-color="primaryColor"
      />
    </ol>
    <Stop 
      v-if="stops.length > 0"
      :index="getIndexForStop(stops.length - 1)"
      :real-index="stops.length - 1"
      :key="stops[stops.length - 1].stop.id"
      :stop="stops[stops.length - 1]"
      :is-last="true"
      :primary-color="primaryColor"
    />
  </div>
</template>

<style lang="css" scoped>
.stops-list-container {
  overflow: hidden;
  height: 100%;
  width: 100%;
  background-color: white;
  color: black;
  font-family: "IDFMBold", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  --gutter-width: 6.25cqw;
  --line-width: calc(1cqw * (30/1920)*100);
}
.stops-list-container:has(.stops-list:empty) li:only-of-type {
  height: calc(1cqw * (230/1920)*100);
  align-items: start;
}
.stops-list-container:has(> .stops-list:empty)
  > li:only-of-type
  > :deep(.stop-indicator-wrapper) {
  align-items: flex-start;
  height: unset !important;
  padding-top: calc(1cqw * (33/1920)*100);
}
.stops-list-container:has(> .stops-list:empty)
  > li:only-of-type
  > :deep(.stop-name) {
  height: unset !important;
  padding-top: calc(1cqw * (33/1920)*100);
  font-size: calc(1cqw * (60/1920)*100);
}
.stops-list {
  list-style: none;
  padding: 0;
  margin: 0;
  height: 100%;
  position: relative;
  margin-top: 2cqw;
  gap: 3cqw;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.stops-transition-wrapper {
  display: contents;
}

.stop-transition-move {
  transition: transform 1s ease-in-out;
  z-index: 10;
}
.stop-transition-move:nth-child(n + 3) {
  visibility: visible;
  transition: transform 1.2s cubic-bezier(0.25, 1, 0.5, 1);
  transition-delay: 0.8s;
}

.stops-list::before {
  content: "";
  position: absolute;

  left: calc(var(--gutter-width) / 2);
  transform: translateX(-50%);
  width: var(--line-width);

  top: -1000px;
  bottom: 0;
  height: 100000px;
  background-color: v-bind(primaryColor);
  z-index: 1;
}
</style>
