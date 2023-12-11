import Vue from 'vue';

const myMixin = Vue.mixin({
    methods: {
        // Добавление данных в localStorage
        toLS(key, value){
            window.localStorage.setItem(key, value);
        },

        // Получение данных из localStorage
        getLS(key){
            return window.localStorage.getItem(key);
        },

        // Форматируем время
        toAmPmFormat(data){
            // Возвращаем:
            // - hours: часы
            // - timeOfDay: время суток
            return {
                hours: data > 11 ? data - 11 : data,
                timeOfDay: data > 11 ? 'AM' : 'PM'
            }
        }
    }
});

export default myMixin