<template>
  <div class="container">
    <div class="screen" ref="screen">
      <div class="top">
        <Top></Top>
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist class="Tourist"></Tourist>
          <Sex class="Sex"></Sex>
          <Age class="Age"></Age>
        </div>
        <div class="center">
          <Map class="map"></Map>
          <Line class="line"></Line>
        </div>
        <div class="right">右边</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Top from './components/top/index.vue'
import Tourist from './components/tourist/index.vue'
import Age from './components/age/index.vue'
import Sex from './components/sex/index.vue'
import Map from './components/map/index.vue'
import Line from './components/line/index.vue'
let screen = ref()
onMounted(() => {
  screen.value.style.transform = `scale(${getscale()}) translate(-50%, -50%)`
})
function getscale(w = 1920, h = 1080) {
  // console.log(window.innerWidth, window.innerHeight)
  const ww = window.innerWidth / w
  const hh = window.innerHeight / h
  return ww > hh ? hh : ww
}
window.onresize = () => {
  // console.log(getscale())
  screen.value.style.transform = `scale(${getscale()}) translate(-50%, -50%)`
}
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat;
  background-size: cover;
  .screen {
    position: fixed;

    width: 1920px;
    height: 1080px;
    // background-color: red;
    left: 50%;
    top: 50%;
    transform-origin: left top;
    .top {
      width: 100%;
      height: 40px;
      // background-color: cyan;
    }
    .bottom {
      display: flex;
      height: 100%;
      // background-color: red;
      .left {
        flex: 1;
        // background-color: red;
        display: flex;
        flex-direction: column;
        .Tourist {
          flex: 1;
        }
        .Sex {
          flex: 1;
        }
        .Age {
          flex: 1.5;
        }
      }
      .center {
        flex: 1.5;
        display: flex;
        flex-direction: column;

        .map {
          flex: 4;
        }

        .line {
          flex: 1;
        }
      }
      .right {
        flex: 1;
      }
    }
  }
}
</style>
