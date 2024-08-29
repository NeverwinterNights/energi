import { SVGProps, memo } from "react";

const Person = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
    {...props}
  >
    <path
      d={
        "M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
      }
      fill={"currentColor"}
    />
    <path
      d={
        "M16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13Z"
      }
      fill={"currentColor"}
    />
    <path
      d={
        "M8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13Z"
      }
      fill={"currentColor"}
    />
    <path
      d={
        "M19.07 4.92999C17.4292 3.27849 15.2636 2.2512 12.9466 2.02523C10.6296 1.79926 8.30634 2.38877 6.37738 3.69212C4.44842 4.99548 3.03463 6.931 2.37976 9.165C1.72489 11.399 1.86997 13.7915 2.79 15.93C2.88589 16.1288 2.91735 16.3525 2.88 16.57L2 20.8C1.96609 20.9622 1.97302 21.1302 2.02014 21.2891C2.06727 21.4479 2.15313 21.5925 2.27 21.71C2.3658 21.8051 2.47987 21.8798 2.60533 21.9297C2.73079 21.9795 2.86504 22.0034 3 22H3.2L7.48 21.14C7.69753 21.1138 7.91812 21.1449 8.12 21.23C10.2585 22.15 12.651 22.2951 14.885 21.6402C17.119 20.9854 19.0545 19.5716 20.3579 17.6426C21.6612 15.7136 22.2507 13.3904 22.0248 11.0734C21.7988 8.75635 20.7715 6.59078 19.12 4.94999L19.07 4.92999ZM19.9 13.29C19.7045 14.484 19.2407 15.6181 18.5435 16.6069C17.8464 17.5957 16.934 18.4136 15.8751 18.9988C14.8162 19.5841 13.6384 19.9216 12.4302 19.9859C11.222 20.0502 10.015 19.8396 8.9 19.37C8.50454 19.2018 8.07973 19.1134 7.65 19.11C7.46228 19.1113 7.27498 19.128 7.09 19.16L4.27 19.73L4.84 16.91C4.95352 16.2993 4.88034 15.6685 4.63 15.1C4.16039 13.985 3.9498 12.7779 4.01409 11.5698C4.07837 10.3616 4.41586 9.18374 5.00114 8.12484C5.58642 7.06595 6.40425 6.15359 7.39309 5.45644C8.38193 4.75929 9.51602 4.29551 10.71 4.09999C11.9633 3.89431 13.2475 3.98997 14.4565 4.37905C15.6654 4.76814 16.7644 5.43948 17.6625 6.33753C18.5605 7.23558 19.2318 8.33454 19.6209 9.54351C20.01 10.7525 20.1057 12.0367 19.9 13.29Z"
      }
      fill={"currentColor"}
    />
  </svg>
);
const Memo = memo(Person);

export { Memo as Person };
