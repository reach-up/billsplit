export default function SubPageHeader({
  title,
  description,
  onBack,
}: {
  title: string;
  description?: string;
  onBack?: () => void;
}) {
  return (
    <div className="flex flex-col gap-5 mb-6">
      {onBack && (
        <button
          onClick={() => onBack()}
          type="button"
          className="group flex items-center gap-2 text-sm text-neutral-500 hover:text-primary-600 transition-colors w-fit"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-neutral-400 group-hover:text-primary-500 transition-colors"
          >
            <path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Back</span>
        </button>
      )}
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">{title}</h1>
        {description && (
          <p className="text-base text-neutral-600">{description}</p>
        )}
      </div>
    </div>
  );
}
