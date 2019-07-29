import {
  globalVar
} from '@/globalVar'
import {
  toast
} from '@/mixins/toast'

export const shareApi = {
  methods: {
    shareApi() {
      if (navigator.share) {
        navigator.share({
          title: globalVar.appName,
          text: globalVar.appDescription,
          url: 'https://sprinter-web.web.app',
        })
      } else if (!navigator.share) {
        navigator.clipboard
          .writeText(globalVar.url)
          .then(() => {
            this.toast('URL copied to clipboard!', 2500, this.$t('close'))
          })
          .catch((err) => {
            console.error(`Could not copy text: ${err}`)
          })
      }
    },
  },

  mixins: [
    toast,
  ],

}
