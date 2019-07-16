<template lang="pug">
  div#headercomp
    div.header__wrapper

      slot.header__left(
        name="header__left"
      )

      div.header__title {{ headerTitle }}
</template>

<script>
export default {
  props: {
    headerTitle: String
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
  background-color: #fff;

  .header__wrapper {
    position: relative;

    .header__left,
    .header__right {
      color: $black78;
      height: $header;
      cursor: pointer;
      position: absolute;
    }

    .header__left {
      left: 0;
      z-index: 5;
      width: $header;
      text-align: center;

      i {
        padding-top: $grid2x;
        @include font-size($grid6x);
      }
    }

    .header__right {
      right: 0;
      text-align: right;
      padding: 0 $grid4x;
      @include font-size(14px);
      @include line-height($grid9x);
    }

    .header__title {
      color: $black78;
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
