import { useState } from "react";
import API from "../api/axios";

const Home = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");
    setImageUrl("");

    try {
      const res = await API.post("/generate-image", { prompt });
      console.log("Image generated:", res);
      setImageUrl(res.data.imageUrl);
    } catch (err) {
      console.error("Error generating image:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-800 flex flex-col items-center justify-center px-4 py-8 text-center text-gray-100">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight text-gray-100">
        AI Image Generator
      </h1>

      <div className="bg-slate-700 rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-xl">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your image idea..."
            className="flex-1 w-full px-4 py-2 placeholder-gray-500 rounded-md shadow-sm focus:outline-none ring-2 ring-gray-500 outline-none text-white capitalize"
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-6 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>

        {error && <p className="text-red-400 mt-4">{error}</p>}
      </div>

      {imageUrl && (
        <div className="mt-10 w-full md:w-[400px]">
          <div className="bg-slate-700 p-4 rounded-lg shadow-lg">
            <img
              src={imageUrl}
              alt="Generated"
              className="w-full rounded-md border border-slate-600"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
