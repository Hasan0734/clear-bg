import { Sparkles } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-12 px-4">
    <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-2 font-bold">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-bg">
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="text-foreground">ClearBg</span>
      </div>
      <div className="flex gap-6 text-sm text-muted-foreground">
        <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
        <a href="#" className="hover:text-foreground transition-colors">Terms</a>
        <a href="#" className="hover:text-foreground transition-colors">Contact</a>
      </div>
      <div className="flex gap-4">
        {["𝕏", "in"].map((icon) => (
          <a key={icon} href="#" className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors">
            {icon}
          </a>
        ))}
      </div>
    </div>
    <p className="text-center text-xs text-muted-foreground mt-8">© 2026 ClearBg. All rights reserved.</p>
  </footer>
);

export default Footer;
