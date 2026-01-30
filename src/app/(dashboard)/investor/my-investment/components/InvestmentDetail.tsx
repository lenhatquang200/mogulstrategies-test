type DetailItem = {
  label: string;
  value: string;
};

export default function InvestmentDetails({
  items,
}: {
  items: DetailItem[];
}) {
  return (
    <div className="investment-details">
      {items.map((item, index) => (
        <div className="detail-group" key={index}>
          <div className="detail-label">{item.label}</div>
          <div className="detail-value">{item.value}</div>
        </div>
      ))}
    </div>
  );
}
