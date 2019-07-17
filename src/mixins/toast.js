import {
  debounce
} from 'lodash'

export const toast = {
  methods: {
    toast: _.debounce(
      function (msg, duration, btn) {
        this.$toasted.show(msg, {
          theme: 'primary',
          position: 'bottom-center',
          duration: duration,
          action: {
            text: btn,
            onClick: (e, toastObject) => {
              if (btn === 'Refresh') {
                window.location.reload(true)
              } else if (btn === 'Close') {
                toastObject.goAway(0)
              }
            }
          },
        })
      },
      1000, {
        leading: false,
        trailing: true,
      },
    ),
  },
}
