import ProbabilityBars from "./ProbabilityBars";
import ImageExplanation from "./ImageExplanation";
import VideoAnalysis from "./VideoAnalysis";

export default function AnalysisResult({
  result,
  mediaType,
}) {
  if (!result) return null;

  const isFake = result.assessment === "FAKE";

  return (
    <section className="result-card">
      <div className="result-header">
        <div>
          <p className="result-label">
            AI ASSESSMENT
          </p>

          <h3 className={isFake ? "fake" : "real"}>
            {result.assessment}
          </h3>
        </div>

        <div className="confidence">
          <strong>
            {(result.confidence * 100).toFixed(1)}%
          </strong>

          <span>confidence</span>
        </div>
      </div>

      <ProbabilityBars
        realProbability={result.real_probability}
        fakeProbability={result.fake_probability}
      />

      {mediaType === "video" &&
        result.frames_analyzed !== undefined && (
          <div className="video-stats">
            <div className="video-stat">
              <span>FRAMES ANALYZED</span>
              <strong>{result.frames_analyzed}</strong>
            </div>

            <div className="video-stat">
              <span>SUSPICIOUS FRAMES</span>
              <strong>
                {result.suspicious_frames?.length || 0}
              </strong>
            </div>
          </div>
        )}

      <div className="model-info">
        Model: {result.model}
      </div>

      {mediaType === "image" && (
        <ImageExplanation heatmap={result.heatmap} />
      )}

      {mediaType === "video" && (
        <VideoAnalysis result={result} />
      )}

      <p className="disclaimer">
        AI assessment only. Results should not be treated as
        definitive proof of manipulation.
      </p>
    </section>
  );
}