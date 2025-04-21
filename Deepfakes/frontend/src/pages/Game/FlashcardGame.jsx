import { useState, useEffect } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import styles from "./FlashcardGame.module.css";

export default function FlashcardGame() {
  const [currentMedia, setCurrentMedia] = useState(null); // {url, label, hint, mediaType}
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Divide the hints into separate arrays for videos and images
  const videoHints = [
    "Look for unnatural blinking patterns or lack of blinking in videos.",
    "Watch for unnatural facial movements or expressions.",
    "Listen for mismatched audio and lip movements."
  ];

  const imageHints = [
    "Check for inconsistent lighting or shadows on the face.",
    "Look for blurring or warping around the edges of the face.",
    "Check for unnatural skin tones or texture.",
    "Look for unnatural hair details that might be poorly rendered.",
    "Check for teeth that look too perfect or unnatural."
  ];

  // Combined media fetch function – mediaType should be either "image" or "video"
  const fetchRandomMedia = async (mediaType) => {
    setLoading(true);
    try {
      const labelType = Math.random() > 0.5 ? "Real" : "Fake";
      const endpoint =
        mediaType === "image"
          ? `/api/image/random?label=${labelType}`
          : `/api/video/random?label=${labelType}`;

      const res = await fetch(endpoint);
      const data = await res.json();

      setCurrentMedia({
        url: data.url,
        label: labelType,
        hint:
          mediaType === "image"
            ? imageHints[Math.floor(Math.random() * imageHints.length)]
            : videoHints[Math.floor(Math.random() * videoHints.length)],
        mediaType, // storing the type might be useful for later
      });
    } catch (err) {
      console.error(err);
      setCurrentMedia({
        url: "https://example.com/placeholder.jpg",
        label: Math.random() > 0.5 ? "Real" : "Fake",
        hint: mediaType === "image" ? imageHints[0] : videoHints[0],
        mediaType,
      });
    } finally {
      setLoading(false);
    }
  };

  // On initial load, randomly choose a media type to fetch
  useEffect(() => {
    const initialType = Math.random() > 0.9 ? "video" : "image";
    fetchRandomMedia(initialType);
  }, []);

  const handleGuess = (guess) => {
    if (!currentMedia) return;
    setGameStarted(true);

    if (guess === currentMedia.label) {
      const pts = 10 + streak * 5;
      setScore((prev) => prev + pts);
      setStreak((prev) => prev + 1);
      setFeedback(`✅ Correct! +${pts} points (Streak: ${streak + 1})`);
    } else {
      setStreak(0);
      setFeedback(`❌ Incorrect! The media was ${currentMedia.label}.`);
    }

    // Smooth-scroll to the bottom of the card so feedback/next button is visible
    setTimeout(() => {
      const el = document.querySelector(`.${styles.cardContent}`);
      el?.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }, 100);
  };

  // Next challenge loads a new media item with a random type
  const nextMedia = () => {
    setFeedback("");
    setShowHint(false);
    const nextType = Math.random() > 0.9 ? "video" : "image";
    fetchRandomMedia(nextType);
  };

  const resetGame = () => {
    setScore(0);
    setStreak(0);
    setGameStarted(false);
    setFeedback("");
    setShowHint(false);
    const nextType = Math.random() > 0.9 ? "video" : "image";
    fetchRandomMedia(nextType);
  };

  const ProgressBar = () => {
    const pct = Math.min((score / 500) * 100, 100);
    return (
      <div className={styles.progressContainer}>
        <div className={styles.progressHeader}>
          <span>Progress to mastery</span>
          <span>{score}/500</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${pct}%` }} />
        </div>
      </div>
    );
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.gameContainer}>
          <div className={styles.cardContainer}>
            {/* ---------- header ---------- */}
            <header className={styles.header}>
              <h1 className={styles.title}>Deepfake Detection Challenge</h1>
              <p className={styles.subtitle}>
                Test your ability to spot AI‑generated media
              </p>
            </header>

            {/* ---------- score ---------- */}
            <section className={styles.scorePanel}>
              <div className={styles.scoreRow}>
                <div className={styles.scoreItem}>
                  Score: <span className={styles.scoreValue}>{score}</span>
                </div>
                <div className={styles.scoreItem}>
                  Streak: <span className={styles.streakValue}>{streak}x</span>
                </div>
              </div>
            </section>

            <ProgressBar />

            {/* ---------- main card ---------- */}
            <Card className={styles.mainCard}>
              <CardContent className={styles.cardContent}>
                <div className={styles.mediaContainer}>
                  {loading ? (
                    <div className={styles.loadingContainer}>
                      <div className={styles.loadingSpinner} />
                      <p className={styles.loadingText}>Loading media…</p>
                    </div>
                  ) : currentMedia?.url ? (
                    currentMedia.url.match(/\.(mp4|mov|webm)$/i) ? (
                      <video
                        key={currentMedia.url}
                        className={styles.media}
                        controls
                        playsInline
                        muted
                        autoPlay
                        onLoadedData={() => setLoading(false)}
                        onError={() => setLoading(false)}
                      >
                        <source src={currentMedia.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        key={currentMedia.url}
                        src={currentMedia.url}
                        className={styles.media}
                        alt="Guess if real or fake"
                        onLoad={() => setLoading(false)}
                        onError={() => setLoading(false)}
                      />
                    )
                  ) : (
                    <div className={styles.errorMessage}>No media available</div>
                  )}
                </div>

                {/* Guess buttons */}
                {!feedback && (
                  <div className={styles.buttonGroup}>
                    <Button
                      className={styles.gameButton}
                      onClick={() => handleGuess("Real")}
                    >
                      Real
                    </Button>
                    <Button
                      className={styles.gameButton}
                      onClick={() => handleGuess("Fake")}
                    >
                      Fake
                    </Button>
                    <Button
                      variant="outline"
                      className={styles.gameButton}
                      onClick={() => setShowHint(!showHint)}
                    >
                      {showHint ? "Hide Hint" : "Show Hint"}
                    </Button>
                  </div>
                )}

                {/* Hint */}
                {showHint && (
                  <div className={styles.hintContainer}>
                    <p className={styles.hintText}>
                      <span>💡</span> Hint: {currentMedia?.hint}
                    </p>
                  </div>
                )}

                {/* Feedback + Next Challenge */}
                {feedback && (
                  <div
                    className={`${styles.feedback} ${
                      feedback.includes("✅")
                        ? styles.correctFeedback
                        : styles.incorrectFeedback
                    }`}
                  >
                    <p className={styles.feedbackText}>{feedback}</p>
                    {feedback.includes("❌") && (
                      <p className={styles.encouragement}>Try the next one!</p>
                    )}
                    <Button className={styles.nextButton} onClick={nextMedia}>
                      Next Challenge
                    </Button>
                  </div>
                )}

                {/* Reset (only when guessing) */}
                {!feedback && (
                  <div className={styles.actionButtonContainer}>
                    <Button
                      variant="outline"
                      className={styles.resetButton}
                      onClick={resetGame}
                    >
                      Reset Game
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Mastery status */}
            {gameStarted && (
              <div className={styles.masteryContainer}>
                <p className={styles.streakBonus}>
                  Current streak bonus: {streak * 5} extra points per correct answer
                </p>
                {score >= 500 ? (
                  <p className={styles.congratulations}>
                    🎉 Congratulations! You’ve reached mastery!
                  </p>
                ) : (
                  <p className={styles.pointsNeeded}>
                    {500 - score} points needed for mastery
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
