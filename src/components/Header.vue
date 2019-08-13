<template lang="pug">
  div#headercomp.bg
    div.header_wrapper

      slot.header_left(
        name="header_left"
      )

      div.header_title(
        v-scroll-to="{el: 'body', duration: 0}"
      ) {{ headerTitle }}

      slot.header_right(
        name="header_right"
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

  .header_wrapper {
    position: relative;

    .header_left,
    .header_right {
      height: $header;
      cursor: pointer;
      position: absolute;
    }

    .header_left {
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

    .header_right {
      right: 0 !important;
      text-align: right !important;
      padding: 0 $grid4x !important;
      @include font-size(14px);
      @include line-height($grid9x);
    }

    .header_title {
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
