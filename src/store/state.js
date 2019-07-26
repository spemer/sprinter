export const state = {

  // user auth
  user: null,
  status: null,
  error: null,

  // todo list
  todos: [],
  colors: [
    ['rgb(128, 207, 169)', 'transparent', 'true'],
    ['rgb(175, 141, 134)', 'transparent', 'true'],
    ['rgb(252, 122, 87)', 'transparent', 'true'],
    ['rgb(45, 132, 138)', 'transparent', 'true'],
    ['rgb(157, 99, 129)', 'transparent', 'true'],
    ['rgb(149, 167, 141)', 'transparent', 'true'],
    ['rgb(255, 159, 28)', 'transparent', 'true'],
  ],
  selectedColors: [
    'rgb(128, 207, 169)',
    'rgb(175, 141, 134)',
    'rgb(252, 122, 87)',
    'rgb(45, 132, 138)',
    'rgb(157, 99, 129)',
    'rgb(149, 167, 141)',
    'rgb(255, 159, 28)',
  ],

  // appearance
  darkmode: false,
  langs: {
    'en': 'Language',
    'ko': '한국어',
    'en': 'English',
    'zh-CN': '中文',
  },

  // bottom sheet
  bottomSheet: false,
}
