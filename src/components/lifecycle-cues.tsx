import { CircleDot } from "lucide-react";

import { lifecycleCues } from "../lib/cbmp";

export function LifecycleCues() {
  return (
    <section className="lifecycle-panel" aria-labelledby="lifecycle-heading">
      <div className="surface-heading">
        <div>
          <h2 id="lifecycle-heading">Competition Lifecycle</h2>
          <p>Public state names stay text-first and readable at a glance.</p>
        </div>
      </div>

      <div className="lifecycle-list">
        {lifecycleCues.map((cue) => (
          <article className="lifecycle-item" data-tone={cue.tone} key={cue.key}>
            <div className="lifecycle-item__meta">
              <span className="status-dot" aria-hidden="true" />
              <h3>{cue.label}</h3>
            </div>
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
