'use client';

export default function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-gradient-to-r from-indigo-800 via-purple-900 to-indigo-800 p-6 rounded-2xl shadow-xl flex flex-col items-center text-center hover:scale-105 transform transition">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}
