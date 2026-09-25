import React, { useState, useEffect } from 'react';
import {
  X,
  Presentation,
  CheckCircle2,
  ExternalLink,
  Loader2,
  AlertCircle,
  Copy,
  Check,
  Sparkles,
  Layers,
  FileText,
  LogOut,
  User as UserIcon,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { User } from 'firebase/auth';
import { initAuth, googleSignIn, logoutGoogle, getAccessToken } from '../utils/googleAuth';
import { exportToGoogleSlides, GenerateSlidesProgress, GenerateSlidesResult } from '../utils/googleSlidesService';
import { DeckSlide, SLIDES } from './views/ExecutiveDeckView';

interface ExportGoogleSlidesModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides?: DeckSlide[];
}

export const ExportGoogleSlidesModal: React.FC<ExportGoogleSlidesModalProps> = ({
  isOpen,
  onClose,
  slides = SLIDES,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState<GenerateSlidesProgress | null>(null);
  const [result, setResult] = useState<GenerateSlidesResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Initialize auth state
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, userToken) => {
        setCurrentUser(user);
        setToken(userToken);
      },
      () => {
        // Not authenticated
        setCurrentUser(null);
        setToken(null);
      }
    );

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  if (!isOpen) return null;

  const handleSignIn = async () => {
    setIsSigningIn(true);
    setError(null);
    try {
      const authResult = await googleSignIn();
      if (authResult) {
        setCurrentUser(authResult.user);
        setToken(authResult.accessToken);
      }
    } catch (err: any) {
      console.error('Google Sign In error:', err);
      setError(
        err.message || 'Gagal login ke Google. Pastikan pop-up browser tidak diblokir dan coba kembali.'
      );
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logoutGoogle();
      setCurrentUser(null);
      setToken(null);
      setResult(null);
      setProgress(null);
    } catch (err: any) {
      console.error('Logout error:', err);
    }
  };

  const handleStartExport = async () => {
    let activeToken = token;

    if (!activeToken) {
      activeToken = await getAccessToken();
    }

    if (!activeToken) {
      setError('Sesi autentikasi tidak ditemukan. Silakan login kembali dengan akun Google.');
      return;
    }

    setIsExporting(true);
    setError(null);
    setResult(null);

    try {
      const exportRes = await exportToGoogleSlides(activeToken, slides, (p) => {
        setProgress(p);
      });
      setResult(exportRes);
    } catch (err: any) {
      console.error('Export error:', err);
      setError(
        err.message ||
          'Terjadi kendala saat menghubungkan ke Google Slides API. Periksa koneksi internet atau izin akun.'
      );
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyLink = () => {
    if (!result?.presentationUrl) return;
    navigator.clipboard.writeText(result.presentationUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 px-6 py-4.5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shadow-xs">
              <Presentation className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold">Generate Deck ke Google Slides</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/25 text-white">
                  Editable Deck
                </span>
              </div>
              <p className="text-xs text-amber-100">
                Ekspor presentasi lengkap 9 slide dengan speaker notes langsung ke akun Google Anda
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-black/10 hover:bg-black/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Key Guarantee Banner */}
          <div className="p-3.5 bg-blue-50/80 border border-blue-200 rounded-xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-900 leading-relaxed">
              <span className="font-bold">Keamanan & Desain Terjamin:</span> Presentasi akan dibuat langsung di Google Drive Anda sebagai slide mandiri yang dapat Anda edit, bagikan, dan presentasikan. <strong>Fitur Executive Deck di dashboard Meridian tetap aktif dan utuh</strong>.
            </div>
          </div>

          {/* Authentication Section */}
          {!currentUser ? (
            <div className="p-5 border border-slate-200 bg-slate-50/60 rounded-xl space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                <Presentation className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-800">
                  Hubungkan dengan Google Slides
                </h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Untuk membuat presentasi di Google Slides Anda dengan izin resmi, silakan masuk menggunakan akun Google Anda terlebih dahulu.
                </p>
              </div>

              {/* Official Google Sign-In Button */}
              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={handleSignIn}
                  disabled={isSigningIn}
                  className="inline-flex items-center justify-center gap-3 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs rounded-xl border border-slate-300 shadow-xs hover:shadow-md transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                >
                  {isSigningIn ? (
                    <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                  )}
                  <span>{isSigningIn ? 'Menghubungkan...' : 'Sign in with Google'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* User Info & Export Action */
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex items-center gap-3">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || 'Google User'}
                       className="w-8 h-8 rounded-full border border-slate-200 object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                      {currentUser.displayName ? currentUser.displayName[0] : 'U'}
                    </div>
                  )}
                  <div>
                    <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span>{currentUser.displayName || 'Akun Google Terhubung'}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    </div>
                    <div className="text-[11px] text-slate-500">{currentUser.email}</div>
                  </div>
                </div>

                <button
                  onClick={handleSignOut}
                  className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-slate-100 transition-colors"
                  title="Ganti akun Google"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Keluar</span>
                </button>
              </div>

              {/* What will be generated breakdown */}
              <div className="border border-slate-200 rounded-xl p-4 space-y-3 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-600" />
                    <h4 className="text-xs font-bold text-slate-800">
                      Rincian Slide yang Akan Digenerate ({slides.length + 1} Slide):
                    </h4>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">
                    Format: Google Slides 16:9 Widescreen
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-2 text-slate-700">
                    <span className="font-bold text-amber-700">Slide 0:</span>
                    <span className="truncate">Title Slide & Executive Summary</span>
                  </div>
                  {slides.map((s, idx) => (
                    <div
                      key={s.id}
                      className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-2 text-slate-700"
                    >
                      <span className="font-bold text-blue-700">Slide {idx + 1}:</span>
                      <span className="truncate">{s.title}</span>
                    </div>
                  ))}
                </div>

                <div className="text-[11px] text-slate-500 flex items-center gap-3 pt-1 border-t border-slate-100">
                  <span className="flex items-center gap-1 text-emerald-600 font-medium">
                    <CheckCircle2 className="w-3 h-3" /> Side-by-side Layout (Celah vs Solusi)
                  </span>
                  <span className="flex items-center gap-1 text-blue-600 font-medium">
                    <CheckCircle2 className="w-3 h-3" /> Naskah Presenter Lengkap di Speaker Notes
                  </span>
                </div>
              </div>

              {/* Progress Bar (if exporting) */}
              {isExporting && progress && (
                <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-amber-900 flex items-center gap-2">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600" />
                      {progress.message}
                    </span>
                    <span className="font-mono font-bold text-amber-800">{progress.percent}%</span>
                  </div>
                  <div className="w-full bg-amber-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-amber-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress.percent}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Result Success Card */}
              {result && (
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-emerald-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold">Presentasi Google Slides Berhasil Dibuat!</h4>
                      <p className="text-[11px] text-emerald-700">
                        {result.slideCount} slide tersusun rapi dan tersimpan di Google Drive Anda.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <a
                      href={result.presentationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all"
                    >
                      <Presentation className="w-4 h-4" />
                      <span>Buka di Google Slides</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <button
                      onClick={handleCopyLink}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl text-xs font-medium transition-all"
                    >
                      {copiedLink ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-semibold">Tautan Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Salin Tautan Slides</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                >
                  Tutup
                </button>

                <button
                  type="button"
                  onClick={handleStartExport}
                  disabled={isExporting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                >
                  {isExporting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sedang Mengenerate ke Slides...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>{result ? 'Generate Ulang ke Google Slides' : 'Generate Sekarang ke Google Slides'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
              <div>
                <span className="font-bold">Kendala: </span>
                {error}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
