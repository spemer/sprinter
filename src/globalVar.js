import Vue from 'vue'

export const globalVar = new Vue({
  data: _ => ({
    appName: 'Sprinter',
    appDescription: 'Sprinter - Todo management application',
    url: 'https://sprinter-web.web.app',
  }),
})
