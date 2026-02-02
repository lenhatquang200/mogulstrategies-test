export function mapAccreditation(status: string) {
  const map: Record<string, string> = {
    accredited_individual: "Accredited Individual Investor",
    family_office: "Family Office",
    institutional: "Institutional Investor",
    advisor: "Registered Investment Advisor",
    individual: "Individual Investor",
  };

  return map[status] || "Individual Investor";
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
