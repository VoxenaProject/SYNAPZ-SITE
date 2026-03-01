"use client";

import { useState, createContext, useContext } from "react";
import dynamic from "next/dynamic";

const DiagnosticIA = dynamic(() => import("@/components/ui/DiagnosticIA"));
const ExitIntentPopup = dynamic(() => import("@/components/ui/ExitIntentPopup"));

const DiagnosticContext = createContext<() => void>(() => {});

export function useDiagnosticTrigger() {
  return useContext(DiagnosticContext);
}

export default function ConversionLayer({ children }: { children: React.ReactNode }) {
  const [diagnosticOpen, setDiagnosticOpen] = useState(false);

  function openDiagnostic() {
    setDiagnosticOpen(true);
  }

  return (
    <DiagnosticContext.Provider value={openDiagnostic}>
      {children}
      <ExitIntentPopup onStartDiagnostic={openDiagnostic} />
      <DiagnosticIA isOpen={diagnosticOpen} onClose={() => setDiagnosticOpen(false)} />
    </DiagnosticContext.Provider>
  );
}
