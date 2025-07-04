'use client'

import Image from 'next/image'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { LocalizedPropertyLink } from '@/components/molecules/localized-property-link/localized-property-link'
import { PublicProperty } from '@/features/properties/types/public-property'

interface PropertiesListProps {
  properties: PublicProperty[]
}

export function PropertiesList({
  properties,
}: PropertiesListProps): ReactElement {
  return (
    <section className="w-full">
      {!properties?.length && <div>no properties found</div>}
      {properties?.map((property, idx) => (
        <LocalizedPropertyLink
          key={`${property.id}-${idx}`}
          className="group cursor-pointer w-full"
          propertyId={property.id}
        >
          <FlexBox flex-direction="col" gap={4}>
            <div className="w-full relative overflow-hidden rounded-2xl">
              <Image
                src={
                  property.images.length
                    ? (property.images.find((image) => image.isMain)?.url ??
                      property.images[0].url)
                    : ''
                }
                alt={''}
                className="aspect-square object-cover w-full h-full transition group-hover:scale-110"
                width={1024}
                height={768}
              />
              {/* <div
                className="absolute top-3 right-3 p-1.5 rounded-full bg-white/40 hover:bg-white/60"
                aria-label="Add to favorites"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </div> */}
            </div>

            <FlexBox flex-direction="col" gap="0.5">
              <Heading tag="h3" like="h6" color="primary" font-weight="bold">
                {property.title}
              </Heading>

              <Body
                size="base-lg"
                color="secondary"
                text-align="left"
                font-weight="semibold"
              >
                4 km from Monaco
              </Body>

              <FlexBox flex-direction="row" gap={2} align-items="center">
                <FlexBoxItem display="flex" flex-direction="row" gap={1}>
                  <Body size="base-md" color="secondary" text-align="left">
                    &euro; {property.priceDetails[0].price}
                  </Body>
                  <Body size="base-md" color="secondary" text-align="left">
                    per night
                  </Body>
                </FlexBoxItem>

                {/* TODO: Rating */}
                {/* <FlexBoxItem display="flex" flex-direction="row" align-items="center" gap={1}>
                  <Body size="base-md" color="secondary" text-align="left">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Body>
                  <Body size="base-md" color="secondary" text-align="left">
                    4.9
                  </Body>
                </FlexBoxItem> */}
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </LocalizedPropertyLink>
      ))}
    </section>
  )
}
