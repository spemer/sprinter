import debounce from 'lodash/debounce'

export const toast = {
  methods: {
    toast: debounce(
      function (msg, duration, btn) {
        if (btn) {
          this.$toasted.show(msg, {
            theme: 'primary',
            position: 'bottom-center',
            duration: duration,
            action: {
              text: btn,
              onClick: (e, toastObject) => {
                return toastObject.goAway(0)
              }
            },
          })
        } else {
          this.$toasted.show(msg, {
            theme: 'primary',
            position: 'bottom-center',
            duration: duration,
          })
        }
      },
      1000, {
        leading: true,
        trailing: false,
      },
    ),
  },
}
