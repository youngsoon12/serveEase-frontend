'use client';

import Button from '@/components/Button';
import { AlertCircle, RefreshCw } from 'lucide-react';

type Props = {
  title?: string;
  message?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
};

export default function ErrorState({
  title = '데이터를 불러올 수 없습니다',
  message = '네트워크를 확인하거나 잠시 후 다시 시도해주세요.',
  onRetry,
  isRetrying = false,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      <div className="bg-red-50 rounded-full p-4">
        <AlertCircle className="w-16 h-16 text-red-500" />
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <p className="text-gray-500 text-sm">{message}</p>
      </div>

      {onRetry && (
        <Button
          className="flex items-center gap-2"
          variant="outline"
          onClick={onRetry}
          disabled={isRetrying}
        >
          <RefreshCw
            className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`}
          />
          {isRetrying ? '다시 시도 중...' : '다시 시도'}
        </Button>
      )}
    </div>
  );
}
