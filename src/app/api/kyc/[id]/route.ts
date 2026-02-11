import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

/* ===============================
   GET KYC DETAIL
================================ */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const kyc = await prisma.kyc.findUnique({
      where: { id: Number(id) },
      include: {
        user: true,
        KycDocument: true,
      },
    })

    if (!kyc) {
      return new Response("Not found", { status: 404 })
    }

    return Response.json(kyc)
  } catch (error) {
    return new Response("Server error", { status: 500 })
  }
}


/* ===============================
   PATCH UPDATE STATUS
================================ */
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()
    const { type, value } = body

    const updateData: any = {}

    if (type === "identity") {
      updateData.identityStatus = value
    }

    if (type === "accreditation") {
      updateData.accreditationStatus = value
    }

    const updated = await prisma.kyc.update({
      where: { id: Number(params.id) },
      data: updateData,
    })

    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json(
      { message: "Update failed" },
      { status: 500 }
    )
  }
}
