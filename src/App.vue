<template lang="pug">
  v-app(:dark="getDarkmode")
    div#app(:class="{'noscroll': getBottomSheet, 'darkmode': getDarkmode, 'lightmode': !getDarkmode}")
      keep-alive
        router-view
      vue-progress-bar
      div.update_btn(
        v-if="updateExists"
      )
        div.update_btn-text New version available
        div.update_btn-update(
          @click="refreshApp"
        ) Refresh
</template>

<script>
import { mapGetters } from 'vuex'
import { globalVar } from '@/globalVar'

export default {
  data: () => ({
    refreshing: false,
    registration: null,
    updateExists: false,
  }),

  computed: {
    ...mapGetters([
      'getBottomSheet',
      'getDarkmode',
      'getCurrentLang',
    ])
  },

  metaInfo () {
    return {
      title: globalVar.appName,
      htmlAttrs: {
        lang: this.getCurrentLang,
      },
    }
  },

  methods: {
    showRefreshUI (e) {
      this.registration = e.detail
      this.updateExists = true
    },

    refreshApp () {
      this.updateExists = false
      if (!this.registration || !this.registration.waiting) {
        return
      }
      this.registration.waiting.postMessage('skipWaiting')
    },
  },

  created () {
    if (localStorage.Lang) {
      this.$i18n.locale = localStorage.Lang
    } else {
      this.$i18n.locale = 'en'
    }

    document.addEventListener(
      'swUpdated', this.showRefreshUI, {
        once: true
      }
    )

    navigator.serviceWorker.addEventListener(
      'controllerchange', () => {
        if (this.refreshing) return
        this.refreshing = true
        window.location.reload(true)
      }
    )
  },
}
</script>

<style lang="scss">
#app{
  width: 100% !important;

  .update_btn {
    left: $grid8x;
    margin: 0 auto;
    bottom: $grid8x;
    height: $grid12x;
    display: inline-block;
    z-index: 9999 !important;
    background-color: $black78;
    position: absolute !important;
    width: calc(100% - #{$grid16x});
    @include border-radius();
    @include line-height($grid8x);

    .update_btn-text {
      left: 0;
      color: $white54;
      height: $grid12x;
      padding-left: $grid4x;
      display: inline-block;
      width: calc(100% - #{$grid28x});
    }

    .update_btn-update {
      right: 0;
      cursor: pointer;
      width: $grid24x;
      height: $grid12x;
      font-weight: 900;
      text-align: center;
      display: inline-block;
    }
  }
}
</style>
