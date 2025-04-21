import './DeepfakeUses.css';

export default function DeepfakeUses() {
  return (
    <section id="uses">
      <h2>How Are Deepfakes Used?</h2>
      <div className="uses-container">
        <div className="use-card malicious">
          <h3>Malicious Uses</h3>
          <ul>
            <li>Spreading misinformation or fake news</li>
            <li>Creating non-consensual videos</li>
            <li>Financial fraud and scams</li>
            <li>Political manipulation</li>
            <li>Identity theft and impersonation</li>
          </ul>
        </div>
        <div className="use-card beneficial">
          <h3>Positive Uses</h3>
          <ul>
            <li>Film industry for special effects</li>
            <li>Reviving historical figures for education</li>
            <li>Medical applications for patient communication</li>
            <li>Accessibility tools for voice reconstruction</li>
            <li>Creative expression in art and entertainment</li>
          </ul>
        </div>
      </div>
    </section>
  );
}