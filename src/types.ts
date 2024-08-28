export type User = {
  uid: string;
  email: null | string;
  firstName: string;
  lastName: string;
  phone: string;
  username: string;
  createdAt?: string;
  posts: number;
};

export type Advertisement = {
  id: string;
  title: string;
  description: string;
  price: number;
  // Добавляем информацию о пользователе
  userId: string; // ID пользователя, к которому принадлежит объявление
  username: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  photoUrl?: string; // Опциональная фотография товара
};

// Тип объявления
export type Advert = {
  category: string;
  created: string;
  description: string;
  id: string;
  modified: string;
  price: number;
  title: string;
  views: number;
  userId: string;
};

// Расширенная структура стейта
export type AdvertState = {
  advertByAllUser: { [key: string]: Advert[] };
  advertById: { [key: string]: Advert[] };
  allAdverts: Advert[];
  lastVisible: null | string; // ID последнего видимого объявления для пагинации
};

export type FetchAdvertsParams = {
  limit?: number; // Количество объявлений на страницу, с дефолтным значением
  startAfter?: string; // ID последнего объявления на предыдущей странице
};
