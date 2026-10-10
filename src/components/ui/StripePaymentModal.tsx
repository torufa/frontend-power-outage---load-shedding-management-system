import React, { useState } from 'react';
import { 
  CreditCard, 
  Lock, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Download, 
  ExternalLink,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Modal } from './Modal';
import { StripePlan, StripeTransaction } from '../../types';
import { MockBackendService } from '../../lib/mock-backend';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

interface StripePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: StripePlan | null;
  onSuccess?: (tx: StripeTransaction) => void;
}

export const StripePaymentModal: React.FC<StripePaymentModalProps> = ({
  isOpen,
  onClose,
  plan,
  onSuccess
}) => {
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [zip, setZip] = useState('94103');
  const [cardHolder, setCardHolder] = useState(user?.name || 'David Mitchell');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedTx, setCompletedTx] = useState<StripeTransaction | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!plan) return null;

  // Format card number with spaces
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = val.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  // Format expiry MM/YY
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 2) {
      val = `${val.slice(0, 2)}/${val.slice(2)}`;
    }
    setExpiry(val);
  };

  // Autofill test card
  const handleFillTestCard = () => {
    setCardNumber('4242 4242 4242 4242');
    setExpiry('12/28');
    setCvc('424');
    setZip('94103');
    setErrorMessage(null);
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const rawCard = cardNumber.replace(/\s/g, '');
    if (rawCard.length < 15) {
      setErrorMessage('Please enter a valid 16-digit card number.');
      return;
    }
    if (expiry.length < 5) {
      setErrorMessage('Please enter a valid expiry date (MM/YY).');
      return;
    }
    if (cvc.length < 3) {
      setErrorMessage('Please enter a valid 3 or 4-digit CVC.');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate real Stripe network roundtrip
      await new Promise(r => setTimeout(r, 1800));

      const cardLast4 = rawCard.slice(-4) || '4242';
      const cardBrand = rawCard.startsWith('4') ? 'visa' : rawCard.startsWith('5') ? 'mastercard' : 'amex';

      const transaction = MockBackendService.processStripePayment({
        userEmail: user?.email || 'citizen@voltwatch.gov',
        planName: plan.name,
        amountUSD: plan.priceUSD,
        cardLast4,
        cardBrand
      });

      // Update auth user profile with active alert subscription
      updateUser({
        hasActiveAlertSubscription: true,
        stripeCustomerId: `cus_${Math.random().toString(36).substring(2, 10)}`
      });

      setCompletedTx(transaction);
      showToast(`Stripe Payment of $${plan.priceUSD.toFixed(2)} confirmed! Subscription active.`, 'success');
      
      if (onSuccess) {
        onSuccess(transaction);
      }
    } catch {
      setErrorMessage('Payment failed. Please check card details or try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetAndClose = () => {
    setCompletedTx(null);
    setCardNumber('');
    setExpiry('');
    setCvc('');
    setErrorMessage(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title={completedTx ? "Payment Succeeded" : "Stripe Secure Checkout"}
      subtitle={completedTx ? "Your transaction has been processed and verified on Stripe" : `Complete your subscription for ${plan.name}`}
      maxWidth="md"
    >
      {completedTx ? (
        <div className="flex flex-col items-center text-center py-4 space-y-5 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 ring-8 ring-emerald-500/5">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">
              Payment of ${completedTx.amountUSD.toFixed(2)} Confirmed
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Your priority feeder alerts & load shedding warnings are now live.
            </p>
          </div>

          {/* Stripe Receipt Box */}
          <div className="w-full bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 text-left space-y-2 text-xs">
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Receipt Number</span>
              <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{completedTx.receiptNumber}</span>
            </div>
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Stripe PaymentIntent</span>
              <span className="font-mono text-slate-800 dark:text-slate-200 truncate max-w-[180px]">{completedTx.paymentIntentId}</span>
            </div>
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Payment Method</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 uppercase">{completedTx.cardBrand} •••• {completedTx.last4}</span>
            </div>
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Customer Email</span>
              <span className="text-slate-800 dark:text-slate-200">{completedTx.userEmail}</span>
            </div>
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Timestamp</span>
              <span className="text-slate-800 dark:text-slate-200">{completedTx.createdAt}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
            <button
              onClick={() => {
                showToast(`Receipt ${completedTx.receiptNumber} downloaded to device.`, 'info');
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              Download Receipt
            </button>
            <button
              onClick={handleResetAndClose}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold shadow-md transition-colors"
            >
              Done & Return
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handlePay} className="space-y-4">
          {/* Order Summary banner */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-slate-900 dark:text-white">
            <div>
              <div className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                Plan Selected
              </div>
              <div className="font-bold text-sm sm:text-base">
                {plan.name}
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">
                ${plan.priceUSD.toFixed(2)}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 block">
                {plan.interval === 'month' ? '/month' : 'one-time'}
              </span>
            </div>
          </div>

          {/* Quick Demo Test Card Fill */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
            <span className="text-slate-600 dark:text-slate-300 font-medium">
              Stripe Test Environment Mode
            </span>
            <button
              type="button"
              onClick={handleFillTestCard}
              className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs flex items-center gap-1 shadow-sm transition-colors"
            >
              <Sparkles className="w-3 h-3" />
              Autofill Test Card
            </button>
          </div>

          {errorMessage && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Card Details */}
          <div className="space-y-3 pt-1">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
                Name on Card
              </label>
              <input
                type="text"
                value={cardHolder}
                onChange={e => setCardHolder(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  required
                  className="w-full pl-10 pr-12 py-2.5 text-sm font-mono rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                />
                <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <span className="absolute right-3.5 top-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  STRIPE
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
                  Expiry (MM/YY)
                </label>
                <input
                  type="text"
                  placeholder="12/28"
                  value={expiry}
                  onChange={handleExpiryChange}
                  required
                  className="w-full px-3.5 py-2.5 text-sm font-mono rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
                  CVC / CVV
                </label>
                <div className="relative">
                  <input
                    type="password"
                    maxLength={4}
                    placeholder="424"
                    value={cvc}
                    onChange={e => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    required
                    className="w-full px-3.5 py-2.5 text-sm font-mono rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                  <Lock className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
                ZIP / Postal Code
              </label>
              <input
                type="text"
                placeholder="94103"
                value={zip}
                onChange={e => setZip(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-70 text-white font-bold text-sm shadow-md transition-all duration-200"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing via Stripe...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Pay ${plan.priceUSD.toFixed(2)} with Stripe
              </>
            )}
          </button>

          {/* Stripe security reassurance - strictly Stripe */}
          <div className="flex items-center justify-center gap-3 text-[11px] text-slate-400 dark:text-slate-500 pt-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              256-Bit SSL End-to-End Encrypted
            </span>
            <span>•</span>
            <span>Powered by Stripe</span>
          </div>
        </form>
      )}
    </Modal>
  );
};
