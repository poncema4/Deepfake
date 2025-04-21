import { Link } from "react-router-dom";
import example1 from '../assets/fake_1.jpg';
import example2 from '../assets/fake_2.jpg';

export default function Landing() {
  return (
    <div className="container">
      <h1>🤖 What Are Deepfakes?</h1>
      <p>
        Deepfakes are synthetic media — usually videos or images — generated using AI,
        often to impersonate real people. They can be entertaining, but also dangerous when used maliciously.
      </p>

      <h2>🎯 How to Spot a Deepfake</h2>
      <ul>
        <li>⚠️ Inconsistent lighting</li>
        <li>⚠️ Blinking that looks unnatural</li>
        <li>⚠️ Blurred or mismatched facial features</li>
        <li>⚠️ Inconsistent lip-sync</li>
      </ul>

      <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
        <div>
          <img src={example1} alt="Deepfake Example 1" width="300" />
          <p style={{ textAlign: 'center' }}>👀 Subtle face warping</p>
        </div>
        <div>
          <img src={example2} alt="Deepfake Example 2" width="300" />
          <p style={{ textAlign: 'center' }}>👁️ Inconsistent eyes</p>
        </div>
      </div>

      <Link to="/upload" style={{ display: 'block', marginTop: '2rem' }}>
        📤 Try Uploading Your Own Image →
      </Link>
    </div>
  );
}
