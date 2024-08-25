import { useEffect } from "react";

import { Loader } from "@/components/loader";
import { Typography } from "@/components/ui";
import { UserCard } from "@/components/user-card";
import { getIsLoading } from "@/store/app-slice";
import { fetchCurrentUser, getUserData } from "@/store/auth-slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchAllUsers, getAllUsers } from "@/store/user-slice";

import s from "./main-component.module.scss";

export const MainComponent = () => {
  const users = useAppSelector(getUserData);
  const allUsers = useAppSelector(getAllUsers);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getIsLoading);
  // const userIsAuthenticated = useAppSelector(isAuth);

  useEffect(() => {
    // Проверка авторизации при монтировании компонента
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={s.root}>
      <Typography
        className={s.title}
        as={"h1"}
        variant={"bold_text_16"}
      >{`Hello, ${
        users?.username == undefined ? "Guest" : users?.username
      }`}</Typography>

      <section className={s.popularUsers}>
        <Typography as={"h2"} variant={"bold_text_16"}>
          Популярные пользователи
        </Typography>
        <div className={s.userCards}>
          {allUsers.map((user) => (
            <UserCard key={user.uid} user={user} />
          ))}
        </div>
        <a href={"/users"} className={s.viewAll}>
          Просмотреть всех пользователей
        </a>
      </section>

      <section className={s.randomAds}>
        <Typography as={"h2"} variant={"bold_text_16"}>
          Последние объявления
        </Typography>
        <div className={s.adCards}>{/* Карточки объявлений */}</div>
        <a href={"/ads"} className={s.viewAll}>
          Просмотреть все объявления
        </a>
      </section>

      <section className={s.benefits}>
        <Typography as={"h2"} variant={"bold_text_16"}>
          Почему стоит зарегистрироваться?
        </Typography>
        <ul>
          <li>Создавайте объявления</li>
          <li>Взаимодействуйте с пользователями</li>
          <li>Получайте уведомления</li>
          <li>Следите за интересующими вас темами</li>
        </ul>
      </section>

      <section className={s.testimonials}>
        <Typography as={"h2"} variant={"bold_text_16"}>
          Что говорят наши пользователи
        </Typography>
        <div className={s.testimonialCards}>{/* Карточки с отзывами */}</div>
      </section>

      <section className={s.faq}>
        <Typography as={"h2"} variant={"bold_text_16"}>
          Как это работает?
        </Typography>
        <p>Краткое объяснение процесса использования платформы.</p>
      </section>

      <footer>
        <div className={s.links}>
          <a href={"/about"}>О нас</a>
          <a href={"/contact"}>Контакты</a>
          <a href={"/help"}>Помощь</a>
          <a href={"/privacy"}>Политика конфиденциальности</a>
        </div>
      </footer>
    </div>
  );
};
