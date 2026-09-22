export default function Loading() {
  return (
    <div
      className="flex min-h-64 items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <p className="text-lg font-medium text-gray-600">
        Loading meeting information...
      </p>
    </div>
  );
}