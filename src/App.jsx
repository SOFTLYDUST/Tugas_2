import Profile from "./pages/Profile";

function App() {
  return (
    <div className="bg-[#F4F8FB] min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-3">
          <h1 className="text-xl font-bold text-[#0A66C2]">
            LinkedImyut 💙
          </h1>

          <input
            type="text"
            placeholder="Cari..."
            className="bg-gray-100 px-4 py-2 rounded-full w-80 outline-none"
          />

          <div className="flex gap-5 text-gray-600 text-lg">
            <span>🏠</span>
            <span>👥</span>
            <span>💼</span>
            <span>💬</span>
            <span>🔔</span>
          </div>
        </div>
      </nav>

      {/* Content */}
      <Profile />
    </div>
  );
}

export default App;