"use client";
import { useState } from "react";

// Example API Call (Mock) - Replace with actual Gemini API integration
async function geminiAIForCleaning(companyName, options) {
  // Mocking an API call to Gemini
  return new Promise((resolve) => {
    setTimeout(() => {
      let cleaned = companyName;
      if (options.removeSymbols) {
        cleaned = cleaned.replace(/[^a-zA-Z0-9\s]/g, "");
      }

      if (options.titleCase) {
        cleaned = cleaned
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      }

      const words = cleaned.split(" ");
      if (words.length > options.maxWords) {
        cleaned = words.slice(0, options.maxWords).join(" ");
      }

      resolve(cleaned);
    }, 1000); // Simulating a 1-second delay for the API response
  });
}

export default function Home() {
  const [companyName, setCompanyName] = useState("");
  const [cleanedName, setCleanedName] = useState("");
  const [aiCleanedName, setAICleanedName] = useState("");
  const [maxWords, setMaxWords] = useState(5);
  const [removeSymbols, setRemoveSymbols] = useState(false);
  const [titleCase, setTitleCase] = useState(false);

  const cleanCompanyName = () => {
    let cleaned = companyName;

    // Remove symbols
    if (removeSymbols) {
      cleaned = cleaned.replace(/[^a-zA-Z0-9\s]/g, "");
    }

    // Title case conversion
    if (titleCase) {
      cleaned = cleaned
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    // Limit words
    const words = cleaned.split(" ");
    if (words.length > maxWords) {
      cleaned = words.slice(0, maxWords).join(" ");
    }

    setCleanedName(cleaned);
  };

  const cleanWithAI = async () => {
    const cleaned = await geminiAIForCleaning(companyName, {
      removeSymbols,
      titleCase,
      maxWords,
    });
    setAICleanedName(cleaned);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Company Name Cleaner
        </h1>

        <input
          type="text"
          placeholder="Enter company name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={removeSymbols}
            onChange={() => setRemoveSymbols(!removeSymbols)}
            className="mr-2"
          />
          <label className="text-gray-700">Remove Symbols</label>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={titleCase}
            onChange={() => setTitleCase(!titleCase)}
            className="mr-2"
          />
          <label className="text-gray-700">Convert to Title Case</label>
        </div>

        <div className="mb-4">
          <label className="text-gray-700 mr-4">Max Words:</label>
          <select
            value={maxWords}
            onChange={(e) => setMaxWords(parseInt(e.target.value))}
            className="px-2 py-1 border border-gray-300 rounded-md"
          >
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>

        <div className="flex justify-between">
          <button
            onClick={cleanCompanyName}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Manual Clean
          </button>

          <button
            onClick={cleanWithAI}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
          >
            AI Clean (GPT)
          </button>
        </div>

        {cleanedName && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Manually Cleaned Name:
            </h2>
            <p className="mt-2 text-gray-700">{cleanedName}</p>
          </div>
        )}

        {aiCleanedName && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">
              AI Cleaned Name:
            </h2>
            <p className="mt-2 text-gray-700">{aiCleanedName}</p>
          </div>
        )}
      </div>
    </div>
  );
}
