export type User = {
  uid: string;
  email: string | null;
  firstName: string;
  lastName: string;
  phone: string;
  username: string;
  createdAt?: string;
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
