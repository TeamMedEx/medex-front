import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback,
  RefObject,
} from 'react';
import { signIn } from 'next-auth/react';
import { GoogleSVG } from '../svg/Google';

export type SocialLoginPromptRef = {
  open: () => void;
  close: () => void;
};

export function SocialLoginPrompt(
  { defaultOpened = false },
  ref: RefObject<SocialLoginPromptRef>,
) {
  const [showModal, setShowModal] = useState(defaultOpened);

  const close = useCallback(() => setShowModal(false), []);

  useImperativeHandle(
    ref,
    () => ({
      open: () => setShowModal(true),
      close,
    }),
    [close],
  );
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    },
    [close],
  );

  useEffect(() => {
    if (showModal) document.addEventListener('keydown', handleEscape, false);
    return () => document.removeEventListener('keydown', handleEscape, false);
  }, [handleEscape, showModal]);

  return (
    <div className={`${showModal ? 'block' : 'hidden'}`}>
      <div
        onClick={close}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none backdrop-blur-sm focus:outline-none"
      >
        <div className="relative my-6 mx-auto w-auto max-w-3xl">
          <div className="relative flex w-[390px] flex-col rounded-lg border border-solid bg-white outline-none focus:outline-none">
            <div className="relative flex-auto py-12 px-9 text-center">
              <h3 className="mb-5 text-lg font-bold md:text-lg">
                Akun terhubung dengan Google
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-slate-600">
                Akun kamu <strong>jhondoe@mail.com</strong> telah terhubung
                dengan google.
              </p>
              <div
                className="flex cursor-pointer flex-col space-y-4 py-2"
                onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              >
                <GoogleSVG />
              </div>
              <div
                className="cursor-pointer pt-4 hover:underline"
                onClick={close}
              >
                <p className="text-sm font-semibold leading-relaxed text-slate-500">
                  Masuk dengan akun lain
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </div>
  );
}

export default forwardRef<SocialLoginPromptRef, { defaultOpened?: boolean }>(
  SocialLoginPrompt,
);
