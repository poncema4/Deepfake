import './WhatIsDeepfake.css';
import whatisdeep from '../../../assets/whatisdeep.jpg';

export default function WhatIsDeepfake() {
  return (
    <section id="what">
    <h2>What is a Deepfake?</h2>
    <p>
    A deepfake is a type of synthetic media where a person's likeness (face, voice, etc.) is replaced with someone else's using artificial intelligence. 
    The term combines "deep learning" and "fake." These sophisticated AI-generated forgeries can create realistic-looking videos, images, 
    or audio recordings that appear authentic but are completely fabricated.
    </p>
    <p>
    Deepfake technology primarily uses machine learning techniques called autoencoders and generative adversarial networks (GANs). 
    These AI models analyze and learn from large datasets of real images or videos of a person, then can generate new content featuring 
    that person saying or doing things they never actually did.
    </p>
    <img src={whatisdeep} 
    alt="What is a Deepfake?" 
    style={{ width: 'calc(100vw - 700px)', display: 'block', margin: '0 auto' }} />
    </section>
  );
}