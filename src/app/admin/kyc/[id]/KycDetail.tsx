"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function KycDetail({ id }: { id: string }) {
  const router = useRouter()

  const [kyc, setKyc] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/kyc/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setKyc(data)
        setLoading(false)
      })
  }, [id])

  async function updateStatus(type: string, value: string) {
    await fetch(`/api/kyc/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, value }),
    })

    router.refresh()
  }

  if (loading) return <div className="p-8">Loading...</div>
  if (!kyc) return <div className="p-8">Not found</div>

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">

      {/* ===== HEADER ===== */}
      <div className="bg-slate-900 rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-white"> {kyc.entityName || `${kyc.firstName} ${kyc.lastName}`}</h1>
            <p className="text-slate-400 mt-1">
              Type: {kyc.entityType ?? "Individual"}
            </p>
            <p className="text-slate-500 text-sm mt-2">
              Submitted: {(kyc.submittedAt)}
            </p>
          </div>

          <div className="flex gap-2">
            <StatusBadge status={kyc.identityStatus} />
            <StatusBadge status={kyc.accreditationStatus} />
          </div>
        </div>
      </div>

      {/* ===== PERSONAL INFO ===== */}
      <Card title="Personal Information">
        <Info label="First Name" value={kyc.firstName} />
        <Info label="Last Name" value={kyc.lastName} />
        <Info label="Date of Birth" value={(kyc.dateOfBirth)} />
        <Info label="Nationality" value={kyc.nationality} />
        <Info label="Address" value={kyc.address} />
        <Info label="Phone" value={kyc.phone} />
      </Card>

      {/* ===== IDENTITY ===== */}
      <Card title="Identity Verification">
        <Info label="Document Type" value={kyc.documentType} />

        <div className="grid grid-cols-2 gap-4 mt-4">
          {kyc.KycDocument?.length > 0 ? (
            kyc.KycDocument.map((doc: any) => (
              <a
                key={doc.id}
                href={doc.url}
                target="_blank"
                className="bg-slate-800 p-4 rounded-lg hover:bg-slate-700 transition"
              >
                {doc.type}
              </a>
            ))
          ) : (
            <p className="text-slate-500">No documents uploaded</p>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => updateStatus("identity", "verified")}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white disabled:opacity-50"
          >
            Approve Identity
          </button>

          <button
            onClick={() => updateStatus("identity", "rejected")}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white disabled:opacity-50"
          >
            Reject
          </button>
        </div>
      </Card>

      {/* ===== ACCREDITATION ===== */}
      <Card title="Accreditation">
        <Info label="Entity Type" value={kyc.entityType} />

        {kyc.entityType === "individual" ? (
          <Info label="Criteria" value={kyc.individualCriteria} />
        ) : (
          <>
            <Info label="Entity Name" value={kyc.entityName} />
            <Info label="Legal Type" value={kyc.entityLegalType} />
            <Info
              label="Formation Date"
              value={(kyc.formationDate)}
            />
            <Info label="Jurisdiction" value={kyc.jurisdiction} />
            <Info label="Total Assets" value={kyc.totalAssets} />
          </>
        )}

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => updateStatus("accreditation", "approved")}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white disabled:opacity-50"
          >
            Approve Accreditation
          </button>

          <button
            onClick={() => updateStatus("accreditation", "rejected")}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white disabled:opacity-50"
          >
            Reject
          </button>
        </div>
      </Card>
    </div>
  )
}

/* ========================= */

function Card({ title, children }: any) {
  return (
    <div className="bg-slate-900 rounded-xl p-6 shadow-lg">
      <h2 className="text-lg font-semibold text-white mb-4">{title}</h2>
      <div className="space-y-2 text-slate-300">{children}</div>
    </div>
  )
}

function Info({ label, value }: any) {
  return (
    <div className="flex justify-between border-b border-slate-800 py-2">
      <span className="text-slate-400">{label}</span>
      <span className="text-white">{value || "-"}</span>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "bg-gray-600",
    under_review: "bg-yellow-600",
    verified: "bg-green-600",
    approved: "bg-green-600",
    rejected: "bg-red-600",
  }

  const color = colors[status] || "bg-gray-700"

  return (
    <span className={`px-3 py-1 text-sm rounded-full text-white ${color}`}>
      {status}
    </span>
  )
}
