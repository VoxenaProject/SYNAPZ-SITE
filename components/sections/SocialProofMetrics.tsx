"use client";

import MetricCounter from "@/components/product/MetricCounter";

export default function SocialProofMetrics() {
  return (
    <section className="bg-[#0c0c20] py-20 px-6 below-fold">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* 1. Heures r&eacute;cup&eacute;r&eacute;es */}
          <div className="text-center">
            <MetricCounter end={32} suffix="+" label="heures r&eacute;cup&eacute;r&eacute;es par client/mois" />
          </div>

          {/* 2. D&eacute;lai de livraison */}
          <div className="text-center">
            <MetricCounter end={7} suffix=" jours" label="pour livrer votre 1&egrave;re solution" />
          </div>

          {/* 3. Pour d&eacute;marrer — static, since end=0 won&apos;t animate */}
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-extrabold gradient-text">
              0&euro;
            </p>
            <p className="text-[#94a3b8] text-sm mt-2">pour d&eacute;marrer</p>
          </div>

          {/* 4. Satisfaction */}
          <div className="text-center">
            <MetricCounter end={100} suffix="%" label="satisfait ou rembours&eacute;" />
          </div>
        </div>

        <p className="text-[#64748b] text-xs text-center mt-8">
          R&eacute;sultats moyens mesur&eacute;s sur nos clients.
        </p>
      </div>
    </section>
  );
}
