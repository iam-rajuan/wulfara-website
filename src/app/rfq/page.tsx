"use client";
import React from "react";
import { FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FactoryIcon, NetworkIcon } from "@/components/icons";
import RfqHero from "@/components/rfq/RfqHero";
import RfqPurpose from "@/components/rfq/RfqPurpose";
import RfqWorkflow from "@/components/rfq/RfqWorkflow";
import RfqCta from "@/components/rfq/RfqCta";

export default function RfqPage() {
  const { t } = useTranslation();

  const features = [
    {
      icon: FactoryIcon,
      titleKey: "rfqFeatureSearchTitle",
      descKey: "rfqFeatureSearchDesc",
    },
    {
      icon: FileText,
      titleKey: "rfqFeatureQuotesTitle",
      descKey: "rfqFeatureQuotesDesc",
    },
    {
      icon: NetworkIcon,
      titleKey: "rfqFeatureConnectTitle",
      descKey: "rfqFeatureConnectDesc",
    },
  ];

  const steps = [
    {
      number: 1,
      titleKey: "rfqStepSearchTitle",
      descKey: "rfqStepSearchDesc",
    },
    {
      number: 2,
      titleKey: "rfqStepCompareTitle",
      descKey: "rfqStepCompareDesc",
    },
    {
      number: 3,
      titleKey: "rfqStepSendTitle",
      descKey: "rfqStepSendDesc",
    },
    {
      number: 4,
      titleKey: "rfqStepRespondTitle",
      descKey: "rfqStepRespondDesc",
    },
  ];

  return (
    <section className="bg-white overflow-hidden">
      <RfqHero />
      <RfqPurpose features={features} />
      <RfqWorkflow steps={steps} />
      <RfqCta />
    </section>
  );
}
