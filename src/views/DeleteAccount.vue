<template lang="pug">
  div#deleteAccount.bg
    Header(
      :headerTitle="$t('deleteAccount')"
    )
      div.header_left(
        slot="header_left"
        @click="$router.replace('/')"
      )
        button
          font-awesome-icon.fas(
            :icon="['fas', 'times']"
          )

    div.deleteAccount_button
      Button.deleteAccount_button-btn(
        :btnLabel="$t('deleteAccount')"
      )
        div.btn_slot(
          slot="btn_slot"
          @click="dialog = true"
        )

    div
      h3 {{ $t('deleteAccount-title') }}
      p {{ $t('deleteAccount-desc') }}

    v-dialog(
      data-app
      v-model="dialog"
    )
      v-card
        v-card-title {{ $t('deleteAccount') }}
        v-card-text {{ $t('askDeleteAccount') }}
        v-card-actions
          button.cancel(
            flat
            @click="dialog = false"
          ) {{ $t('cancel') }}
          button.logout(
            flat
            @click="deleteAccountHandler"
          ) {{ $t('deleteAccount') }}
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
library.add(faTimes)

import { deleteAccount } from '@/mixins/deleteAccount'

export default {
  name: 'deleteAccount',

  data: () => ({
    dialog: false,
  }),

  methods: {
    deleteAccountHandler () {
      this.dialog = false
      setTimeout(() => {
        this.deleteAccount()
      }, 0)
    },
  },

  mixins: [
    deleteAccount,
  ],

  components: {
    Header :() => import(/* webpackChunkName: 'components/Header' */ '@/components/Header'),
    Button :() => import(/* webpackChunkName: 'components/Button' */ '@/components/Button')
  },
}
</script>

<style lang="scss" scoped>
#deleteAccount {
  padding: $header $grid4x calc(#{$header} + #{$grid32x});
  @include user-select();

  h3 {
    @include font-size($grid6x)
  }

  .deleteAccount_button {
    left: 0;
    bottom: 0;
    width: 100%;
    position: fixed;
    padding-bottom: $grid8x;

    @supports (padding-bottom: env(safe-area-inset-bottom)) {
      padding-bottom: calc(
        env(safe-area-inset-bottom) + #{$grid8x}
      ) !important;
    }

    .deleteAccount_button-btn {
      .btn_slot {
        height: $grid14x;
      }
    }
  }
}
</style>
