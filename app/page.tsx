'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const USERS = [
  { username: 'yulinafaesa', password: '134', redirect: '/yulinafaesa-sinaga' },
  { username: 'tania', password: '152', redirect: '/tania-syabandiah' },
  { username: 'anggelina', password: '146', redirect: '/anggelina-friska' },
];

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleLogin() {
    const user = USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      router.push(user.redirect);
    } else {
      setError('Username atau password salah!');
    }
  }

  return (
    <div className="min-h-screen bg-[#F3F2EF] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md border border-[#E0E0E0] w-full max-w-sm p-8">
{/* Logo */}
<div className="flex justify-center mb-6">
  <div className="text-center mt-5">
    <img
      src="/img/trio.jpeg"
      alt="Gambar Imut Happy"
      className="w-[300px] h-auto rounded-[10px]"
    />
  </div>
</div>
        <h1 className="text-2xl font-bold text-center text-[#191919] mb-1">Login</h1>
        <p className="text-sm text-center text-[#666666] mb-6">Profil Trio Happy Imut</p>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2 mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#666666]">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="mt-1 w-full rounded-xl border border-[#E0E0E0] px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-[#ffaccc]/20"
              placeholder="Masukkan username"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#666666]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="mt-1 w-full rounded-xl border border-[#E0E0E0] px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-[#ffaccc]/20"
              placeholder="Masukkan password"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full py-2.5 bg-[#ffaccc] hover:bg-[#004182] text-white font-semibold rounded-full transition-colors text-sm"
          >
            Masuk
          </button>
        </div>


        <p className="text-xs text-center text-[#666666] mt-4">
          Kelas T2H &bull; Universitas Brawijaya
        </p>
      </div>
    </div>
  );
}