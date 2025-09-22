// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="text-center text-sm text-gray-500 dark:text-gray-400 py-4 mt-2 mb-2">
      © {new Date().getFullYear()} Pinnacles Fintech Company. All Rights Reserved. Built by{" "}
      <a
        href="https://miracleonline.github.io/myportfolio/"
        className="text-blue-600 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Miracle Nwabuisi
      </a>
    </footer>
  );
}
