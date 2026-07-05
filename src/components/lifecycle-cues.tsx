import { lifecycleCues } from "../lib/cbmp";

const roleLabels = [
  "Competition Hosts",
  "Organization Admins",
  "Scrutineers",
  "Judges",
  "Deck Captains",
  "Competitors",
];

export function LifecycleCues() {
  return (
    <section className="home-ledger" aria-labelledby="lifecycle-heading">
      <div className="home-ledger__section">
        <div className="home-ledger__heading">
          <h2 id="lifecycle-heading">Competition Lifecycle</h2>
        </div>

        <ul className="lifecycle-list">
          {lifecycleCues.map((cue) => (
            <li className="lifecycle-item" data-tone={cue.tone} key={cue.key}>
              <span className="status-dot" aria-hidden="true" />
              <span>
                <strong>{cue.label}</strong>
                <span>{cue.description}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="home-ledger__section">
        <div className="home-ledger__heading">
          <h2>Built for every role on the floor</h2>
          <p>
            One coordinated system, scoped to what each person needs during a
            live event.
          </p>
        </div>

        <div className="role-chip-list" aria-label="CBMP role surfaces">
          {roleLabels.map((label) => (
            <span className="role-chip" key={label}>
              {label}
            </span>
          ))}
        </div>

        <p className="home-ledger__note">
          Sign-in via Clerk | Data via Convex | Platform administration is
          handled separately.
        </p>
      </div>
    </section>
  );
}
