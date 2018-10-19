<template>
    <div class="position-absolute flex-column w-per-100 h-per-100 z-index-9999">
      <div class="spi-class flex-column">
        <spinner type="circles" class="m-auto"></spinner>
      </div>
    </div>
</template>

<script>
export default {
  name: 'LoadingCompoent'
}
</script>

<style scoped lang="scss">
.spi-class{
  width: 1.4rem;
  height: 1.4rem;
  background-color: rgba(17, 17, 17, 0.7);
  border-radius: 5px;
  margin: 50% auto;
}
.z-index-9999{
  z-index: 9999;
}
</style>
