import { SVGProps } from 'react'

export const ClosedInputIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg height={16} width={16} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <g>
      <path
        d={
          'm8.94 8 2.87-2.86a.67.67 0 0 0-.95-.95L8 7.06 5.14 4.19a.67.67 0 0 0-.95.95L7.06 8l-2.87 2.86A.67.67 0 0 0 4.67 12a.67.67 0 0 0 .47-.2L8 8.95l2.86 2.87a.67.67 0 1 0 .95-.95L8.94 8Z'
        }
        fill={'#fff'}
      />
    </g>
    <defs>
      <clipPath id={'a'}>
        <path d={'M0 0h16v16H0z'} fill={'#fff'} />
      </clipPath>
    </defs>
  </svg>
)
