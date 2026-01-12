interface FilterOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

function FilterOverlay({ isOpen, onClose }: FilterOverlayProps) {
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
