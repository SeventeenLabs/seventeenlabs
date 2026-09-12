export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 30.48 25"
      fill="currentColor"
      aria-hidden="true"
    >
      {/* B mirrored, then the whole composition skewed to a 17° right lean. */}
      <path
        fillRule="evenodd"
        d="M13.48 0 L30.48 0 L24.67 19 L7.67 19 Z M5.81 6 L22.81 6 L17 25 L0 25 Z"
      />
    </svg>
  );
}

export function BrandLockup() {
  return (
    <>
      <BrandMark />
      <span className="sl-brand-name">
        <span>Seventeen</span>
        <span>Labs</span>
      </span>
    </>
  );
}

/* Frame — the product mark. The parent mark is two leaning frames with their
   shared band removed; this is a single one of those frames, hollowed out.
   Same 17° lean, same 6-unit wall, so the two read as a family. */
export function FrameMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 30.04 25"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M0 25 L7.64 0 L30.04 0 L22.4 25 Z M7.83 19 L11.8 6 L22.2 6 L18.23 19 Z"
      />
    </svg>
  );
}

export function FrameLockup() {
  return (
    <span className="sl-product-lockup">
      <FrameMark />
      <span className="sl-product-name">
        <span>Frame</span>
        <span>by SeventeenLabs</span>
      </span>
    </span>
  );
}
