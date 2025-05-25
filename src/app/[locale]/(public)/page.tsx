import Image from 'next/image'

import { Container } from '@/components/atoms/layout/container/container'

export default function Home() {
  return (
    <Container>
      <div className="flex flex-row items-center justify-start flex-wrap gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="aspect-square w-80 relative overflow-hidden rounded-xl">
              <Image
                src={`https://picsum.photos/320`}
                alt="Property"
                className="object-cover w-full h-full transition group-hover:scale-110 rounded-md"
                width={320}
                height={320}
              />
              <button
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
              </button>
            </div>
            <div className="mt-3 space-y-1">
              <div className="flex justify-between">
                <h3 className="font-semibold">Beautiful Villa in Nice</h3>
                <div className="flex items-center gap-1">
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
                  <span>4.9</span>
                </div>
              </div>
              <p className="text-gray-500">5km from center</p>
              <p className="text-gray-500">Oct 15-20</p>
              <p className="mt-2">
                <span className="font-semibold">€120</span>
                <span className="text-gray-500"> night</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}
