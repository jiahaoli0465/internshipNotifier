import { useState } from 'react';
import axios from 'axios';

interface SendTextResult {
  success: boolean;
  textId?: string;
  error?: string;
}

interface UseSendTextReturn {
  sendText: (phoneNumber: string, message: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const useSendText = (): UseSendTextReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sendText = async (phoneNumber: string, message: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post<SendTextResult>(
        'https://textbelt.com/text',
        {
          phone: phoneNumber,
          message: message,
          key: window.process.env.VITE_TEXTBELT_API_KEY,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.data.success) {
        setSuccess(true);
      } else {
        setError(response.data.error || 'Failed to send SMS');
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  return { sendText, loading, error, success };
};

export default useSendText;
