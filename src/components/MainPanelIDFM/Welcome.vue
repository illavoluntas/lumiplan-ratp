<template>
  <main class="welcome">
      <div class="welcome-label">
        <span>Bienvenue sur le réseau</span>
      </div>
      <img class="welcome-logo" src="../../assets/img/logo-idfm.svg" alt="Île-de-France mobilités" />
  </main>
</template>
<style lang="css" scoped>
.welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  font-size: 3cqw;
  color: black;
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
