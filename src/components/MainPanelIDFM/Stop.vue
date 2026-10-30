<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { cleanText, getSecondesFromDate } from "../../utils";
import { StopWithTime } from "../../types";

const props = defineProps<{
  stop: StopWithTime;
  index: number,
  realIndex: number,
  isLast: boolean,
  primaryColor: string;
}>();

const nowTrigger = ref(Date.now());
let timer: ReturnType<typeof setInterval>;

const stopRef = ref<HTMLElement | null>(null);
const isVisible = ref(true);
let observer: IntersectionObserver;

onMounted(() => {
  timer = setInterval(() => {
    nowTrigger.value = Date.now();
  }, 1000);

  observer = new IntersectionObserver(
    ([entry]) => {
      isVisible.value = entry.isIntersecting;
    },
    {
      root: null, 
      threshold: 1,
    }
  );

  if (stopRef.value) {
    observer.observe(stopRef.value);
  }
});

onUnmounted(() => {
  clearInterval(timer);

  if (observer && stopRef.value) {
    observer.unobserve(stopRef.value);
  }
});

const stopNameClass = computed(() => {
  return {
    "stop-name-long": cleanText(props.stop.stop.name).length >= 21,
    "stop-name-very-long": cleanText(props.stop.stop.name).length >= 29,
  };
});

const isStopCurrent = (stop: StopWithTime, index: number) => {
  //@ts-ignore
  const _ = nowTrigger.value;

  return (
    !stop.isStopSkipped &&
    getSecondesFromDate(stop.timeOfArrival, true) <= 0 &&
    index === 0 &&
    getSecondesFromDate(stop.timeOfDeparture, true) > -20
  );
};
</script>

<template>
  <li
    ref="stopRef"
    class="stop"
    :class="{
      'is-out-of-view': (!isVisible && realIndex > 1),
      blinkable: index === 0 && !stop.isStopSkipped,
      'is-last-stop': stop.isTerminus,
      'is-current': isStopCurrent(stop, index) && !stop.isTerminus,
      'is-skipped': stop.isStopSkipped,
    }"
    :data-time="getSecondesFromDate(stop.timeOfArrival, true)"
  >
    <div class="stop-indicator-wrapper">
      <div class="stop-indicator">
        <div class="stop-blinker"></div>
      </div>
    </div>

    <span class="stop-name" :class="stopNameClass">
      <div class="text-bg">
        {{ cleanText(stop.stop.name) }}

        <img
          class="non-accessible-stop"
          src="../../assets/img/non-accessible-stop.png"
          alt="non accessible stop"
          v-if="!stop.stop.isAccessible && !stop.isTerminus && !isStopCurrent(stop, index) && !stop.isStopSkipped"
        />

        <img
          class="non-accessible-stop"
          src="../../assets/img/non-accessible-stop-white-bg.png"
          alt="non accessible stop"
          v-if="!stop.stop.isAccessible && !stop.isStopSkipped && (stop.isTerminus || isStopCurrent(stop, index))"
        />
      </div>
    </span>
  </li>
</template>

<style scoped>
.stop {
  display: flex;
  position: relative;
  align-items: center;
  gap: 0;
}

.stop.is-out-of-view {
  visibility: hidden;
}
.stop-indicator-wrapper {
  width: var(--gutter-width);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  z-index: 2;
}

.stop-indicator {
  width: calc(1cqw * (40/1920)*100);
  height: calc(1cqw * (40/1920)*100);
  background-color: white;
  border: calc(1cqw * (5/1920)*100) solid black;
  border-radius: 50%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.stop-blinker {
  width: calc(1cqw * (26/1920)*100);
  height: calc(1cqw * (26/1920)*100);
  background-color: white;
  border-radius: 50%;
  box-sizing: border-box;
}

.stop-name {
  color: black;
  font-size: calc(1cqw * (42/1920)*100);
  text-box: trim-both cap alphabetic;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  height: 5cqw;
}
.stop-name-long {
  font-size: 4cqw;
}

.stop-name-very-long {
  font-size: 3.5cqw;
}

.non-accessible-stop {
  height: 0.8em;
}
.non-accessible-stop {
  height: .8em;
}

.blinkable:not(
    .is-current
  )
  .stop-blinker {
  animation: blink 2s infinite steps(1);
}
.blinkable.is-current .stop-blinker {
  background-color: var(--ratp-yellow);
}

.stop.is-last-stop {
  background-color: var(--idfm-grey);
  height: calc(1cqw * (72/1920)*100);
  width: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  z-index: 1;
}

.stop.is-last-stop::after {
  content: "";
  position: absolute;
  left: calc(var(--gutter-width) / 2);
  transform: translateX(-50%);
  width: var(--line-width);
  top: 0%;
  height: 25%;
  background-color: v-bind(primaryColor);
  z-index: 1;
  pointer-events: none;
}

.stop.is-last-stop .stop-indicator {
  width: calc(1cqw * (60/1920)*100);
  height: calc(1cqw * (60/1920)*100);
  border: calc(1cqw * (7/1920)*100) solid black;
}
.stop.is-last-stop .stop-blinker {
  width: calc(1cqw * (26/1920)*100);
  height: calc(1cqw * (26/1920)*100);
  background-color: black;
}

.stop.is-current:first-of-type .stop-name {
  background-color: transparent;
  padding: 0;
}

.stop.is-skipped .stop-indicator::before,
.stop.is-skipped .stop-indicator::after {
  content: "";
  position: absolute;
  background-color: #ff1400;
  width: 4.5cqw;
  height: 0.7cqw;
  left: 3.125cqw;
  top: 50%;
  border-radius: 1px;
  z-index: 15;
}
.stop.is-skipped .stop-indicator::before {
  transform: translate(-50%, -50%) rotate(45deg);
}
.stop.is-skipped .stop-indicator::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}
</style>