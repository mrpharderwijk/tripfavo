import { getSession } from "@/actions/get-current-user"
import { redirect, usePathname } from "next/navigation"

export default async function GuestPage() {
  return <div>Dashboard</div>
}
