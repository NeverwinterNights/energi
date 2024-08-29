import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { AdvertCard } from "@/components/advert-card";
import { Typography } from "@/components/ui";
import {
  fetchAdvertsWithPagination,
  getAllAdverts,
  getLastVisible,
} from "@/store/advert-slice";
import { fetchCurrentUser, getUserData } from "@/store/auth-slice";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";

import s from "./adverts-component.module.scss";

export const AdvertsComponent = memo(() => {
  const dispatch = useAppDispatch();
  const adverts = useSelector(getAllAdverts);
  const lastVisible = useSelector(getLastVisible);
  const isLoading = useSelector((state: RootState) => state.app.isLoading);

  const user = useAppSelector(getUserData);

  console.log("adverts", adverts);
  useEffect(() => {
    // Проверка авторизации при монтировании компонента
    dispatch(fetchCurrentUser());
  }, [dispatch]);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    // Загружаем первую порцию данных
    dispatch(fetchAdvertsWithPagination({ limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      // Проверяем, достиг ли пользователь низа страницы
      const scrollPosition =
        window.innerHeight + document.documentElement.scrollTop;
      const bottomPosition = document.documentElement.offsetHeight;

      if (
        scrollPosition >= bottomPosition - 100 &&
        !isLoading &&
        lastVisible &&
        !loadingMore
      ) {
        setLoadingMore(true);
        dispatch(
          fetchAdvertsWithPagination({ limit: 10, startAfter: lastVisible }),
        ).finally(() => setLoadingMore(false));
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch, lastVisible, isLoading, loadingMore]);

  return (
    <div className={s.container}>
      <Typography className={s.title} variant={"bold_text_16"}>
        Users Adverts
      </Typography>
      <div className={s.root}>
        {adverts.map((advert) => (
          <AdvertCard
            isMyAdvert={user?.uid === advert.userId}
            className={s.items}
            advert={advert}
            key={advert.id}
          />
        ))}
      </div>
      {isLoading && <p>Loading...</p>}
    </div>
  );
});
