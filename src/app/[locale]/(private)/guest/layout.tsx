import { GuestSidebar } from "@/features/guest/components/guest-sidebar/guest-sidebar";
import { AppShell } from "@/components/molecules/layout/app-shell/app-shell";
import { PropsWithChildren } from "react";
import { getTranslations } from "next-intl/server";

export default async function GuestLayout({ children }: Readonly<PropsWithChildren>) {
  const tGuest = await getTranslations('guest')
  
  return (
    <AppShell sidebar={<GuestSidebar heading={tGuest('heading')} />}>
      {children}
    </AppShell>
  )
}