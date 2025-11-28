"use client";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} AI Fitness Coach. Built with Next.js,
            Tailwind CSS, and AI.
          </p>
          <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400">
            <a
              href="#"
              className="transition-colors hover:text-gray-900 dark:hover:text-white"
            >
              Privacy
            </a>
            <a
              href="#"
              className="transition-colors hover:text-gray-900 dark:hover:text-white"
            >
              Terms
            </a>
            <a
              href="#"
              className="transition-colors hover:text-gray-900 dark:hover:text-white"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

