'use client';
import LogoutButton from '@/components/LogoutButton';

// ── Main Component ─────────────────────────────────────────────────────────────
export default function TaniaPage() {
  return (
    <div className="bg-[#F4F8FB] min-h-screen py-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* ===== NAVBAR LOGOUT ===== */}
        <div className="flex justify-end px-2">
          <LogoutButton />
        </div>

        {/* ===== PROFILE HEADER ===== */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">

          {/* COVER */}
          <div className="h-40 bg-gradient-to-r from-blue-400 via-purple-300 to-pink-300"></div>

          {/* PROFILE INFO */}
          <div className="p-6 relative">

            {/* PROFILE PHOTO */}
            <img
              src="/img/profile.jpeg"
              alt="profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow absolute -top-16 left-6"
            />

            <div className="ml-40">
              <h1 className="text-2xl font-bold text-gray-800">
                Tania Syabandiah
              </h1>
              <p className="text-gray-500 mt-1">
                Web Developer Enthusiast | React & Tailwind Learner
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Indonesia • Open to opportunities
              </p>

              {/* BUTTON */}
              <div className="flex gap-3 mt-4">
                <button className="bg-[#0A66C2] text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
                  Connect
                </button>
                <button className="border px-4 py-2 rounded-full hover:bg-gray-100">
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ===== ABOUT SECTION ===== */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-semibold text-lg mb-3">
            Tentang Saya
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">
            Saya adalah mahasiswa yang memiliki ketertarikan besar pada bidang
            teknologi informasi, khususnya dalam pengembangan web dan desain
            antarmuka pengguna. Saat ini saya sedang fokus mempelajari ReactJS
            dan Tailwind CSS untuk membangun website modern yang responsif dan
            interaktif. Saya menikmati proses belajar melalui praktik langsung
            dan pengerjaan proyek nyata, karena bagi saya pengalaman merupakan
            bagian penting dalam pengembangan kemampuan. Saya dikenal sebagai
            pribadi yang disiplin, bertanggung jawab, serta mampu bekerja sama
            dalam tim maupun secara mandiri. Ke depannya, saya ingin terus
            mengembangkan kemampuan teknis sekaligus kreativitas dalam
            menciptakan solusi digital yang bermanfaat.
          </p>
        </div>

        {/* ===== ACTIVITY / POST ===== */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-semibold text-lg mb-4">
            Aktivitas
          </h2>

          <div className="border rounded-xl p-4 hover:shadow-md transition">
            <h3 className="font-semibold">
              Belajar ReactJS
            </h3>
            <p className="text-gray-500 text-sm mb-2">
              2 jam yang lalu
            </p>
            <p className="text-gray-700">
              Sedang mengembangkan project web LinkedIn versi aesthetic
              menggunakan ReactJS dan Tailwind CSS. Seru sekali belajar UI modern!
            </p>
            <div className="flex gap-6 mt-3 text-gray-500 text-sm">
              <span>👍 Like</span>
              <span>💬 Comment</span>
              <span>🔁 Share</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}