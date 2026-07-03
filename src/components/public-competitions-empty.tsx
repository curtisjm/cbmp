import { ClipboardList } from "lucide-react";

type PublicCompetitionsEmptyProps = {
  ariaLabel: string;
  description: string;
};

export function PublicCompetitionsEmpty({
  ariaLabel,
  description,
}: PublicCompetitionsEmptyProps) {
  return (
    <div className="empty-table" aria-label={ariaLabel}>
      <div className="empty-table__head" role="presentation">
        <span>Competition</span>
        <span>Competition Lifecycle</span>
        <span>Host Organization</span>
        <span>Route</span>
      </div>
      <div className="empty-state">
        <div>
          <span className="empty-state__icon">
            <ClipboardList aria-hidden="true" />
          </span>
          <h2>No public Competitions yet</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
