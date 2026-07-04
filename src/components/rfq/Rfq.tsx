"use client";
import React from "react";
import { FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FactoryIcon, NetworkIcon } from "@/components/icons";
import RfqHero from "./RfqHero";
import RfqPurpose from "./RfqPurpose";
import RfqWorkflow from "./RfqWorkflow";
import RfqCta from "./RfqCta";

export default function Rfq() {
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
