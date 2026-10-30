<template>
  <main class="data-unavailable">
    <div>
      Cet afficheur est momentanément indisponible.
        <br />Nous faisons notre maximum
        <br />pour le rétablir dans les meilleurs délais.
    </div>
  </main>
</template>
<style lang="css" scoped>
.data-unavailable {
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
