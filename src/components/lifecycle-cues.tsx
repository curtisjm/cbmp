import { CircleDot } from "lucide-react";

import { lifecycleCues } from "../lib/cbmp";

export function LifecycleCues() {
  return (
    <section className="lifecycle-panel" aria-labelledby="lifecycle-heading">
      <div className="surface-heading">
        <div>
          <h2 id="lifecycle-heading">Competition Lifecycle</h2>
          <p>Public state names remain visible with each cue.</p>
        </div>
        <span className="route-chip">public route</span>
      </div>

      <div className="lifecycle-grid">
        {lifecycleCues.map((cue) => (
          <article className="lifecycle-item" data-tone={cue.tone} key={cue.key}>
            <div className="lifecycle-item__meta">
              <span className="route-chip route-chip--muted">{cue.routeLabel}</span>
              <span className="status-dot" aria-hidden="true" />
            </div>
            <h3>{cue.label}</h3>
            <p>{cue.description}</p>
          </article>
        ))}
      </div>

      <div className="lifecycle-note">
        <CircleDot aria-hidden="true" className="lifecycle-note__icon" />
        <span>
          Draft Competitions stay out of the public list until published.
        </span>
      </div>
    </section>
  );
}
