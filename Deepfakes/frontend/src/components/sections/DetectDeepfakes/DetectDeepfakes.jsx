import './DetectDeepfakes.css';
import monalisa from'../../../assets/monalisa.jpg';

export default function DetectDeepfakes() {
  return (
    <section id="detect">
    <h2>How Can I Detect Deepfakes?</h2>
    <img
    src={monalisa}
    alt="How to tell if an image is fake"
    style={{ width: 'calc(100vw - 700px)', display: 'block', margin: '0 auto' }}
    />
    <p>
    While deepfakes are becoming increasingly sophisticated, there are still signs that can help identify them:
    </p>
    <ul className="detection-list">
    <li>
    <strong>Facial inconsistencies:</strong> Facial inconsistencies are one of the most common giveaways in deepfake videos. 
    You should look closely for unnatural eye movements, 
    blinking patterns, or facial expressions that don’t seem to match the emotions being expressed. 
    For example, deepfakes often fail to replicate natural blinking—either the subject blinks too rarely,
    too often, or the blinking looks stiff and mechanical. Eye movements might seem off as well;
    they can appear stuck, drift in unrealistic ways, or fail to follow motion as a real person’s eyes would.
    Another issue is with the eyes themselves—they can look lifeless, lacking depth or natural reflections,
    which gives off an uncanny, unnatural vibe. Emotions are also hard to fake accurately.
    A person might smile with their mouth but not with their eyes, making the expression feel fake or hollow.
    You might also notice small distortions in the face, especially when the subject turns their head or speaks. 
    The mouth, jawline, or cheeks might momentarily warp, glitch, or seem out of sync. 
    All of these are signs that the video could be artificially generated.
    </li>
    <li>
    <strong>Audio-visual mismatches:</strong> Audio-visual mismatches are another strong indicator that a video might be a deepfake.
    One of the key things to watch for is whether the person's lip movements match the words you're hearing.
    In a genuine video, the timing of the lips, mouth shapes, and facial muscles will naturally align with the speech.
    But in a deepfake, this sync can be slightly off—words might seem delayed, the mouth might form the wrong shapes,
    or the audio might sound too smooth or disconnected from the person’s physical performance.
    Sometimes it feels like the sound is floating over the video rather than coming from it.
    Even small mismatches between audio and visuals can break the illusion and reveal manipulation.
    </li>
    <li>
    <strong>Unnatural lighting/shadows:</strong>Unnatural lighting and shadows can be a clear sign of a deepfake. 
    AI often has trouble recreating realistic and consistent lighting across a person’s face, 
    especially when the scene involves complex lighting or movement. You might notice that the shadows 
    don’t fall where they should based on the light source, or parts of the face might be lit in a way that doesn’t match the environment. 
    For example, one side of the face might be brightly lit while the background suggests it should be in shadow. 
    There can also be flickering or shifting lighting effects that don’t make sense and wouldn’t happen in a real video. 
    These inconsistencies break the realism and suggest the video may have been artificially generated.
    </li>
    <li>
    <strong>Digital artifacts:</strong> Blurring, strange pixelation, or distortions around the edges of a person’s
    face or body are common signs of a deepfake. These artifacts usually show up where the AI struggles to blend the
    generated face with the original footage. You might see a fuzzy or overly smooth outline around the jawline, ears, or hair,
    especially when the person moves their head. Sometimes, parts of the face might look overly sharp compared to the rest of the image,
    or you might notice a brief flicker or warp at the edges. The background near the head can also appear slightly warped or unstable.
    These visual glitches are often the result of the model trying to stitch together frames in a way that looks real—but failing to maintain consistency, 
    especially in motion.
    </li>
    <li>
    <strong>Context clues:</strong> Context clues can be a major giveaway when spotting a deepfake.
    Ask yourself whether what the person is saying or doing makes sense based on who they are, their usual behavior, 
    or the situation. If the content seems out of character—like a public figure saying something completely opposite
    to their known beliefs—or if the video feels overly dramatic or sensational just to provoke a reaction, it might 
    be a deepfake. Deepfakes often rely on shock value to spread quickly, so anything that feels too extreme, too perfect,
    or just oddly timed should raise suspicion. Always consider whether the setting, tone, and message actually line up with what you'd expect in reality.
    </li>
    </ul>
    </section>
  );
}