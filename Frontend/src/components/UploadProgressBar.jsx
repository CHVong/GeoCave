const UploadProgressBar = ({ percentage }) => {
  return (
    <div
      className={`flex-start flex h-4 w-full overflow-hidden rounded bg-primary font-sans text-xs font-medium ${
        percentage ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="flex h-full items-baseline justify-center overflow-hidden break-all bg-green-700 text-white"
        style={{ width: `${percentage}%` }}
      >
        {percentage === 100 ? `New equipment added!` : `${percentage}% Completed`}
      </div>
    </div>
  );
};

export default UploadProgressBar;
