import { useEffect, useState } from "react";

import { hoursTime, min } from "@/consts/time-declination";

export const useTimeAgo = (createdAt: Date) => {
  const [timeAgo, setTimeAgo] = useState<string>("");

  useEffect(() => {
    const calculateTimeAgo = () => {
      const difference = new Date().getTime() - new Date(createdAt).getTime();
      const sec = Math.round(difference / 1000);

      if (sec < 60) {
        setTimeAgo("Less than a minute ago");

        return;
      }
      const minutes = Math.round(sec / 60);

      if (minutes < 60) {
        let label = "minutes";

        switch (true) {
          case minutes === 1:
            label = "minute";
            break;
          case min.minut.includes(minutes):
            label = "minutes";
            break;
          case min.minuteB.includes(minutes):
            label = "minutes";
            break;
          case min.minuteU.includes(minutes):
            label = "minutes";
            break;
        }

        setTimeAgo(`${minutes} ${label} ago`);

        return;
      }

      const hours = Math.round(minutes / 60);

      if (hours < 24) {
        let label = "hours";

        switch (hours) {
          case 1:
            label = "hour";
            break;
          case 21:
            label = "hours";
            break;
          default:
            if (hoursTime.hours.includes(hours)) {
              label = "hours";
            }
        }

        setTimeAgo(`${hours} ${label} ago`);

        return;
      }

      const days = Math.round(hours / 24);

      if (days < 14) {
        let label;

        switch (days) {
          case 1:
            label = "day";
            break;
          case 2:
          case 3:
          case 4:
            label = "days";
            break;
          default:
            label = "days";
        }

        setTimeAgo(`${days} ${label} ago`);

        return;
      }

      setTimeAgo("More than 2 weeks ago");
    };

    calculateTimeAgo();
  }, [createdAt]);

  return timeAgo;
};
