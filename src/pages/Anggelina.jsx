function Anggelina() {
  return (
    <div className="relative min-h-screen flex justify-center py-10 overflow-hidden
    bg-gradient-to-br from-blue-300 via-white to-yellow-200">

      {/* ✨ GLITTER EFFECT */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-2 h-2 bg-white rounded-full opacity-70 absolute top-10 left-20 animate-pulse"></div>
        <div className="w-3 h-3 bg-yellow-200 rounded-full opacity-60 absolute top-40 right-32 animate-ping"></div>
        <div className="w-2 h-2 bg-blue-200 rounded-full opacity-60 absolute bottom-20 left-40 animate-pulse"></div>
        <div className="w-2 h-2 bg-white rounded-full opacity-80 absolute bottom-32 right-20 animate-ping"></div>
        <div className="w-3 h-3 bg-blue-100 rounded-full opacity-60 absolute top-1/2 left-1/3 animate-pulse"></div>
      </div>

      {/* CONTAINER */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 z-10">

        {/* COVER */}
        <div className="h-40 bg-gradient-to-r from-blue-400 via-blue-500 to-yellow-300 relative">

          {/* FOTO */}
          <div className="absolute -bottom-14 left-8">
            <img
              src="/foto-enjel.jpeg"
              alt="profile"
              className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-md"
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="pt-20 px-8 pb-8">

          <h1 className="text-2xl font-semibold text-gray-900">
            Anggelina Friska Sari
          </h1>

          <p className="text-gray-600 mt-1">
            Mahasiswa Teknologi Informasi | Web Developer
          </p>

          <p className="text-sm text-gray-500 mt-1">
            📍 Malang, Jawa Timur
          </p>

          <div className="flex gap-3 mt-4">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition">
              Connect
            </button>
            <button className="border border-blue-600 text-blue-600 px-5 py-2 rounded-full hover:bg-blue-50 transition">
              Message
            </button>
          </div>

          {/* ABOUT */}
          <div className="mt-6 border-t pt-4">
            <h2 className="font-semibold text-gray-800 mb-2">About</h2>
            <p className="text-gray-600 leading-relaxed text-justify">
              Saya merupakan mahasiswa Teknologi Informasi yang memiliki minat
              besar dalam pengembangan web dan desain digital. Saya terbiasa
              menggunakan berbagai tools seperti Figma, Canva, dan CapCut untuk
              menghasilkan desain yang menarik dan komunikatif. Selain itu, saya
              juga mempelajari bahasa pemrograman untuk membangun website yang
              interaktif dan responsif. Saya senang menggabungkan kreativitas dan
              logika untuk menciptakan solusi digital yang modern, efektif, dan
              bermanfaat.
            </p>
          </div>

          {/* INFO */}
          <div className="mt-6 border-t pt-4 grid grid-cols-2 gap-4 text-gray-600">
            <p><span className="font-semibold">Kelas:</span> T2H</p>
            <p><span className="font-semibold">Prodi:</span> Teknologi Informasi</p>
            <p><span className="font-semibold">Domisili:</span> Malang</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Anggelina