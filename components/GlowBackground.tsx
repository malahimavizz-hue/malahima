export default function GlowBackground() {
  return (
    <div aria-hidden className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="dot-grid absolute inset-0 opacity-60" />
      <div className="absolute -top-48 -left-32 w-[560px] h-[560px] rounded-full bg-[color-mix(in_srgb,var(--accent-bright)_28%,transparent)] blur-[130px]" />
      <div className="absolute top-1/4 -right-40 w-[520px] h-[520px] rounded-full bg-[color-mix(in_srgb,var(--accent-violet)_24%,transparent)] blur-[130px]" />
      <div className="absolute bottom-[-10%] left-1/4 w-[480px] h-[480px] rounded-full bg-[color-mix(in_srgb,var(--accent-glow)_20%,transparent)] blur-[130px]" />
    </div>
  );
}
