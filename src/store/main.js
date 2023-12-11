export default {
  state: {
    // Роль авторизованного пользователя
    role: ''
  },
  getters: {
    // Геттеры

    // Роль пользователя
    getRole(state){
      return state.role;
    }
  },
  mutations: {
    // Установка роли пользователя в store 
    setRole(state, role){
      state.role = role
    }
  },
  actions: {
  },
}