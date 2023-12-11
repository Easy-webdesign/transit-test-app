import { default as main } from './main';
import { default as users } from './users';

// Экспорт 2 store:
// - main: общий для авторизованного пользователя
// - users: для работы со списком контактов
export default { main, users };
