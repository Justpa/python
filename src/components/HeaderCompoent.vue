<template>
  <div class="flex-shrink m-t--1px">
    <x-header style="background-color: #013695">
      <a slot="overwrite-left"  class="font-size-16 flex-row m-l-negative-16" @click="goback">
        <div class="h-40">
          <img src="../assets/img/back.png" class="header-left-btn"/>
        </div>
        <div class="m-l-negative-5">{{$t("message.back")}}</div></a>
      <a v-if="showSave" slot="right"  class="color-white" @click="save">{{$t("message.save")}}</a>{{title}}
    </x-header>
  </div>
</template>

<script>
export default {
  props: ['title', 'showSave'],
  name: 'HeaderCompoent',
  methods: {
    goback () {
      this.$emit('goback')
    },
    save () {
      this.$emit('save')
    }
  }
}
</script>

<style scoped>

</style>
