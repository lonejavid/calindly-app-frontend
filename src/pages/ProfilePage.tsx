import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Shield,
  Trash2,
  ArrowLeft,
  Calendar,
  LogOut,
  AlertTriangle,
  BadgeCheck,
} from "lucide-react";
import { LandingHeader } from "@/components/LandingHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useStore } from "@/store/store";
import { API } from "@/lib/axios-client";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "@/routes/common/routePaths";
import SectionReveal from "@/components/SectionReveal";

const containerClass = "max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8";

export default function ProfilePage() {
  const { user, setUser, setAccessToken } = useStore();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate(AUTH_ROUTES.SIGN_IN, { replace: true });
    }
  }, [user, navigate]);

  const handleLogout = () => {
    setUser(null);
    setAccessToken(null);
    navigate(AUTH_ROUTES.SIGN_IN);
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== "DELETE") return;
    setDeleteDialogOpen(false);
    setDeleting(true);
    try {
      await API.post("/auth/delete-account", {});
      setUser(null);
      setAccessToken(null);
      navigate(AUTH_ROUTES.SIGN_IN, { replace: true });
    } catch (e: unknown) {
      window.alert(
        e && typeof e === "object" && "message" in e
          ? String((e as { message: unknown }).message)
          : "Failed to delete account"
      );
    } finally {
      setDeleting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[var(--white)] b2b-page">
      <LandingHeader />

      <main className="pt-8 sm:pt-12 pb-16 sm:pb-24">
        <div className={containerClass}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ink-muted)] hover:text-[var(--blue)] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Hero card */}
          <SectionReveal effect="fade-up">
            <div className="rounded-[var(--r-m)] border border-[var(--line)] bg-[var(--surface)] overflow-hidden shadow-[var(--sh-sm)]">
              <div className="bg-[var(--ink)] text-white px-6 sm:px-8 py-8 sm:py-10">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Avatar className="w-24 h-24 sm:w-28 sm:h-28 ring-4 ring-[var(--blue)] shrink-0">
                    {user.imageUrl && (
                      <AvatarImage src={user.imageUrl} alt={user.name || "Profile"} />
                    )}
                    <AvatarFallback className="bg-[var(--blue)] text-white text-2xl sm:text-3xl font-semibold">
                      {user.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h1 className="b2b-display text-2xl sm:text-3xl font-bold text-white mb-1 inline-flex items-center justify-center gap-2 flex-wrap">
                      {user.name || "User"}
                      <span className="inline-flex items-center justify-center text-[var(--blue)]" title="Verified">
                        <BadgeCheck className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2} />
                      </span>
                    </h1>
                    <p className="text-white/80 flex items-center gap-2 mt-2">
                      <Mail className="w-4 h-4 shrink-0" />
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3 p-4 rounded-[var(--r-m)] bg-[var(--blue-ghost)] border border-[var(--line)]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--blue-lite)] text-[var(--blue)]">
                    <User className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-[var(--ink)]">Profile</p>
                    <p className="text-sm text-[var(--ink-muted)]">
                      Manage your account details. Your data is used to personalize your experience and keep your account secure.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-[var(--r-m)] bg-[var(--white)] border border-[var(--line)]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--blue-lite)] text-[var(--blue)]">
                    <Shield className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-[var(--ink)]">Security</p>
                    <p className="text-sm text-[var(--ink-muted)]">
                      You signed in with Google. Account security is managed through your Google account.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  <Link
                    to={PROTECTED_ROUTES.EVENT_TYPES}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--r-m)] font-semibold bg-[var(--blue)] text-white hover:bg-[var(--blue-dark)] transition-colors"
                    style={{ boxShadow: "var(--sh-blue)" }}
                  >
                    <Calendar className="w-4 h-4" />
                    Go to Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--r-m)] font-semibold text-[var(--ink)] border-2 border-[var(--line)] hover:bg-[var(--surface)] hover:border-[var(--line-strong)] transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Delete Account section */}
          <SectionReveal effect="fade-up">
            <div className="mt-10 rounded-[var(--r-m)] border border-red-200 bg-red-50/50 overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                    <AlertTriangle className="w-6 h-6" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-bold text-[var(--ink)] mb-1">Delete account</h2>
                    <p className="text-sm text-[var(--ink-muted)] mb-4">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        value={deleteConfirm}
                        onChange={(e) => setDeleteConfirm(e.target.value)}
                        placeholder='Type DELETE to confirm'
                        className="px-4 py-2.5 rounded-[var(--r-s)] border border-[var(--line)] bg-[var(--white)] text-[var(--ink)] placeholder:text-[var(--ink-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--blue)] focus:border-transparent max-w-xs"
                      />
                      <button
                        type="button"
                        disabled={deleteConfirm !== "DELETE" || deleting}
                        onClick={() => setDeleteDialogOpen(true)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--r-s)] font-semibold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                        {deleting ? "Deleting…" : "Delete account"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </main>

      {/* Delete account confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="b2b-page sm:max-w-md rounded-[var(--r-l)] border-[var(--line)] bg-[var(--white)]">
          <DialogHeader>
            <div className="flex flex-col items-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 mb-4">
                <Trash2 className="w-7 h-7" strokeWidth={2} />
              </span>
              <DialogTitle className="text-xl font-bold text-[var(--ink)]">
                Are you sure you want to delete your account?
              </DialogTitle>
              <DialogDescription className="mt-2 text-[var(--ink-muted)] text-base leading-relaxed">
                After deletion your account <strong>cannot be recovered</strong>. All your data, including event types, meetings, and settings, will be permanently removed.
              </DialogDescription>
            </div>
          </DialogHeader>
          <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
            <button
              type="button"
              onClick={() => setDeleteDialogOpen(false)}
              className="px-5 py-2.5 rounded-[var(--r-m)] font-semibold text-[var(--ink)] border-2 border-[var(--line)] hover:bg-[var(--surface)] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={deleting}
              onClick={handleDeleteAccount}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--r-m)] font-semibold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              {deleting ? "Deleting…" : "Yes, delete my account"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
