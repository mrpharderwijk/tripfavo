'use client'
import { useTranslations } from 'next-intl'
import { ReactElement, useCallback } from 'react'

declare global {
  var cloudinary: any
}
import { UploadButton } from '@/utils/uploadthing'

type ImageUploadProps = {
  onChange: (value: string) => void
  value: string
}

export function ImageUpload({
  onChange,
  value,
}: ImageUploadProps): ReactElement {
  const tCommon = useTranslations('common')

  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url)
    },
    [onChange],
  )

  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log('Files: ', res)
        alert('Upload Completed')
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`)
      }}
    />
  )
}
