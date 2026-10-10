import React, { useRef, useState, useEffect } from 'react';
import { Check, ShieldCheck, RefreshCw } from 'lucide-react';

interface VerificationCodeInputProps {
  length?: number;
  onComplete: (code: string) => void;
  isLoading?: boolean;
  error?: string | null;
  autoFocus?: boolean;
  onResend?: () => void;
}

export const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({
  length = 6,
  onComplete,
  isLoading = false,
  error = null,
  autoFocus = true,
  onResend
}) => {
  const [digits, setDigits] = useState<string[]>(Array(length).fill(''));
  const [resendCooldown, setResendCooldown] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      handlePaste(value);
      return;
    }

    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    // Auto-advance
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    const fullCode = newDigits.join('');
    if (fullCode.length === length && !newDigits.includes('')) {
      onComplete(fullCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (pasted: string) => {
    const cleaned = pasted.replace(/\D/g, '').slice(0, length);
    if (!cleaned) return;

    const newDigits = Array(length).fill('');
    for (let i = 0; i < cleaned.length; i++) {
      newDigits[i] = cleaned[i];
    }
    setDigits(newDigits);

    const nextIndex = Math.min(cleaned.length, length - 1);
    inputRefs.current[nextIndex]?.focus();

    if (cleaned.length === length) {
      onComplete(cleaned);
    }
  };

  const handleResendClick = () => {
    if (resendCooldown === 0 && onResend) {
      onResend();
      setResendCooldown(30);
    }
  };

  const isComplete = digits.every(d => d !== '');

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex items-center justify-center gap-2 sm:gap-3 w-full">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={el => { inputRefs.current[index] = el; }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            disabled={isLoading}
            onChange={e => handleChange(index, e.target.value)}
            onKeyDown={e => handleKeyDown(index, e)}
            onPaste={e => {
              e.preventDefault();
              handlePaste(e.clipboardData.getData('text'));
            }}
            className={`w-11 h-14 sm:w-13 sm:h-16 text-center text-xl sm:text-2xl font-bold font-mono rounded-xl border transition-all duration-200 outline-none ${
              error
                ? 'border-rose-500 bg-rose-500/5 text-rose-600 focus:ring-2 focus:ring-rose-500/30'
                : digit
                ? 'border-amber-500 bg-amber-500/5 text-slate-900 dark:text-white ring-2 ring-amber-500/20'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white hover:border-slate-300 dark:hover:border-slate-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
            }`}
          />
        ))}
      </div>

      {error && (
        <p className="text-xs text-rose-500 font-medium tracking-wide animate-shake">
          {error}
        </p>
      )}

      <div className="flex items-center justify-between w-full text-xs text-slate-500 dark:text-slate-400 pt-2 px-1">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Security 256-bit Token</span>
        </div>

        {onResend && (
          <button
            type="button"
            onClick={handleResendClick}
            disabled={resendCooldown > 0 || isLoading}
            className={`flex items-center gap-1 font-medium transition-colors ${
              resendCooldown > 0
                ? 'text-slate-400 cursor-not-allowed'
                : 'text-amber-600 dark:text-amber-400 hover:underline cursor-pointer'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : 'Resend code'}
          </button>
        )}
      </div>
    </div>
  );
};
