<template lang="pug">
  div#headercomp.bg
    div.header__wrapper

      slot.header__left(
        name="header__left"
      )

      div.header__title(
        v-scroll-to="{el: 'body', duration: 0}"
      ) {{ headerTitle }}

      slot.header__right(
        name="header__right"
      )
</template>

<script>
export default {
  props: {
    headerTitle: String,
  },
}
</script>

<style lang="scss" scoped>
#headercomp {
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: $header;
  position: fixed;
  @include user-select();
  @include drop-shadow(0, 0, $grid4x, $black08);

  ::selection {
    background-color: transparent !important;
  }

  @supports (padding-top: env(safe-area-inset-top)) {
    padding-top: calc(env(safe-area-inset-top)) !important;
  }

  .header__wrapper {
    position: relative;

    .header__left,
    .header__right {
      height: $header;
      cursor: pointer;
      position: absolute;
    }

    .header__left {
      left: 0;
      z-index: 5;
      width: $header;
      text-align: center;

      button {
        width: $header;
        height: $header;

        svg {
          width: $grid4x;
          color: $black54;
          @include font-size($grid5x);
        }
      }
    }

    .header__right {
      right: 0 !important;
      text-align: right !important;
      padding: 0 $grid4x !important;
      @include font-size(14px);
      @include line-height($grid9x);
    }

    .header__title {
      cursor: pointer;
      height: $header;
      overflow: hidden;
      font-weight: 700;
      margin: 0 $header;
      position: absolute;
      text-align: center;
      white-space: nowrap;
      display: inline-block;
      text-overflow: ellipsis;
      width: calc(100% - #{$header} - #{$header});
      @include line-height($grid9x);
    }
  }
}
</style>
