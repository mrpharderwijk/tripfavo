'use client'

import axios from 'axios'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { ReactElement, useState } from 'react'
import { UploadedFileData } from 'uploadthing/types'

import { DotLoader } from '@/components/atoms/dot-loader/dot-loader'
import { Body } from '@/components/atoms/typography/body/body'
import { Button } from '@/components/molecules/buttons/button'
import { ModalDialog } from '@/components/molecules/modal-dialog/modal-dialog'
import { UserName } from '@/components/molecules/user-name/user-name'
import { SettingsLine } from '@/features/account-settings/components/settings-line/settings-line'
import { LegalNameForm } from '@/features/account-settings/personal-info/components/legal-name-form/legal-name-form'
import { usePersonalInfoContext } from '@/features/account-settings/personal-info/providers/personal-info-context-provider'
import { useDialogContext } from '@/features/nav-bar/providers/dialog-context-provider'
import { useAppContext } from '@/providers/app-context-provider/app-context-provider'
import { UploadDropzone } from '@/utils/uploadthing'

export function PersonalInfo(): ReactElement {
  const { currentUser } = useAppContext()
  const { currentEditMode, enableEditMode, disableEditMode } =
    usePersonalInfoContext()
  const { openDialog, closeDialog, currentOpenDialog } = useDialogContext()
  const [profileImage, setProfileImage] = useState<string | null>(
    currentUser?.profileImage?.url ?? null,
  )
  const [profileImageUploading, setProfileImageUploading] = useState(false)
  const tPersonalInfo = useTranslations('personal-info')
  const tCommonForms = useTranslations('common.forms')

  function handleOnClick(value: string): void {
    if (!value || value === currentEditMode) {
      disableEditMode()
      return
    }

    enableEditMode(value)
  }

  async function handleOnClientUploadComplete(
    res: UploadedFileData[],
  ): Promise<void> {
    try {
      const file = res[0]
      const response = await axios.post(`/api/user/profile-image`, {
        image: {
          url: file.ufsUrl,
          fileHash: file.fileHash,
          fileKey: file.key,
          fileName: file.name,
          fileType: file.type,
          size: file.size,
          alt: '',
        },
      })

      setProfileImage(response.data.profileImage.url)
      closeDialog()
      setProfileImageUploading(false)
    } catch (error: any) {
      setProfileImageUploading(false)
      return
    }
  }

  function handleOnBeforeUploadBegin(files: File[]): File[] {
    setProfileImageUploading(true)
    // Preprocess files before uploading (e.g. rename them)
    return files.map(
      (f) => new File([f], `${currentUser?.id}-${f.name}`, { type: f.type }),
    )
  }

  return (
    <>
      <div className="flex flex-col gap-2 items-center justify-center w-full border-b border-deco pb-6">
        {profileImageUploading && <DotLoader />}
        <Image
          className="aspect-square rounded-full object-cover"
          src={profileImage ?? '/placeholder.png'}
          alt="User Image"
          width={100}
          height={100}
        />
        <Button
          variant="primary-link"
          onClick={() => openDialog('profile-image')}
        >
          {tCommonForms('edit')}
        </Button>
        <ModalDialog
          isVisible={currentOpenDialog === 'profile-image'}
          header={<>Upload/edit your profile image</>}
          onClose={closeDialog}
        >
          <UploadDropzone
            endpoint="profileImageUploader"
            onClientUploadComplete={handleOnClientUploadComplete}
            onUploadError={() => setProfileImageUploading(false)}
            onBeforeUploadBegin={handleOnBeforeUploadBegin}
          />
        </ModalDialog>
      </div>

      <SettingsLine
        editMode={currentEditMode === 'legal-name'}
        handleOnClick={() => handleOnClick('legal-name')}
        label={tPersonalInfo('legal-name.label')}
        value={<UserName color="secondary" name={currentUser?.name ?? null} />}
        formIntro={tPersonalInfo('legal-name.formIntro')}
        form={<LegalNameForm />}
      />

      <SettingsLine
        editMode={currentEditMode === 'email'}
        label={tCommonForms('email.label')}
        value={
          <Body tag="span" color="secondary" size="base-md">
            {currentUser?.email}
          </Body>
        }
      />
    </>
  )
}
