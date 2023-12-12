import $axios from "@/plugins/v-axios";
import { sortKeysList } from "@/utils/dictionaries";

export default {
  state: {
    // Дефолтный список контактов
    users: [],
    // Отсортированный список контактов
    sortedUsers: [],
    // Контакты для выбранной страницы
    pageUsers: [],
    // Список национальностей для фильтра
    national: [],
    // Количество пользователей на странице
    usersOnPage: 10,
    // Параметры сортировки
    sort: {
      // По имени
      name: '',
      // По полу
      gender: '',
      // По национальности
      nat: '',
      // Убывающий или возрастающий фильтр по имени
      order: ''
    },
  },
  getters: {
    // Получаем количество всех контактов
    getUsersLength(state){
      return state.users.length
    },
    // Получаем количество страниц относительно количеству отсортированных контактов
    getCountPageOfUsers(state){
      return Math.floor(state.sortedUsers.length / state.usersOnPage);
    },
    // Список контактов на страницу
    getPageUsers(state){
      return state.pageUsers;
    },
    // Отсортированный список контактов
    getSortedUsers(state){
      return state.sortedUsers;
    },

    // Список национальностей для фильтра
    getNational(state){
      return state.national;
    },

    // Количество контактов на странице
    getUsersOnPage(state){
      return state.usersOnPage;
    },

    // Получение контактов женского пола
    getFemale(state){
      return state.users.filter(el => el.gender === 'female').length
    },

    // Получение контактов мужского пола
    getMale(state){
      return state.users.filter(el => el.gender === 'male').length
    },

    // Количество контактов по национальностям для статистики
    getNationalLength(state){
      // Массив в который складываем отфильтрованные национальности
      const nationals = [];

      // Запускаем цикл по массиву всех контактов
      state.users.forEach(user => {
        // Ищем индекс контакта в массиве nationals
        const nationalCandIdx = nationals.findIndex(nat => nat.key === user.nat);

        // Если такой контакт есть, то увеличиваем значение count на единицу
        if(nationalCandIdx > -1)  nationals[nationalCandIdx].count++;
        // Иначе добавляем объект в массив:
        // - key: националность
        // - count количество людей
        else nationals.push({ key: user.nat, count: 1 });
      });

      // Возвращаем этот массив
      return nationals
    },

    // Параметры сортировки
    getSorts(state){
      return state.sort
    }
  },

  mutations: {
    // Устанавливаем полученные контакты в state 
    setUsersData(state, users){
      // Исходный массив
      state.users = users.results;
      // Отсортированный массив
      state.sortedUsers = users.results;
    },

    // Меняем пользователей для страницы пользователей при ее смене:
    // - page: страница на которую переходим
    changeSelectedPage(state, page){
      // Индекс с которого начинаем обрезать массив. 
      // Получаемую страницу уменьшаем на 1, и умножаем на количество пользователей
      // на странице. Таким образом если у нас 2 страница, то 2 - 1 * 10 дает нам 
      // стартовый индекс с которого начинать вытаскивать данные из массива контактов
      const start = (page - 1) * state.usersOnPage;
      // Конечный индекс до которого нам нужно выбрать контакты из списка
      const end = page * state.usersOnPage;

      // Добавляем в страницу контактов пользователей, выбранных из отсортированного списка
      // по порядку
      state.pageUsers = [...state.sortedUsers].slice(start, end);
    },

    // Создаем массив национальностей для выпадающего списка
    createNationalArray(state){
        // Создаем новый массив вытаскивая в него все национальности
        const nat = state.users.map(user => user.nat);

        // Массив, в который добавляем национальности без повторения
        let natMap = [];
        // Массив опций для выпадающего списка
        let natOptions = [];
        // Перебираем национальности и добавляем в массив исключая повторяющиеся значения
        nat.forEach(el => { if(!natMap.includes(el)) natMap.push(el); });
        // Добавляем в массив опций национальностей объект:
        // - value: значение для аттрибута name 
        // - text: видимое значение в списке
        natOptions = natMap.map((national) => ({ value: national.toLowerCase(), text: national }));
        // Добавляем в самое начало списка дефолтное значение
        natOptions.unshift({ value: null, text: 'Please select the national' });

        // Добавляем список в state 
        state.national = natOptions;
    },

    // Функция сортировки по изначальному параметру имени контакта
    sortUsersByName(state, { key, value }){
      // Добавляем значение имени в state для других сортировок
      state.sort[key] = value;

      // Сортируем исходный массив, получая только те контакты которые соответствуют
      // входящему значению
      state.sortedUsers = state.users.filter((user) => {
        // Конкатенируем полное имя
        let fullName = `${user.name.first} ${user.name.last}`;
        // Проверяем начинается ли оно на то значение которое мы ввели
        return fullName.startsWith(value);
      });

      // Пробегаемся по массиву sortKeysList, в котором у нас есть элементы 'gender', 'nat'
      sortKeysList.forEach(el => {
        // Если значение в state 'gender' и 'nat' не пусты, то 
        // применяем к отсортированному списку фильтрацию по этим пармаетрам
        if(state.sort[el]){
          state.sortedUsers = state.sortedUsers
                                .filter(user => user[el] === state.sort[el]);
        }
      });

      // Если значение order не пустое, то применяем 
      // к отсортированному списку фильтрацию по order
      if(state.sort.order) {
        const sorted = state.sortedUsers
                              .sort((a, b) => {
                                // Получаем полное имя текущего элемента
                                const fullNameA = `${a.name.first} ${a.name.last}`;
                                // Получаем полное имя следующего элемента
                                const fullNameB = `${b.name.first} ${b.name.last}`;
                                // Вычитаем для сортировки
                                return fullNameA > fullNameB ? 1 : fullNameA < fullNameB ? -1 : 0
                              });
        // Если у нас сортировка по возрастанию, то добавляем в state массив sorted 
        if(state.sort.order === 'asc') {
          state.sortedUsers = sorted;
        } else {
          // Иначе добавляем перевернутый массив sorted 
          state.sortedUsers = sorted.reverse();
        }
        
      };
    },

    // Функция сортировки по изначальному параметру пола контакта
    sortUsersByGender(state, { key, value }){
      // Добавляем значение имени в state для других сортировок
      state.sort[key] = value;

      // Если value не пустое, сортируем исходный массив, получая только 
      // те контакты которые соответствуют
      // входящему значению
      if(value) {
        state.sortedUsers = state.users
                                .filter(user => user.gender === value);
      } else {
        // Если значения нет, добавляем исходный массив в отсортированный
        state.sort[key] = '';
        state.sortedUsers = state.users;
      }
      
      // Если значение имени не пустое то 
      // фильтруем отсортированный массив
      if(state.sort.name) {
        state.sortedUsers = state.sortedUsers
                                .filter(user => {
                                  // Конкатенируем полное имя
                                  let fullName = `${user.name.first} ${user.name.last}`;
                                  // Проверяем начинается ли оно на то значение которое у нас есть в state
                                  return fullName.startsWith(state.sort.name);
                                });
      };

      // Если значение в state 'nat' не пустое, то 
      // применяем к отсортированному списку фильтрацию по этому параметру
      if(state.sort.nat) {
        state.sortedUsers = state.sortedUsers
                                  .filter(user => user.nat === state.sort.nat);
      };

      // Если значение order не пустое, то применяем 
      // к отсортированному списку фильтрацию по order
      if(state.sort.order) {
        const sorted = state.sortedUsers
                              .sort((a, b) => {
                                // Получаем полное имя текущего элемента
                                const fullNameA = `${a.name.first} ${a.name.last}`;
                                // Получаем полное имя следующего элемента
                                const fullNameB = `${b.name.first} ${b.name.last}`;
                                // Вычитаем для сортировки
                                return fullNameA > fullNameB ? 1 : fullNameA < fullNameB ? -1 : 0
                              });
        // Если у нас сортировка по возрастанию, то добавляем в state массив sorted 
        if(state.sort.order === 'asc') {
          state.sortedUsers = sorted;
        } else {
          // Иначе добавляем перевернутый массив sorted 
          state.sortedUsers = sorted.reverse();
        }
        
      };
    },

    sortUsersByNational(state, { key, value }){
      // Добавляем значение имени в state для других сортировок
      state.sort[key] = value;
      // Если value не пустое, сортируем отсортированный массив, получая только 
      // те контакты которые соответствуют
      // входящему значению
      if(value) {
        state.sortedUsers = state.users
                                .filter(user => user.nat === value);
      } else {
        // Если значения нет, добавляем исходный массив в отсортированный
        state.sort[key] = '';
        state.sortedUsers = state.users;
      }
      
      // Если значение имени не пустое то 
      // фильтруем отсортированный массив
      if(state.sort.name) {
        state.sortedUsers = state.sortedUsers
                                .filter(user => {
                                  // Конкатенируем полное имя
                                  let fullName = `${user.name.first} ${user.name.last}`;
                                  // Проверяем начинается ли оно на то значение которое у нас есть в state
                                  return fullName.startsWith(state.sort.name);
                                });
      };

      // Если значение в state 'gender' не пустое, то 
      // применяем к отсортированному списку фильтрацию по этому параметру
      if(state.sort.gender) {
        state.sortedUsers = state.sortedUsers
                                  .filter(user => user.gender === state.sort.gender);
      };

      // Если значение order не пустое, то применяем 
      // к отсортированному списку фильтрацию по order
      if(state.sort.order) {
        const sorted = state.sortedUsers
                              .sort((a, b) => {
                                // Получаем полное имя текущего элемента
                                const fullNameA = `${a.name.first} ${a.name.last}`;
                                // Получаем полное имя следующего элемента
                                const fullNameB = `${b.name.first} ${b.name.last}`;
                                // Вычитаем для сортировки
                                return fullNameA > fullNameB ? 1 : fullNameA < fullNameB ? -1 : 0
                              });
        // Если у нас сортировка по возрастанию, то добавляем в state массив sorted 
        if(state.sort.order === 'asc') {
          state.sortedUsers = sorted;
        } else {
          // Иначе добавляем перевернутый массив sorted 
          state.sortedUsers = sorted.reverse();
        }
        
      };
    },

    sortUsersByOrder(state, { key, value }){
      // Добавляем значение имени в state для других сортировок
      state.sort[key] = value;
      
      // Если value не пустое, сортируем исходный массив, получая только 
      // те контакты которые соответствуют
      // входящему значению
      if(value) {
        const sorted = [...state.users]
                              .sort((a, b) => {
                                // Получаем полное имя текущего элемента
                                const fullNameA = `${a.name.first} ${a.name.last}`;
                                // Получаем полное имя следующего элемента
                                const fullNameB = `${b.name.first} ${b.name.last}`;
                                // Вычитаем для сортировки
                                return fullNameA > fullNameB ? 1 : fullNameA < fullNameB ? -1 : 0
                              });
        // Если у нас сортировка по возрастанию, то добавляем в state массив sorted 
        if(state.sort.order === 'asc') {
          state.sortedUsers = sorted;
        } else {
          // Иначе добавляем перевернутый массив sorted 
          state.sortedUsers = sorted.reverse();
        }

      } else {
        // Если значения нет, добавляем исходный массив в отсортированный
        state.sort[key] = '';
        state.sortedUsers = state.users;
      }
      
      // Если значение имени не пустое то 
      // фильтруем отсортированный массив
      if(state.sort.name) {
        state.sortedUsers = state.sortedUsers
                                .filter(user => {
                                  // Конкатенируем полное имя
                                  let fullName = `${user.name.first} ${user.name.last}`;
                                  // Проверяем начинается ли оно на то значение которое у нас есть в state
                                  return fullName.startsWith(state.sort.name);
                                });
      };

      // Пробегаемся по массиву sortKeysList, в котором у нас есть элементы 'gender', 'nat'
      sortKeysList.forEach(el => {
        // Если значение в state 'gender' и 'nat' не пусты, то 
        // применяем к отсортированному списку фильтрацию по этим пармаетрам
        if(state.sort[el]){
          state.sortedUsers = state.sortedUsers
                                .filter(user => user[el] === state.sort[el]);
        }
      });
    },

    // Устанавливаем список контактов на первыую страницу из отсортированного массива
    setUsersPage(state){
      const start = 0 * state.usersOnPage;
      const end = state.usersOnPage;

      state.pageUsers = state.sortedUsers.slice(start, end);
    }
  },

  actions: {
    // Получаем список контактов от сервера
    async fetchUsersData(ctx){
      try {
        // Делаем запрос
        const resp = await $axios.get('');

        // Устанавливаем список контактов в state 
        ctx.commit('setUsersData', resp.data);
        // Добавляем контакты в список страницы
        ctx.commit('setUsersPage');
        // Создаем массив с национальностями для фильтров
        ctx.commit('createNationalArray');
      } catch (error) {
        
      }
    },

    // Сортируем пользователей
    sortUsers(ctx, payload){
      // По имени
      if(payload.key === 'name') ctx.commit('sortUsersByName', payload);
      // По полу
      else if(payload.key === 'gender') ctx.commit('sortUsersByGender', payload);
      // По национальности
      else if(payload.key === 'nat') ctx.commit('sortUsersByNational', payload);
      // Имена по порядку
      else if(payload.key === 'order') ctx.commit('sortUsersByOrder', payload);

      // Добавляем отсортированных пользователей на страницу 
      ctx.commit('setUsersPage');
    }
  },
}