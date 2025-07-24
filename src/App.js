import React, { useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

function App() {
  const [image, setImage] = useState(null);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [error, setError] = useState(null); // ✅ Fixed missing state

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setColors([]);
    setError(null);
  };

  const handleUpload = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append('file', image);
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post('http://localhost:8000/api/closest-color', formData);
      setColors(res.data.colors || []);
    } catch (err) {
      console.error(err);
      setError('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const downloadPalette = () => {
    const blob = new Blob([
      colors.map(c => `${c.color_name} - ${c.hex}`).join('\n')
    ], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'color_palette.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white flex flex-col items-center p-6 space-y-6">
      <h1 className="text-4xl font-bold text-purple-700">🎨 Color Identifier AI</h1>

      {/* File Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        {loading ? 'Analyzing...' : 'Upload & Detect'}
      </button>

      {/* Image Preview */}
      {image && (
        <div className="mt-4 flex flex-col items-center">
          <h3 className="text-lg font-semibold">Image Preview:</h3>
          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            className="w-64 h-auto rounded shadow-md mt-2"
          />
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-600 mt-2">{error}</p>}

      {/* Output */}
      {Array.isArray(colors) && colors.length > 0 && (
        <div className="w-full max-w-4xl mt-10">
          {/* Header & Download */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-purple-600">Detected Colors</h3>
            <button
              onClick={downloadPalette}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              ⬇️ Download Palette
            </button>
          </div>

          {/* Color Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {colors.map((color, idx) => (
              <div
                key={idx}
                className="rounded-xl shadow-lg p-4 text-white"
                style={{ backgroundColor: color.hex }}
              >
                <p className="font-semibold text-lg">{color.color_name}</p>
                <p>{color.hex}</p>
              </div>
            ))}
          </div>

          {/* Color Limit Input */}
          <div className="my-6">
            <label className="text-md font-medium text-gray-700">
              How many colors to show in chart:
            </label>
            <input
              type="number"
              value={limit}
              onChange={(e) => setLimit(parseInt(e.target.value))}
              min="1"
              max={colors.length}
              className="ml-2 px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Pie Chart */}
          <div className="mt-10">
            <h4 className="text-xl font-semibold text-gray-700 mb-4">Color Distribution</h4>
            <Pie
              data={{
                labels: colors.slice(0, limit).map(c => c.color_name),
                datasets: [{
                  data: colors.slice(0, limit).map(c => c.percentage || Math.floor(Math.random() * 10 + 1)), // fallback
                  backgroundColor: colors.slice(0, limit).map(c => c.hex),
                  hoverOffset: 4,
                }],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return `${label}: ${value}%`;
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600"></div>
        </div>
      )}
    </div>
  );
}

export default App;
