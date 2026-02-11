import PageTitle from "@/components/admin/PageTitle"
import KycDetail from "./KycDetail"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return <><PageTitle>KYC & Accreditation</PageTitle><KycDetail id={id} /></>
}
