'use client';

import { deleteLink, getLinkInfo } from "@/app/utils/api";
import { Clipboard } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const params = useParams();
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [manageUrl, setManageUrl] = useState<string | null>(null);

  const [linkInfo, setLinkInfo] = useState<{
    longUrl: string;
    shortUrl: string;
    manageUrl: string;
    title: string;
    createdAt: string;
    clicks: number;
  } | null>(null);

  async function handleDelete(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      await deleteLink(params.id?.toString() || "");
      router.push("/");
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to delete the link. Please try again.");
      setSuccessMessage(null);
      setLoading(false);
    }
  }

  function copyToClipboard(text: string, title: string) {
    navigator.clipboard.writeText(text).then(
      () => {
        setSuccessMessage(`Copied ${title} to clipboard!`);
      },
      () => {
        setErrorMessage(`Failed to copy ${title} to clipboard.`);
      }
    );
  }

  useEffect(() => {
    if (!params.id) return;
    getLinkInfo(params.id?.toString()).then(setLinkInfo).catch((err) => {
      console.error(err);
      setErrorMessage("Failed to retrieve link info. Please check the link ID.");
    });
  }, [params.id]);

  return (
    <div className="bg-stone-300 flex min-h-screen flex-col items-center justify-center py-2 text-center">
      <h1 className="text-3xl font-bold text-red-950">halflink</h1>
      <p className="text-black">Shorten a link with ease.</p>

      {errorMessage && (
        <p className="mt-4 text-red-800 font-bold">{errorMessage}</p>
      )}
      {successMessage && (
        <p className="mt-4 text-green-800 font-bold">{successMessage}</p>
      )}

      {linkInfo && (
        <div className="flex flex-col items-center w-full">

          <p className="mt-4">Shareable short link:</p>
          <div className="flex justify-center w-full max-w-xl">
            <input
              type="text"
              value={linkInfo.shortUrl}
              readOnly
              className="bg-white w-full max-w-md border border-stone-400 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="flex justify-center w-16 bg-red-900 text-white px-4 py-2 rounded-r hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => copyToClipboard(linkInfo.shortUrl, "short link")}
            >
              <Clipboard />
            </button>
          </div>

          <p className="mt-4">Redirects to:</p>
          <p className="font-mono text-sm text-gray-700">{linkInfo.longUrl}</p>

          <p className="mt-4">Created at:</p>
          <p className="font-mono text-sm text-gray-700">{new Date(linkInfo.createdAt).toLocaleString()}</p>

          <p className="mt-4">Total clicks:</p>
          <p className="font-mono text-sm text-gray-700">{linkInfo.clicks}</p>

          <form className="mt-4" onSubmit={handleDelete}>
            <button
              type="submit"
              disabled={loading}
              className="bg-red-900 disabled:bg-red-300 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Delete Link
            </button>
          </form>

          <p className="mt-4">View analytics and manage your short link at:</p>
          <a
            href={linkInfo.manageUrl}
            className="mb-2 text-red-900 underline hover:text-red-600"
          >{linkInfo.manageUrl}</a>
        </div>
      )}

      <p className="mt-6 text-gray-700 text-sm">
        Secret link ID:<br />{params.id}
      </p>
    </div>
  );
}
