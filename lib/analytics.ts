// GA4 Custom Conversion Events — SYNAPZ Full-Funnel Tracking

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

function trackEvent(action: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", action, params);
}

export const GA = {
  // — Conversion events —
  bookingModalOpened: (source: string) =>
    trackEvent("booking_modal_opened", { event_category: "conversion", event_label: source }),

  calendlyLoaded: () =>
    trackEvent("calendly_iframe_loaded", { event_category: "conversion" }),

  contactFormSubmitted: () =>
    trackEvent("contact_form_submitted", { event_category: "conversion" }),

  whatsappClicked: (person: "dejvi" | "daniele", location: string) =>
    trackEvent("whatsapp_click", { event_category: "engagement", event_label: `${person}_${location}` }),

  // — ROI Calculator —
  roiCalculatorStarted: () =>
    trackEvent("roi_calculator_started", { event_category: "engagement" }),

  roiCalculatorCompleted: (monthlyLoss: number) =>
    trackEvent("roi_calculator_completed", { event_category: "engagement", value: monthlyLoss }),

  roiEmailGateCaptured: (monthlyLoss: number) =>
    trackEvent("roi_email_gate_captured", { event_category: "conversion", value: monthlyLoss }),

  // — Exit Intent —
  exitIntentShown: () =>
    trackEvent("exit_intent_shown", { event_category: "engagement" }),

  exitIntentConverted: () =>
    trackEvent("exit_intent_converted", { event_category: "conversion" }),

  // — Diagnostic IA —
  diagnosticStarted: () =>
    trackEvent("diagnostic_started", { event_category: "engagement" }),

  diagnosticCompleted: (score: number) =>
    trackEvent("diagnostic_completed", { event_category: "engagement", value: score }),

  diagnosticEmailCaptured: () =>
    trackEvent("diagnostic_email_captured", { event_category: "conversion" }),

  // — Urgency / Social Proof —
  urgencyBarClicked: () =>
    trackEvent("urgency_bar_clicked", { event_category: "engagement" }),

  socialProofShown: () =>
    trackEvent("social_proof_shown", { event_category: "engagement" }),
};

// Session keys for cross-module coordination
export const SESSION_KEYS = {
  BOOKING_MODAL_OPENED: "synapz_booking_opened",
  EXIT_INTENT_SHOWN: "synapz_exit_shown",
  ROI_GATE_UNLOCKED: "synapz_roi_unlocked",
  DIAGNOSTIC_COMPLETED: "synapz_diagnostic_done",
  LEAD_EMAIL: "synapz_lead_email",
} as const;

export function setSessionFlag(key: string) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, "1");
  }
}

export function getSessionFlag(key: string): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(key) === "1";
}

export function setLocalFlag(key: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, "1");
  }
}

export function getLocalFlag(key: string): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(key) === "1";
}
