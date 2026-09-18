export default function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-5xl px-6 py-6 text-center text-sm text-gray-600">
        <p>
          &copy; {new Date().getFullYear()} Sacrament Meeting Planner
        </p>
      </div>
    </footer>
  );
}