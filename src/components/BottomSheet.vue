<template lang="pug">
  div#bottomSheet(
    :aria-hidden="{true: isActive}"
  )
    div.bottomSheet__dim(
      @click="toggleHandler(false)"
      :class="{active: !isActive}"
    )
    div.bottomsheet__sheet-wrapper
      div.bottomsheet__sheet-box
        div.bottomsheet__sheet.bg(
          :class="{active: isActive}"
        )
          div.bottomsheet__wrapper
            div.bottomsheet__header.bg
              div.bottomsheet__header-left(
                @click="toggleHandler(false)"
              )
                button
                  i.fas.fa-times
              div.bottomsheet__header-title
                div.bottomsheet__header-title-text {{ bottomSheetTitle }}

            div.bottomsheet__list-wrapper
              div.bottomsheet__list(
                v-for="(color, i) in getColors"
                :key="i"
              )
                div.bottomsheet__list-each(
                  v-if="refresh"
                  @click="toggleEachFilter(color, i)"
                  :style="{'background-color': color[0]}"
                  :class="{'selected': color[2]}"
                )
                  i.fas.fa-check
                  //- span {{ color[0] }}

              Button(
                :btnLabel="$t('applyFilter')"
              )
                div.btn_slot(
                  slot="btn_slot"
                  @click="applyFilter"
                )
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { db, auth } from '@/firebase'
import Button from '@/components/Button'

export default {
  props: {
    bottomSheetTitle: String,
  },

  data: _ => ({
    isActive: true,
    refresh: true,
  }),

  firestore: _ => {
    let _todos = db.collection(auth.currentUser.uid).orderBy('createdAt', 'desc')
    return {
      todos: _todos.where('isSelected', '==', true)
    }
  },

  computed: {
    ...mapGetters([
      'getColors',
    ]),

    getIdByColor(color) {
      console.log(db.collection(auth.currentUser.uid).where('color', '==', color))
    }
  },

  methods: {
    ...mapMutations([
      'SET_FILTER_SHOW',
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

    //   let swap = db.collection(auth.currentUser.uid).where('color', '==', color[0]);

    //   db.collection(auth.currentUser.uid)
    // // '.doc' param needs doc id, by field name 'color'
    //     .doc(String(swap))
    //     .update({
    //       isSelected: color[2]
    //     })
    },

    applyFilter () {
      this.setBottomsheetAction(false)
      this.isActive = false
    },

  },

  beforeDestroy () {
    this.setBottomsheetAction(false)
  },

  components: {
    Button,
  },

}
</script>

<style lang="scss" scoped>
#bottomSheet {
  top: 0;
  left: 0;
  z-index: 5;
  position: absolute;

  ::selection {
    background-color: transparent !important;
  }

  .bottomSheet__dim {
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

  .bottomsheet__sheet-wrapper {
    .bottomsheet__sheet-box {
      bottom: 0;
      z-index: 15;
      height: 100vh;
      position: fixed;
      @include drop-shadow(0, 0, $grid4x, $black24);

      .bottomsheet__sheet {
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
        will-change: opacity, padding-bottom, transform;

        // android softkey
        @media screen and (device-aspect-ratio: 36/59) {
          padding-bottom: calc(#{$grid48x} + #{$grid16x}) !important;
        }

        // iPhone X safearea
        @supports (padding-bottom: env(safe-area-inset-bottom)) {
          padding-bottom: calc(env(safe-area-inset-bottom) + #{$grid56x});
        }

        @keyframes slide_up {
          from {
            opacity: 1;
            padding-bottom: $grid56x;
          }
          to {
            opacity: 0;
            padding-bottom: 0;
          }
        }

        &.active {
          animation: 0.35s slide_down ease;
          transform: rotate3d(0, 0, 0, 0deg);
          will-change: opacity, padding-bottom, transform;

          @keyframes slide_down {
            from {
              opacity: 0;
              padding-bottom: 0;
            }
            to {
              opacity: 1;
              padding-bottom: $grid56x;
            }
          }
        }

        .bottomsheet__wrapper {
          position: relative;

          .bottomsheet__header {
            width: 100%;
            position: absolute;
            height: $grid12x;
            padding-top: $grid2x;
            @include border-radius();

            .bottomsheet__header-left {
              position: absolute;

              button {
                width: $grid12x;
                height: $grid12x;
              }
            }

            .bottomsheet__header-title {
              .bottomsheet__header-title-text {
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

          .bottomsheet__list-wrapper {
            padding-top: $header;

            .bottomsheet__list {
              display: inline-block;
              height: $grid12x;
              padding: $grid2x 0;
              padding-left: $grid4x;
              width: calc(50% - #{$grid6x});

              &:nth-child(2n) {
                padding-left: $grid4x;
                padding-right: $grid4x;
              }

              .bottomsheet__list-each {
                width: 100%;
                height: 100%;
                opacity: 0.38;
                cursor: pointer;
                position: relative;
                display: inline-block;
                @include border-radius();
                @include transition(opacity 0.25s ease);

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

          .bottomsheet__body {
            height: auto;

            .bottomsheet__body-list {
              cursor: pointer;
              height: $grid12x;
              @include font-size($grid4x);
              @include line-height($grid8x);
            }

            .bottomsheet__body-p {
              height: auto;
            }
          }
        }
      }
    }
  }
}
</style>
