<template>
  <main class="not-in-service">
    <div>
      Terminus, tous les voyageurs sont invités à descendre.
        <br />À bientôt sur le réseau
    </div>
    <img class="welcome-logo" src="../../assets/img/logo-idfm.svg" alt="Île-de-France mobilités" />
  </main>
</template>
<style lang="css" scoped>
.not-in-service {
  display: flex;
  grid-template-columns: 100%;
  color: black;
  background-color: white !important;
  font-size: calc(1cqw * (55/1920)*100);
  font-family: "IDFMBold", sans-serif;
  text-align: center;
  align-items: center;
  justify-content: center;
  line-height: calc(100% + 1cqw * (20/1920)*100);
}
</style>
