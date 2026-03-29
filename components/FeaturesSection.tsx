"use client"
import { motion } from "framer-motion";
import { Brain, Zap, ImageUp, Layers } from "lucide-react";

const features = [
  { icon: Brain, title: "AI-Powered Accuracy", desc: "Advanced neural networks detect subjects with pixel-perfect precision, handling hair, fur, and complex edges." },
  { icon: Zap, title: "Fast Processing", desc: "Get results in under 3 seconds. Our optimized pipeline processes images faster than any alternative." },
  { icon: ImageUp, title: "High-Res Export", desc: "Download full-resolution images up to 25MP. No quality loss, no watermarks on premium exports." },
  { icon: Layers, title: "Bulk Processing", desc: "Process hundreds of images at once via our batch tool or API. Perfect for e-commerce and studios." },
];

const FeaturesSection = () => (
  <section id="features" className="py-24 px-4">
    <div className="container mx-auto max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-sm font-semibold text-primary">Why ClearCut AI</span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2">Built for speed and quality</h2>
        <p className="text-muted-foreground mt-3 max-w-lg mx-auto">Everything you need to remove, replace, and enhance image backgrounds at scale.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-6 shadow-card hover:shadow-glow transition-shadow group"
          >
            <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <f.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
