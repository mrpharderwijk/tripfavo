'use client'

import * as React from 'react'
import { ReactElement, SVGProps } from 'react'

export function SvgTripfavoLight(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg
      width={props.width || 32}
      height={props.height || 32}
      viewBox="0 0 554 501"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_4_13"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="6"
        y="-1"
        width="548"
        height="502"
      >
        <path
          d="M23 0H553C491.5 146.5 358.1 445.6 348.5 470C338.9 494.4 296.5 500.167 272.5 500C162.1 500 152.167 417 161 375.5L203 232.5C161 232.5 104.308 228.528 53 184.5C1.69199 140.472 7 88 7 70C7 52 14.5 18.3333 23 0Z"
          fill="#D9D9D9"
          stroke="white"
        />
      </mask>
      <g mask="url(#mask0_4_13)">
        <rect x="-192" width="751" height="233" fill="#67E8F9" />
        <path d="M202 233L553.5 0V233H202Z" fill="#22D3EE" />
      </g>
      <mask
        id="mask1_4_13"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="554"
        height="501"
      >
        <path
          d="M23 0H553C491.5 146.5 361.839 447.426 348.5 470C335.161 492.574 296.5 500.167 272.5 500C162.1 500 152.167 417 161 375.5L203 232.5C161 232.5 83 232.5 106 145.5C23 145.5 0.5 94.5 0.5 76.5C0.5 58.5 14.5 18.3333 23 0Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask1_4_13)">
        <rect x="157" y="233" width="302" height="267" fill="#CBD5E1" />
        <path
          d="M370.5 430.5L202 233L120 284.5L108 519H363L370.5 430.5Z"
          fill="#F8FAFC"
        />
      </g>
    </svg>
  )
}
