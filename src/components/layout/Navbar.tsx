import React, { useState } from 'react';
import { 
  Zap, 
  Menu, 
  X, 
  AlertOctagon, 
  Calendar, 
  FileText, 
  ShieldCheck, 
  CreditCard, 
  LayoutDashboard, 
  LogOut, 
  User as UserIcon,
  ChevronDown
} from 'lucide-react';
import { Link, usePathname, useRouter } from '../../lib/next-shim';
import { useAuth } from '../../context/AuthContext';
import { ThemeToggle } from '../ui/ThemeToggle';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout, loginAsDemo } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navLinks = [
    { href: '/outages', label: 'Live Outages', icon: AlertOctagon },
    { href: '/schedule', label: 'Load Shedding Schedule', icon: Calendar },
    { href: '/report-outage', label: 'Report Power Cut', icon: FileText, highlight: true },
    { href: '/verify-report', label: 'Verify Code', icon: ShieldCheck },
    { href: '/pricing', label: 'Stripe Priority Alerts', icon: CreditCard },
  ];

  const handleRoleSwitch = (role: UserRole) => {
    loginAsDemo(role);
    setRoleDropdownOpen(false);
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30';
      case 'OPERATOR':
        return 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30';
      case 'CITIZEN':
      default:
        return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 flex items-center justify-center text-white shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                  Volt<span className="text-amber-500">Watch</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                  Grid Core
                </span>
              </div>
              <span className="hidden sm:block text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Load Shedding & Outage System
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map(link => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                    link.highlight
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 hover:bg-amber-500/20'
                      : isActive
                      ? 'bg-slate-100 dark:bg-slate-800/80 text-amber-600 dark:text-amber-400'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5">
            {/* Quick Role Tester Dropdown */}
            {user && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                  className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-colors ${getRoleBadgeColor(
                    user.role
                  )}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                  <span>{user.role}</span>
                  <ChevronDown className="w-3 h-3 opacity-70" />
                </button>

                {roleDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1.5 shadow-xl z-50">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Switch Role (B7A7 Demo)
                    </div>
                    <button
                      onClick={() => handleRoleSwitch('ADMIN')}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-purple-600 dark:text-purple-400 hover:bg-purple-500/10 transition-colors flex items-center justify-between"
                    >
                      <span>Admin</span>
                      {user.role === 'ADMIN' && <span className="text-[10px]">● Active</span>}
                    </button>
                    <button
                      onClick={() => handleRoleSwitch('OPERATOR')}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 transition-colors flex items-center justify-between"
                    >
                      <span>Operator</span>
                      {user.role === 'OPERATOR' && <span className="text-[10px]">● Active</span>}
                    </button>
                    <button
                      onClick={() => handleRoleSwitch('CITIZEN')}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 transition-colors flex items-center justify-between"
                    >
                      <span>Citizen</span>
                      {user.role === 'CITIZEN' && <span className="text-[10px]">● Active</span>}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Dashboard Link button */}
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 transition-opacity shadow-sm"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>

            {/* Light/Dark Theme Switcher */}
            <ThemeToggle />

            {/* Auth Button */}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  router.push('/login');
                }}
                title="Log out"
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-rose-500 hover:border-rose-500/30 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            ) : (
              <Link
                href="/login"
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-sm transition-colors"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 space-y-2">
          {navLinks.map(link => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold ${
                  pathname === link.href
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            {user && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleRoleSwitch('ADMIN')}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400"
                >
                  Admin
                </button>
                <button
                  onClick={() => handleRoleSwitch('OPERATOR')}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400"
                >
                  Operator
                </button>
                <button
                  onClick={() => handleRoleSwitch('CITIZEN')}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                >
                  Citizen
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
