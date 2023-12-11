import axios from "axios";

// Задаем базовые параметры для пакета axios
// Ссылка на доку - https://axios-http.com/docs/intro
const $axios = axios.create({
    // Базовый url по которому делаем запрос, подтягивается из .env 
    baseURL: process.env.VUE_APP_BASE_URL,
    // Заголовки запроса
    headers: {
        Accept: 'application/json'
    }
});

export default $axios