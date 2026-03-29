"use client"
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["5 images / day", "Standard quality", "Basic backgrounds", "Web export only"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    features: ["Unlimited images", "Full HD export", "Custom backgrounds", "Bulk processing", "Priority support"],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "API",
    price: "$29",
    period: "/month",
    features: ["10,000 API calls", "Ultra HD export", "Webhooks", "Dedicated support", "Custom integrations"],
    cta: "Get API Key",
    popular: false,
  },
];

const PricingSection = () => (
  <section id="pricing" className="py-24 px-4 hero-gradient">
    <div className="container mx-auto max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-sm font-semibold text-primary">Simple Pricing</span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2">Choose your plan</h2>
        <p className="text-muted-foreground mt-3">Start free. Upgrade when you need more.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-10">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-3xl p-6 shadow-card relative ${
              plan.popular
                ? "gradient-bg text-primary-foreground scale-105"
                : "glass"
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-card text-foreground text-xs font-bold px-3 py-1 rounded-full shadow-soft">
                Most Popular
              </span>
            )}
            <h3 className="font-bold text-xl mb-1">{plan.name}</h3>
            <div className="mb-6">
              <span className="text-4xl font-extrabold">{plan.price}</span>
              <span className={`text-sm ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{plan.period}</span>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              variant={plan.popular ? "glass" : "gradient"}
              size="lg"
              className="w-full h-12 rounded-3xl border-background"
            >
              {plan.cta}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
