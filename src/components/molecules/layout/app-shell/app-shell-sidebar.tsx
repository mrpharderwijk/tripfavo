import { FlexBox } from "@/components/atoms/layout/flex-box/flex-box";
import { Heading } from "@/components/atoms/typography/heading/heading";
import { PropsWithChildren } from "react";

type SidebarProps = PropsWithChildren<{
  heading?: string
}>

export function AppShellSidebar({ children, heading }: SidebarProps) {
  return (
    <>
      {heading && (
        <Heading tag="h2" like="h4" color="primary" font-weight="bold">
          {heading}
        </Heading>
      )}
      
      {children}
    </>
  )
}