export default function Home() {
    return (
      <div className="flex min-h-screen flex-col items-center py-2">
        <h1 className="text-3xl font-bold mt-16">halflink</h1>
        <p>Shorten a link with ease.</p>
  
        <h2 className="text-2xl font-bold mt-8">Manage your link</h2>

        <form className="mt-4 flex w-full max-w-md">
          <input
            type="text"
            placeholder="Enter your long URL here"
            className="flex-grow border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Shorten
          </button>
        </form>
      </div>
    );
  }
  