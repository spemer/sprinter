import {
  globalVar
} from '@/globalVar'

export const state = {

  // user auth
  user: null,
  status: null,
  error: null,

  // todo list
  todos: [],
  colors: [
    [globalVar.todoColors[0], 'transparent', 'true'],
    [globalVar.todoColors[1], 'transparent', 'true'],
    [globalVar.todoColors[2], 'transparent', 'true'],
    [globalVar.todoColors[3], 'transparent', 'true'],
    [globalVar.todoColors[4], 'transparent', 'true'],
    [globalVar.todoColors[5], 'transparent', 'true'],
    [globalVar.todoColors[6], 'transparent', 'true'],
  ],
  selectedColors: [
    globalVar.todoColors[0],
    globalVar.todoColors[1],
    globalVar.todoColors[2],
    globalVar.todoColors[3],
    globalVar.todoColors[4],
    globalVar.todoColors[5],
    globalVar.todoColors[6],
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
