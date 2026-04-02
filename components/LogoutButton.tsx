'use client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  function handleLogout() {
    router.push('/');
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-1.5 border border-red-300 text-red-500 hover:bg-red-50 text-sm font-semibold rounded-full transition-colors"
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
      </svg>
      Logout
    </button>
  );
}