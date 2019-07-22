<template lang="pug">
  div#bottombutton
    div.bottomButton__wrapper
      slot.btn_slot(
        name="btn_slot"
      )
      p.bottomButton__label {{ btnLabel }}
</template>

<script>
export default {
  props: {
    'btnLabel': String,
  },
}
</script>

<style lang="scss" scoped>
#bottombutton {
  bottom: 0;
  padding: 0 $grid4x;
  margin-bottom: -#{$grid8x} !important;
  height: calc(#{$bottom} + #{$grid4x});
  width: calc(100% - #{$grid8x}) !important;

  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    padding-bottom: calc(env(safe-area-inset-bottom)) !important;
  }

  .bottomButton__wrapper {
    width: 100%;
    height: $header;
    cursor: pointer;
    @include border-radius();

    .btn_slot {
      height: $header;
      position: absolute;
      width: calc(100% - #{$grid8x}) !important;
    }

    .bottomButton__label {
      color: $brand;
      height: $header;
      font-weight: 700;
      text-align: center;
      @include line-height($grid9x);
    }
  }
}

.lightmode {
  .bottomButton__wrapper {
    color: $brand;
    background-color: $brand_16;
  }
}

.darkmode {
  .bottomButton__wrapper {
    color: $white87;
    background-color: $white10;
  }
}
</style>
