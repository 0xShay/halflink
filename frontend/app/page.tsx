'use client';

import { useState } from "react";
import { shortenLink } from "./utils/shortenLink";
import { Clipboard, Minimize2 } from "lucide-react";

export default function Home() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [manageUrl, setManageUrl] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const longUrl = formData.get("longUrl") as string;
      const res = await shortenLink(longUrl);
      setSuccessMessage("Shortened URL!");
      setErrorMessage(null);
      setShortUrl(res.shortUrl);
      setManageUrl(res.manageUrl);
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to shorten the link. Please try again.");
      setSuccessMessage(null);
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

  return (
    <div className="bg-stone-300 flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="text-3xl font-bold">halflink</h1>
      <p>Shorten a link with ease.</p>

      <form className="mt-4 flex w-full max-w-xl" onSubmit={handleSubmit}>
        <input
          type="text"
          name="longUrl"
          placeholder="Enter your long URL here"
          className="bg-white flex-grow border border-stone-400 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Minimize2 />
        </button>
      </form>
      {errorMessage && (
        <p className="mt-4 text-red-800 font-bold">{errorMessage}</p>
      )}
      {successMessage && (
        <p className="mt-4 text-green-800 font-bold">{successMessage}</p>
      )}

      {shortUrl && manageUrl && (
        <div className="flex flex-col items-center w-full">

          <p className="mt-4">Shareable short link:</p>
          <div className="flex justify-center w-full max-w-xl">
            <input
              type="text"
              value={shortUrl}
              readOnly
              className="bg-white w-full max-w-md border border-stone-400 rounded-l text-center pl-20 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="flex justify-center w-16 bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => copyToClipboard(shortUrl, "short link")}
            >
              <Clipboard />
            </button>
          </div>

          <p className="mt-4">View analytics and manage your short link at:</p>
          <div className="flex justify-center w-full max-w-xl">
            <input
              type="text"
              value={manageUrl}
              readOnly
              className="bg-white w-full max-w-md border border-stone-400 rounded-l text-center pl-20 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="flex justify-center w-16 bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => copyToClipboard(manageUrl, "manage link")}
            >
              <Clipboard />
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
