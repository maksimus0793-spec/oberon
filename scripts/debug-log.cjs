// #region agent log
module.exports = function debugLog(location, message, data, hypothesisId) {
  const payload = {
    sessionId: "48b343",
    location,
    message,
    data: data || {},
    timestamp: Date.now(),
    hypothesisId,
    runId: process.env.OBERON_DEBUG_RUN || "host-1",
  };
  console.log("[oberon-debug]", JSON.stringify(payload));
  fetch("http://127.0.0.1:7406/ingest/cbc648cf-0771-40b7-b18b-4d45ebcc462f", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "48b343" },
    body: JSON.stringify(payload),
  }).catch(() => {});
};
// #endregion
