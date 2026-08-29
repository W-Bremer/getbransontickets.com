"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

export function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => (
          <h2
            id={String(children)
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "")}
            className="text-2xl sm:text-3xl font-bold mt-12 mb-4 text-[#13264D] font-heading scroll-mt-24"
          >
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl sm:text-2xl font-bold mt-8 mb-3 text-[#13264D] font-heading">
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-lg font-bold mt-6 mb-2 text-[#13264D]">
            {children}
          </h4>
        ),
        p: ({ children }) => (
          <p className="text-gray-700 leading-relaxed mb-5 text-[17px]">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-gray-700 text-[17px]">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 text-gray-700 text-[17px]">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="leading-relaxed pl-1">{children}</li>
        ),
        strong: ({ children }) => (
          <strong className="font-bold text-[#5a1414]">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic text-gray-600">{children}</em>
        ),
        a: ({ href, children }) => {
          if (!href) return <span>{children}</span>;
          const isInternal = href.startsWith("/");
          if (isInternal) {
            return (
              <Link
                href={href}
                className="text-[#E8C65A] font-medium underline underline-offset-2 hover:text-[#C04E0C] transition-colors"
              >
                {children}
              </Link>
            );
          }
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E8C65A] font-medium underline underline-offset-2 hover:text-[#C04E0C] transition-colors"
            >
              {children}
            </a>
          );
        },
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-[#E8C65A] pl-5 my-6 bg-[#faf8f5] py-4 pr-4 rounded-r-lg italic text-gray-600">
            {children}
          </blockquote>
        ),
        hr: () => <hr className="my-8 border-gray-200" />,
        table: ({ children }) => (
          <div className="overflow-x-auto my-6 rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-[#faf8f5]">{children}</thead>
        ),
        th: ({ children }) => (
          <th className="px-4 py-3 text-left text-sm font-bold text-[#13264D]">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-3 text-sm text-gray-700 border-t border-gray-100">
            {children}
          </td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
