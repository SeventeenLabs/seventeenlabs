'use client';

import { useCallback, useState } from 'react';

type SubscriptionStatus = 'idle' | 'loading' | 'success' | 'error';

interface SubscribeOptions {
  name?: string;
  surname?: string;
  note?: string;
}

interface SubscribeResult {
  success: boolean;
  message: string;
}

export function useBlogSubscription(defaultNote?: string) {
  const [status, setStatus] = useState<SubscriptionStatus>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const subscribe = useCallback(
    async (email: string, options?: SubscribeOptions): Promise<SubscribeResult> => {
      const trimmedEmail = email.trim();
      if (!trimmedEmail) {
        const result = { success: false, message: 'Email is required.' };
        setStatus('error');
        setMessage(result.message);
        return result;
      }

      setStatus('loading');
      setMessage(null);

      try {
        const payload = {
          email: trimmedEmail,
          name: options?.name?.trim() || undefined,
          surname: options?.surname?.trim() || undefined,
          note: options?.note?.trim() || defaultNote,
        };

        const response = await fetch('/api/blog/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        let data: any = null;
        try {
          data = await response.json();
        } catch (error) {
          data = null;
        }

        if (!response.ok) {
          const errorMessage = data?.error || 'Unable to subscribe right now.';
          throw new Error(errorMessage);
        }

        const successMessage = data?.message || 'Thanks for subscribing!';
        setStatus('success');
        setMessage(successMessage);
        return { success: true, message: successMessage };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unable to subscribe right now.';
        setStatus('error');
        setMessage(errorMessage);
        return { success: false, message: errorMessage };
      }
    },
    [defaultNote],
  );

  const reset = useCallback(() => {
    setStatus('idle');
    setMessage(null);
  }, []);

  return {
    status,
    message,
    subscribe,
    reset,
  };
}
