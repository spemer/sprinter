<template lang="pug">
  div#bottomSheet
    div.bottomSheet_dim(
      @click="toggleHandler(false)"
      :class="{'active': !isActive}"
    )
    div.bottomsheet_sheet-wrapper
      div.bottomsheet_sheet-box
        div.bottomsheet_sheet.bg(
          :class="{'active': isActive}"
        )
          div.bottomsheet_wrapper
            div.bottomsheet_header.bg
              div.bottomsheet_header-left(
                @click="toggleHandler(false)"
              )
                button
                  font-awesome-icon.fas(
                    :icon="['fas', 'times']"
                  )
              div.bottomsheet_header-title
                div.bottomsheet_header-title-text {{ bottomSheetTitle }}

            div.bottomsheet_list-wrapper
              div.bottomsheet_list(
                v-for="(color, i) in getColors"
                :key="i"
              )
                div.bottomsheet_list-each(
                  v-if="refresh"
                  ref="colorEach"
                  @click="toggleEachFilter(color, i)"
                  :style="{'background-color': color[0]}"
                  :class="{'selected': color[2]}"
                )
                  font-awesome-icon.fas(
                    :icon="['fas', 'check']"
                  )

              Button(
                :btnLabel="$t('applyFilter')"
              )
                div.btn_slot(
                  slot="btn_slot"
                  @click="applyFilter"
                )
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
library.add(faTimes, faCheck)

import { mapGetters, mapMutations, mapActions } from 'vuex'
import { db, auth } from '@/firebase'
import { globalVar } from '@/globalVar'

export default {
  props: {
    bottomSheetTitle: String,
  },

  metaInfo () {
    return {
      title: `${globalVar.appName} - ${this.$t('filter')}`,
      titleTemplate: `%s`,
    }
  },

  data: () => ({
    isActive: true,
    refresh: true,
  }),

  computed: {
    ...mapGetters([
      'getColors',
      'getSelectedColors',
    ]),
  },

  methods: {
    ...mapMutations([
      'SET_FILTER_SHOW',
      'SET_SELECTED_COLORS',
    ]),

    ...mapActions([
      'setBottomsheetAction',
    ]),

    toggleHandler (bool) {
      this.setBottomsheetAction(bool)
      this.isActive = !this.isActive
    },

    toggleEachFilter (color, i) {
      this.SET_FILTER_SHOW(i)
      this.refresh = false
      this.$nextTick(() => {
        this.refresh = true
      })

      let el = this.$refs.colorEach
      return (! el[i].classList.contains('selected'))
        ? this.SET_SELECTED_COLORS(['add', getComputedStyle(el[i]).backgroundColor])
        : this.SET_SELECTED_COLORS(['remove', getComputedStyle(el[i]).backgroundColor])
    },

    applyFilter () {
      console.log('applyFilter')
      this.setBottomsheetAction(false)
      this.isActive = false
    },

  },

  beforeDestroy () {
    this.setBottomsheetAction(false)
  },

  components: {
    Button: () => import(/* webpackChunkName: 'components/Button' */ '@/components/Button')
  },

}
</script>

<style lang="scss" scoped>
#bottomSheet {
  top: 0;
  left: 0;
  z-index: 10;
  position: absolute;
  @include user-select();

  ::selection {
    background-color: transparent !important;
  }

  .bottomSheet_dim {
    z-index: 10;
    width: 100vw;
    height: 100vh;
    opacity: 0.46;
    will-change: opacity;
    position: fixed !important;
    overflow: hidden !important;
    background-color: #212121;
    animation: 0.25s dim_ease_in ease;

    @keyframes dim_ease_in {
      from {
        opacity: 0;
      }
      to {
        opacity: 0.46;
      }
    }

    &.active {
      animation: 0.25s dim_ease_out ease;

      @keyframes dim_ease_out {
        from {
          opacity: 0.46;
        }
        to {
          opacity: 0;
        }
      }
    }
  }

  .bottomsheet_sheet-wrapper {
    .bottomsheet_sheet-box {
      bottom: 0;
      z-index: 15;
      height: 100vh;
      position: fixed;
      @include drop-shadow(0, 0, $grid4x, $black24);

      .bottomsheet_sheet {
        bottom: 0;
        z-index: 20;
        width: 100vw;
        overflow-y: scroll;
        position: absolute;
        padding: 0 0 $grid4x;
        max-height: 80vh !important;
        margin-bottom: -#{$grid48x};
        animation: 0.35s slide_up ease;
        transform: rotate3d(0, 0, 0, 0deg);
        border-radius: $grid4x $grid4x 0 0;
        will-change: opacity, transform !important;

        // android softkey
        @media screen and (device-aspect-ratio: 36/59) {
          padding-bottom: calc(#{$grid48x} + #{$grid16x}) !important;
        }

        @supports (padding-bottom: env(safe-area-inset-bottom)) {
          padding-bottom: calc(
            env(safe-area-inset-bottom) + #{$grid56x}
          ) !important;
        }

        @keyframes slide_up {
          from {
            opacity: 1;
            @include transform(translateY(0));
          }
          to {
            opacity: 0;
            @include transform(translateY($grid56x));
          }
        }

        &.active {
          animation: 0.35s slide_down ease;
          transform: rotate3d(0, 0, 0, 0deg);
          will-change: opacity, padding-bottom, transform;

          @keyframes slide_down {
            from {
              opacity: 0;
              @include transform(translateY($grid56x));
            }
            to {
              opacity: 1;
              @include transform(translateY(0));
            }
          }
        }

        .bottomsheet_wrapper {
          position: relative;

          .bottomsheet_header {
            width: 100%;
            position: absolute;
            height: $grid12x;
            padding-top: $grid2x;
            @include border-radius();

            .bottomsheet_header-left {
              position: absolute;

              button {
                width: $grid12x;
                height: $grid12x;
              }
            }

            .bottomsheet_header-title {
              .bottomsheet_header-title-text {
                position: absolute;
                height: $grid12x;
                overflow: hidden;
                font-weight: 700;
                margin: 0 $header;
                text-align: center;
                white-space: nowrap;
                padding-top: $grid2x;
                display: inline-block;
                text-overflow: ellipsis;
                width: calc(100% - #{$header} - #{$header});
                @include font-size($grid4x);
                @include line-height($grid5x);
              }
            }
          }

          .bottomsheet_list-wrapper {
            padding-top: $header;

            .bottomsheet_list {
              display: inline-block;
              height: $grid12x;
              padding: $grid2x 0;
              padding-left: $grid4x;
              width: calc(50% - #{$grid6x});

              &:nth-child(2n) {
                padding-left: $grid4x;
                padding-right: $grid4x;
              }

              .bottomsheet_list-each {
                width: 100%;
                height: 100%;
                opacity: 0.24;
                cursor: pointer;
                position: relative;
                display: inline-block;
                @include border-radius();

                svg {
                  padding: $grid4x;
                  visibility: hidden;
                  color: #fff !important;
                }

                span {
                  bottom: 10px;
                  color: #fff;
                  position: absolute;
                  visibility: hidden;
                }

                &.selected {
                  opacity: 1;

                  svg,
                  span {
                    visibility: visible;
                  }
                }
              }
            }
          }

          .bottomsheet_body {
            height: auto;

            .bottomsheet_body-list {
              cursor: pointer;
              height: $grid12x;
              @include font-size($grid4x);
              @include line-height($grid8x);
            }

            .bottomsheet_body-p {
              height: auto;
            }
          }
        }
      }
    }
  }
}
</style>
