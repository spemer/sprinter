export const toast = {
  methods: {
    toast(str) {
      this.$toasted.show(str, {
        theme: 'primary',
        position: 'bottom-center',
        duration: 2000,
        action: {
          text: 'Close',
          onClick: (e, toastObject) => {
            toastObject.goAway(0)
          }
        },
      })
    },
  },
}
