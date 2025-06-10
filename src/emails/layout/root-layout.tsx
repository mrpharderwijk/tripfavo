import { Body, Font, Head, Html, Preview, Tailwind } from "@react-email/components";
import Header from "@/emails/layout/header";
import { PropsWithChildren } from "react";

export default function RootLayout({ children, previewText }: PropsWithChildren<{ previewText?: string }>) {
  return (
    <Html>
    <Head />
    <Font
        fontFamily="Plus Jakarta Sans"
        fallbackFontFamily="Verdana"
        webFont={{
          url: "https://fonts.gstatic.com/s/plusjakartasans/v11/LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko20yygg_vb.woff2",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />

    <Body>
      <Tailwind>
        {!!previewText && (
          <Preview>{previewText}</Preview>
        )}
        <Header />

        {children}
      </Tailwind>
    </Body>
  </Html>
  )
}