<template>
  <div id="wrap" class="wrap-content">
    <transition name="translate">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>
<style lang="sass">
  @import "./assets/scss/common.scss"
</style>
<script>
  import Conf from 'config'
  export default {
    name: 'app',
    components: {
    },
    data () {
      return {
        config: Conf
      }
    },
    mounted () {
    },
    methods: {
    }
  }
</script>