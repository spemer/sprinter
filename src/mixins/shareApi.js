import { globalVar } from '@/globalVar'
import { toast } from '@/mixins/toast'

export const shareApi = {
  methods: {
    copyTextToClipboard(text) {
      let textArea = document.createElement('textarea')
      textArea.style.position = 'fixed'
      textArea.style.top = 0
      textArea.style.left = 0
      textArea.style.width = '2em'
      textArea.style.height = '2em'
      textArea.style.padding = 0
      textArea.style.border = 'none'
      textArea.style.outline = 'none'
      textArea.style.boxShadow = 'none'
      textArea.style.background = 'transparent'
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      try {
        let successful = document.execCommand('copy')
        let msg = successful ? 'successful' : 'unsuccessful'
        console.log('Copying text command was ' + msg)
      } catch (err) {
        console.log('Unable to copy')
      }

      document.body.removeChild(textArea)
    },

    shareApi() {
      if (navigator.share) {
        navigator.share({
          title: globalVar.appName,
          text: globalVar.appDescription,
          url: globalVar.url,
        })
      } else if (!navigator.share) {
        this.copyTextToClipboard(globalVar.url)
        this.toast('URL copied to clipboard!', 2500, this.$t('close'))
      }
    },

  },

  mixins: [
    toast,
  ],
}
