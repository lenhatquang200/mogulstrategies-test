interface LoadingOverlayProps {
  show?: boolean;
}

export default function LoadingOverlay({ show = false }: LoadingOverlayProps) {
  if (!show) return null;

  return (
    <div className="absolute inset-0 z-10 bg-black/10 backdrop-blur-[2px] flex items-center justify-center">
      <div className="h-10 w-10 rounded-full border-4 border-[#D4AF37] border-t-transparent animate-spin" />
    </div>
  );
}
