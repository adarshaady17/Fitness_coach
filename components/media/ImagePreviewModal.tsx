"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: "exercise" | "meal";
}

export default function ImagePreviewModal({
  isOpen,
  onClose,
  title,
  type,
}: ImagePreviewModalProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          prompt: title,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await response.json();
      setImageUrl(data.imageUrl || data.url);
    } catch (err: any) {
      setError(err.message || "Failed to generate image. Please try again.");
      console.error("Image generation error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [title, type]);

  useEffect(() => {
    if (isOpen && title) {
      generateImage();
    } else {
      setImageUrl(null);
      setError(null);
    }
  }, [generateImage, isOpen, title]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-800"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {type === "exercise" ? "🏋️" : "🍽️"} {title}
              </h3>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex min-h-[400px] items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-900">
              {isLoading && (
                <div className="text-center">
                  <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Generating image...
                  </p>
                </div>
              )}

              {error && (
                <div className="text-center">
                  <p className="text-red-600 dark:text-red-400">{error}</p>
                  <button
                    onClick={generateImage}
                    className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {imageUrl && !isLoading && (
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={imageUrl}
                  alt={title}
                  className="max-h-[500px] w-full rounded-lg object-cover"
                />
              )}

              {!imageUrl && !isLoading && !error && (
                <p className="text-gray-500 dark:text-gray-400">
                  Click to generate image
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

