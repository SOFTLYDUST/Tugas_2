'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// ── Types ──────────────────────────────────────────────────────────────────────
interface Profile {
  nama_lengkap: string;
  kelas: string;
  prodi: string;
  domisili: string;
  foto_profil: string;
  foto_cover: string;
  tentang_diri: string;
  koneksi: string;
  universitas: string;
}

// ── Constants ──────────────────────────────────────────────────────────────────
const DEFAULT_PROFILE: Profile = {
  nama_lengkap: "Yulinafaesa Sinaga",
  kelas: "T2H",
  prodi: "D3 Teknologi Informasi",
  domisili: "Malang, Jawa Timur, Indonesia",
  foto_profil: "/img/yulinafaesa.jpeg",
  foto_cover: "/img/download.jpg",
  tentang_diri:
    "Saya adalah mahasiswa Sistem Informasi yang memiliki minat besar dalam pengembangan perangkat lunak dan teknologi digital. Dengan latar belakang pendidikan di bidang sistem informasi, saya telah mengembangkan kemampuan analitis dan teknis yang kuat untuk memecahkan masalah bisnis menggunakan solusi berbasis teknologi. Saya sangat antusias dalam mempelajari teknologi-teknologi baru seperti pengembangan web full-stack, analisis data, serta kecerdasan buatan yang terus berkembang pesat di era digital ini. Saya percaya bahwa kombinasi antara pemikiran bisnis dan kemampuan teknis adalah kunci untuk menciptakan solusi inovatif yang berdampak nyata bagi masyarakat. Di waktu luang, saya aktif mengikuti berbagai seminar teknologi, kompetisi hackathon, serta berkontribusi pada proyek-proyek open source untuk terus mengasah kemampuan saya.",
  koneksi: "500+",
  universitas: "Universitas Brawijaya",
};

// ── Utility ────────────────────────────────────────────────────────────────────
function countWords(text: string): number {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}

