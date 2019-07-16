export const toast = {
  methods: {
    toast(str) {
      this.$toasted.show(str, {
        theme: 'primary',
        position: 'bottom-center',
        duration: 2000,
      })
    },
  },
}
