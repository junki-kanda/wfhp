'use client';

import { useEffect, useState } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css'; // コードハイライトのテーマ

interface RichTextRendererProps {
  content: string;
}

export default function RichTextRenderer({ content }: RichTextRendererProps) {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const processMarkdown = async () => {
      const file = await unified()
        .use(remarkParse) // MarkdownをASTにパース
        .use(remarkGfm) // GitHub Flavored Markdownに対応
        .use(remarkHtml, { sanitize: false }) // HTMLに変換 (サニタイズは無効化)
        .use(rehypeHighlight) // コードハイライト
        .process(content);
      setHtmlContent(String(file));
    };

    processMarkdown();
  }, [content]);

  return (
    <div
      className="prose prose-lg dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
} 