function avatarUrl(name: string): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=400&background=ffaccc&color=fff&bold=true`;
}

// ── Sub-components ─────────────────────────────────────────────────────────────

/** Reusable modal wrapper */
function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  zIndex = "z-[997]",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  zIndex?: string;
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={`fixed inset-0 ${zIndex} flex items-center justify-center p-4`}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />
      {/* Panel */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E0E0E0] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#E0E0E0] flex-shrink-0">
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">{title}</p>
            {subtitle && <p className="text-xs text-[#666666] truncate">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#666666] hover:bg-[#F3F2EF] hover:text-[#191919] transition"
            aria-label="Tutup"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.9 4.89a1 1 0 1 0 1.41 1.42L12 13.41l4.89 4.9a1 1 0 0 0 1.42-1.41L13.41 12l4.9-4.89a1 1 0 0 0-.01-1.4z" />
            </svg>
          </button>
        </div>
        {/* Body (scrollable) */}
        <div className="overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}

/** Icon pencil edit button */
function EditIconBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="p-1.5 rounded-full text-[#666666] hover:bg-[#F3F2EF] hover:text-[#ffaccc] transition-all"
      title="Edit"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
      </svg>
    </button>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function ProfilMahasiswa() {
  const router = useRouter();

  const [profile, setProfile] = useState<Profile>({ ...DEFAULT_PROFILE });
  const [profileId, setProfileId] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Modal states
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [tentangModalOpen, setTentangModalOpen] = useState(false);
  const [akademikModalOpen, setAkademikModalOpen] = useState(false);

  // Local draft states for each modal
  const [draftProfile, setDraftProfile] = useState<Profile>({ ...profile });
  const [draftTentang, setDraftTentang] = useState(profile.tentang_diri);
  const [draftAkademik, setDraftAkademik] = useState({
    nama_lengkap: profile.nama_lengkap,
    kelas: profile.kelas,
    prodi: profile.prodi,
    domisili: profile.domisili,
    universitas: profile.universitas,
  });

  // About section expand
  const [aboutExpanded, setAboutExpanded] = useState(false);

  // Saved flash
  useEffect(() => {
    if (saved) {
      const t = setTimeout(() => setSaved(false), 3000);
      return () => clearTimeout(t);
    }
  }, [saved]);

  // ── Load from API ────────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    function normalizeImgPath(v: unknown): string | undefined {
      if (typeof v !== "string") return undefined;
      const s = v.trim();
      if (!s) return undefined;
      if (s.startsWith("http://") || s.startsWith("https://") || s.startsWith("/")) return s;
      return `/${s}`;
    }

    async function load() {
      setIsLoadingProfile(true);
      setLoadError(null);
      try {
        const res = await fetch("/api/users", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        const raw = Array.isArray(data) ? data[0] : data;

        if (!cancelled && raw && typeof raw === "object") {
          const r = raw as Record<string, unknown>;
          if (typeof r.id === "number") setProfileId(r.id);
          else if (typeof r.id === "string" && r.id !== "") setProfileId(Number(r.id));

          const merged = {
            ...DEFAULT_PROFILE,
            ...(raw as Partial<Profile>),
          };
          merged.foto_profil = normalizeImgPath(merged.foto_profil) ?? DEFAULT_PROFILE.foto_profil;
          merged.foto_cover = normalizeImgPath(merged.foto_cover) ?? DEFAULT_PROFILE.foto_cover;
          setProfile(merged);
        }
      } catch (e) {
        if (!cancelled) {
          setLoadError(e instanceof Error ? e.message : "Gagal memuat profil.");
        }
      } finally {
        if (!cancelled) setIsLoadingProfile(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  async function persistProfileToDb(next: Profile): Promise<boolean> {
    setSaveError(null);
    if (profileId == null) {
      setSaveError("Profil belum terhubung ke database (tidak ada ID). Muat ulang halaman.");
      return false;
    }
    setIsSaving(true);
    try {
      const res = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: profileId, ...next }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setSaveError(data.error ?? `Gagal menyimpan (HTTP ${res.status})`);
        return false;
      }
      return true;
    } catch {
      setSaveError("Gagal menyimpan — periksa koneksi atau server.");
      return false;
    } finally {
      setIsSaving(false);
    }
  }

  // ── Save handlers ────────────────────────────────────────────────────────────
  async function handleSaveProfile() {
    const merged = { ...draftProfile };
    (Object.keys(merged) as (keyof Profile)[]).forEach((k) => {
      if (!merged[k]) merged[k] = DEFAULT_PROFILE[k];
    });
    if (!(await persistProfileToDb(merged))) return;
    setProfile(merged);
    setProfileModalOpen(false);
    setSaved(true);
  }

  async function handleSaveTentang() {
    const val = draftTentang.trim() || DEFAULT_PROFILE.tentang_diri;
    const next = { ...profile, tentang_diri: val };
    if (!(await persistProfileToDb(next))) return;
    setProfile(next);
    setTentangModalOpen(false);
    setSaved(true);
  }

  async function handleSaveAkademik() {
    const d = { ...draftAkademik };
    if (!d.nama_lengkap) d.nama_lengkap = DEFAULT_PROFILE.nama_lengkap;
    if (!d.kelas) d.kelas = DEFAULT_PROFILE.kelas;
    if (!d.prodi) d.prodi = DEFAULT_PROFILE.prodi;
    if (!d.domisili) d.domisili = DEFAULT_PROFILE.domisili;
    if (!d.universitas) d.universitas = DEFAULT_PROFILE.universitas;
    const next = { ...profile, ...d };
    if (!(await persistProfileToDb(next))) return;
    setProfile(next);
    setAkademikModalOpen(false);
    setSaved(true);
  }

  // ── Open helpers (sync drafts) ───────────────────────────────────────────────
  function openProfileModal() {
    setDraftProfile({ ...profile });
    setProfileModalOpen(true);
  }
  function openTentangModal() {
    setDraftTentang(profile.tentang_diri);
    setTentangModalOpen(true);
  }
  function openAkademikModal() {
    setDraftAkademik({
      nama_lengkap: profile.nama_lengkap,
      kelas: profile.kelas,
      prodi: profile.prodi,
      domisili: profile.domisili,
      universitas: profile.universitas,
    });
    setAkademikModalOpen(true);
  }

  // ── About preview ────────────────────────────────────────────────────────────
  const words = profile.tentang_diri.trim().split(/\s+/);
  const totalWords = countWords(profile.tentang_diri);
  const KATA_BATAS = 55;
  const isLong = totalWords > KATA_BATAS;
  const previewText = words.slice(0, KATA_BATAS).join(" ");

  // ── Academic rows ────────────────────────────────────────────────────────────
  const akademikRows: { label: string; value: string; path: string; cls: string }[] = [
    {
      label: "Nama Lengkap",
      value: profile.nama_lengkap,
      path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z",
      cls: "text-[#ffaccc] bg-[#EAF0F8]",
    },
    {
      label: "Universitas",
      value: profile.universitas,
      path: "M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z",
      cls: "text-indigo-600 bg-indigo-50",
    },
    {
      label: "Program Studi",
      value: profile.prodi,
      path: "M20 6h-2.18c.07-.44.18-.88.18-1.34C18 2.54 15.46 1 12 1S6 2.54 6 4.66c0 .46.11.9.18 1.34H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8-3c1.99 0 4 .69 4 1.66C16 5.58 14.37 6 12 6S8 5.58 8 4.66C8 3.69 10.01 3 12 3z",
      cls: "text-purple-600 bg-purple-50",
    },
    {
      label: "Kelas",
      value: profile.kelas,
      path: "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z",
      cls: "text-amber-600 bg-amber-50",
    },
    {
      label: "Domisili",
      value: profile.domisili,
      path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
      cls: "text-[#ff77b2] bg-green-50",
    },
  ];

  // ── Progress bar ─────────────────────────────────────────────────────────────
  const persen = Math.min(100, Math.round((totalWords / 100) * 100));
  const wordGoalMet = totalWords >= 100;

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;600;700&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');
        body { font-family: 'IBM Plex Sans', sans-serif; }
        .font-display { font-family: 'Source Serif 4', Georgia, serif; }
        .cover-gradient {
          background: linear-gradient(135deg, #ffaccc 0%, #ff77b2 50%, #004182 100%);
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .card-animate { animation: cardIn 0.45s ease both; }
        @keyframes toastIn {
          from { opacity: 0; transform: translate(-50%, 12px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
        .toast-animate { animation: toastIn 0.35s ease both; }
      `}</style>

      <div className="bg-[#F3F2EF] min-h-screen text-[#191919]">

        {/* ── Navbar ── */}
        <nav className="bg-white border-b border-[#E0E0E0] sticky top-0 z-50 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#ffaccc] rounded flex items-center justify-center">
                <span className="font-display text-white font-bold text-sm">in</span>
              </div>
              <span className="text-[#666666] text-sm hidden sm:block">Profil Mahasiswa</span>
            </div>

            {/* ── Navbar kanan: Logout + Edit Profil ── */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push("/")}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-red-300 text-red-500 hover:bg-red-50 text-sm font-semibold rounded-full transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                </svg>
                Logout
              </button>
              <button
                onClick={openProfileModal}
                className="flex flex-col items-center gap-0.5 text-[#ffaccc] hover:text-[#004182] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
                <span className="text-xs font-semibold">Profil</span>
              </button>
            </div>
          </div>
        </nav>

        {/* ── Main ── */}
        <main className="max-w-3xl mx-auto px-4 py-5 space-y-3">

          {isLoadingProfile && (
            <div className="bg-white border border-[#E0E0E0] text-[#666666] text-sm rounded-xl px-4 py-3">
              Memuat data profil…
            </div>
          )}
          {loadError && (
            <div className="bg-red-50 border border-red-200 text-red-800 text-sm rounded-xl px-4 py-3">
              Gagal memuat profil: {loadError}
            </div>
          )}
          {saveError && (
            <div className="bg-red-50 border border-red-200 text-red-800 text-sm rounded-xl px-4 py-3">
              Gagal menyimpan ke database: {saveError}
            </div>
          )}

          {/* ── Card Utama ── */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#E0E0E0] card-animate">
            <div className="relative h-36 sm:h-44 overflow-hidden">
              {profile.foto_cover ? (
                <img src={profile.foto_cover} alt="Cover" className="w-full h-full object-cover" />
              ) : (
                <div className="cover-gradient w-full h-full" />
              )}
            </div>

            <div className="px-5 sm:px-6 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-12 sm:-mt-14 mb-3 gap-3">
                <div className="relative w-fit">
                  <button
                    onClick={() => setPhotoModalOpen(true)}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-lg cursor-zoom-in focus:outline-none focus:ring-4 focus:ring-[#ffaccc]/30"
                  >
                    <img
                      src={profile.foto_profil}
                      alt={`Foto ${profile.nama_lengkap}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = avatarUrl(profile.nama_lengkap);
                      }}
                    />
                  </button>
                  <span className="absolute bottom-1 right-1 w-4 h-4 bg-[#ff77b2] rounded-full border-2 border-white block" />
                </div>

                <div className="flex gap-2 flex-wrap">
                  <button className="px-4 py-1.5 bg-[#ffaccc] hover:bg-[#004182] text-white text-sm font-semibold rounded-full flex items-center gap-1.5 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    Connect
                  </button>
                  <button className="px-4 py-1.5 border-2 border-[#ffaccc] text-[#ffaccc] hover:bg-[#EAF0F8] text-sm font-semibold rounded-full transition-colors">
                    Pesan
                  </button>
                </div>
              </div>

              <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#191919] leading-tight">
                {profile.nama_lengkap}
              </h1>
              <p className="text-sm mt-0.5 text-[#191919]">
                {profile.prodi}{" "}
                <span className="text-[#666666]">&bull; Kelas {profile.kelas}</span>
              </p>
              <p className="text-sm text-[#666666]">{profile.universitas}</p>

              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm">
                <span className="flex items-center gap-1.5 text-[#666666]">
                  <svg className="w-4 h-4 text-[#ffaccc]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  {profile.domisili}
                </span>
                <button className="flex items-center gap-1.5 text-[#ffaccc] font-semibold hover:underline">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                  </svg>
                  {profile.koneksi} koneksi
                </button>
              </div>
            </div>
          </div>

          {/* ── Card Tentang ── */}
          <div
            className="bg-white rounded-xl shadow-sm border border-[#E0E0E0] p-5 sm:p-6 card-animate"
            style={{ animationDelay: "0.08s" }}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display text-xl font-bold">Tentang</h2>
              <EditIconBtn onClick={openTentangModal} />
            </div>

            <div className="text-[#666666] text-sm leading-relaxed">
              {isLong ? (
                <>
                  {aboutExpanded ? profile.tentang_diri : `${previewText}…`}{" "}
                  <button
                    onClick={() => setAboutExpanded((v) => !v)}
                    className="text-[#ffaccc] font-semibold hover:underline"
                  >
                    {aboutExpanded ? "lihat lebih sedikit" : "lihat selengkapnya"}
                  </button>
                </>
              ) : (
                profile.tentang_diri
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-[#E0E0E0] flex items-center gap-3 text-xs">
              <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${wordGoalMet ? "bg-[#ff77b2]" : "bg-amber-400"}`}
                  style={{ width: `${persen}%` }}
                />
              </div>
              <span className={`${wordGoalMet ? "text-[#ff77b2]" : "text-amber-600"} font-semibold whitespace-nowrap`}>
                {totalWords}/100 kata {wordGoalMet ? "✓" : `(${100 - totalWords} lagi)`}
              </span>
            </div>
          </div>

          {/* ── Card Akademik ── */}
          <div
            className="bg-white rounded-xl shadow-sm border border-[#E0E0E0] p-5 sm:p-6 card-animate"
            style={{ animationDelay: "0.16s" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold">Informasi Akademik</h2>
              <EditIconBtn onClick={openAkademikModal} />
            </div>

            <div className="divide-y divide-[#E0E0E0]">
              {akademikRows.map(({ label, value, path, cls }) => (
                <div key={label} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${cls}`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={path} />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-[#666666] uppercase tracking-wide">{label}</p>
                    <p className="text-[#191919] font-semibold text-sm truncate">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-[#666666] text-xs pb-6">
            Halaman Profil Mahasiswa &bull; {new Date().getFullYear()}
          </p>
        </main>
      </div>

      {/* ── Modal: Foto Profil ── */}
      {photoModalOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center"
          onClick={() => setPhotoModalOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative pointer-events-none">
            <img
              src={profile.foto_profil}
              alt="Foto profil diperbesar"
              className="pointer-events-auto w-[76vw] max-w-[420px] aspect-square rounded-full object-cover select-none border-4 border-white shadow-2xl"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = avatarUrl(profile.nama_lengkap);
              }}
            />
          </div>
        </div>
      )}

      {/* ── Modal: Edit Profil (full) ── */}
      <Modal
        open={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        title="Edit Profil"
        subtitle="Simpan perubahan profil"
        zIndex="z-[998]"
      >
        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(
              [
                ["Nama Lengkap", "nama_lengkap", "sm:col-span-2"],
                ["Kelas", "kelas", ""],
                ["Program Studi", "prodi", ""],
                ["Universitas", "universitas", "sm:col-span-2"],
                ["Domisili", "domisili", "sm:col-span-2"],
                ["Koneksi", "koneksi", ""],
                ["Foto Profil (path/url)", "foto_profil", ""],
                ["Foto Cover (path/url)", "foto_cover", "sm:col-span-2"],
              ] as [string, keyof Profile, string][]
            ).map(([label, key, span]) => (
              <label key={key} className={`block ${span}`}>
                <span className="text-xs font-semibold text-[#666666]">{label}</span>
                <input
                  value={draftProfile[key]}
                  onChange={(e) => setDraftProfile((p) => ({ ...p, [key]: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-[#E0E0E0] px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-[#ffaccc]/20"
                />
              </label>
            ))}

            <label className="block sm:col-span-2">
              <span className="text-xs font-semibold text-[#666666]">Tentang Diri</span>
              <textarea
                rows={5}
                value={draftProfile.tentang_diri}
                onChange={(e) => setDraftProfile((p) => ({ ...p, tentang_diri: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-[#E0E0E0] px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-[#ffaccc]/20"
              />
            </label>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E0E0E0]">
            <button
              onClick={() => setProfileModalOpen(false)}
              className="px-4 py-2 rounded-full border border-[#E0E0E0] text-sm font-semibold text-[#666666] hover:bg-[#F3F2EF] transition"
            >
              Batal
            </button>
            <button
              type="button"
              disabled={isSaving}
              onClick={() => void handleSaveProfile()}
              className="px-4 py-2 rounded-full bg-[#ffaccc] hover:bg-[#004182] disabled:opacity-60 disabled:pointer-events-none text-white text-sm font-semibold transition-colors"
            >
              {isSaving ? "Menyimpan…" : "Simpan"}
            </button>
          </div>
        </div>
      </Modal>

      {/* ── Modal: Edit Tentang ── */}
      <Modal
        open={tentangModalOpen}
        onClose={() => setTentangModalOpen(false)}
        title="Edit Tentang"
        subtitle='Update hanya bagian "Tentang"'
      >
        <div className="p-4 sm:p-5 space-y-4">
          <label className="block">
            <span className="text-xs font-semibold text-[#666666]">Tentang Diri</span>
            <textarea
              rows={7}
              value={draftTentang}
              onChange={(e) => setDraftTentang(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#E0E0E0] px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-[#ffaccc]/20"
              autoFocus
            />
          </label>
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E0E0E0]">
            <button
              onClick={() => setTentangModalOpen(false)}
              className="px-4 py-2 rounded-full border border-[#E0E0E0] text-sm font-semibold text-[#666666] hover:bg-[#F3F2EF] transition"
            >
              Batal
            </button>
            <button
              type="button"
              disabled={isSaving}
              onClick={() => void handleSaveTentang()}
              className="px-4 py-2 rounded-full bg-[#ffaccc] hover:bg-[#004182] disabled:opacity-60 disabled:pointer-events-none text-white text-sm font-semibold transition-colors"
            >
              {isSaving ? "Menyimpan…" : "Simpan"}
            </button>
          </div>
        </div>
      </Modal>

      {/* ── Modal: Edit Akademik ── */}
      <Modal
        open={akademikModalOpen}
        onClose={() => setAkademikModalOpen(false)}
        title="Edit Informasi Akademik"
        subtitle="Update hanya bagian akademik"
      >
        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block sm:col-span-2">
              <span className="text-xs font-semibold text-[#666666]">Nama Lengkap</span>
              <input
                value={draftAkademik.nama_lengkap}
                onChange={(e) => setDraftAkademik((p) => ({ ...p, nama_lengkap: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-[#E0E0E0] px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-[#ffaccc]/20"
                autoFocus
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-[#666666]">Kelas</span>
              <input
                value={draftAkademik.kelas}
                onChange={(e) => setDraftAkademik((p) => ({ ...p, kelas: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-[#E0E0E0] px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-[#ffaccc]/20"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-[#666666]">Program Studi</span>
              <input
                value={draftAkademik.prodi}
                onChange={(e) => setDraftAkademik((p) => ({ ...p, prodi: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-[#E0E0E0] px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-[#ffaccc]/20"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-xs font-semibold text-[#666666]">Universitas</span>
              <input
                value={draftAkademik.universitas}
                onChange={(e) => setDraftAkademik((p) => ({ ...p, universitas: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-[#E0E0E0] px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-[#ffaccc]/20"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-xs font-semibold text-[#666666]">Domisili</span>
              <input
                value={draftAkademik.domisili}
                onChange={(e) => setDraftAkademik((p) => ({ ...p, domisili: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-[#E0E0E0] px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-[#ffaccc]/20"
              />
            </label>
          </div>
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E0E0E0]">
            <button
              onClick={() => setAkademikModalOpen(false)}
              className="px-4 py-2 rounded-full border border-[#E0E0E0] text-sm font-semibold text-[#666666] hover:bg-[#F3F2EF] transition"
            >
              Batal
            </button>
            <button
              type="button"
              disabled={isSaving}
              onClick={() => void handleSaveAkademik()}
              className="px-4 py-2 rounded-full bg-[#ffaccc] hover:bg-[#004182] disabled:opacity-60 disabled:pointer-events-none text-white text-sm font-semibold transition-colors"
            >
              {isSaving ? "Menyimpan…" : "Simpan"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Notifikasi sukses simpan (toast) */}
      {saved && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 z-[1000] flex w-[calc(100%-2rem)] max-w-md items-start gap-3 rounded-2xl border border-green-200 bg-white px-4 py-3 shadow-xl toast-animate"
        >
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
          </div>
          <div className="min-w-0 flex-1 pt-0.5">
            <p className="text-sm font-semibold text-[#191919]">Data berhasil disimpan</p>
            <p className="text-xs text-[#666666] leading-snug">
              Perubahan profil sudah tersimpan ke database.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSaved(false)}
            className="flex-shrink-0 rounded-full p-1.5 text-[#666666] hover:bg-[#F3F2EF] hover:text-[#191919] transition"
            aria-label="Tutup notifikasi"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.9 4.89a1 1 0 1 0 1.41 1.42L12 13.41l4.89 4.9a1 1 0 0 0 1.42-1.41L13.41 12l4.9-4.89a1 1 0 0 0-.01-1.4z" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}