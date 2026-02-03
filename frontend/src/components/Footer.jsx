export default function Footer() {
  return (
    <footer className="bg-white w-full dark:bg-black border-t border-gray-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              PollStream
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Building with ❤️ by Abhi Rajput.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            <a
              href="https://github.com/abhi-rajput-KRP/PollStream.git"
              target="_"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              GitHub-Profile
            </a>
            <a
              href="https://github.com/abhi-rajput-KRP/PollStream.git"
              target="_"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              Repo-Link
            </a>
          </nav>
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-zinc-800 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2026 PollStream. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
