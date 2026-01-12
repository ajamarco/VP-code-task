import { OverlayProps } from "../types";

function FilterOverlay({ isOpen, onClose }: OverlayProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 z-40 lg:hidden"
      onClick={onClose}
      aria-hidden="true"
    />
  );
}

export default FilterOverlay;
