import {
  debounce
} from 'lodash'

export const toast = {
  methods: {
    toast: _.debounce(
      function (msg, duration, btn) {
        if (btn) {
          this.$toasted.show(msg, {
            theme: 'primary',
            position: 'bottom-center',
            duration: duration,
            action: {
              text: btn,
              onClick: (e, toastObject) => {
                if (btn === 'Refresh') {
                  window.location.reload(true)
                } else if (btn === 'CLOSE') {
                  toastObject.goAway(0)
                }
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
        leading: false,
        trailing: true,
      },
    ),
  },
}
