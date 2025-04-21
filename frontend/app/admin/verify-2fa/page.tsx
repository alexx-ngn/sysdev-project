'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Heart, KeyRound, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'sonner';
import Link from 'next/link';
import { API_ENDPOINTS } from '@/app/config/api';

interface TwoFASetupData {
  email: string;
  qr_code_url: string;
  secret: string;
}

export default function Verify2FAPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [setupData, setSetupData] = useState<TwoFASetupData | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem('2fa_setup_data');
    if (!data) {
      setError('No 2FA setup data found. Please try resetting your password again.');
      setIsInitializing(false);
      return;
    }

    try {
      const parsedData = JSON.parse(data);
      if (!parsedData.email || !parsedData.qr_code_url || !parsedData.secret) {
        setError('Invalid 2FA setup data. Please try resetting your password again.');
        setIsInitializing(false);
        return;
      }

      setSetupData(parsedData);
      setIsInitializing(false);
    } catch (err) {
      setError('Failed to load 2FA setup data. Please try resetting your password again.');
      setIsInitializing(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.ADMIN.VERIFY_2FA, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: setupData?.email,
          code: verificationCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid verification code. Please try again.');
      }

      // Clear 2FA setup data from localStorage
      localStorage.removeItem('2fa_setup_data');
      
      toast.success('2FA setup complete! You can now log in');
      router.push('/admin/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify 2FA code. Please try again.');
      setVerificationCode('');
    } finally {
      setIsLoading(false);
    }
  };

  if (isInitializing) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mb-8">
            <Heart className="h-10 w-10 text-gray-800" />
            <span className="ml-2 text-2xl font-bold">MilesForHope</span>
          </div>
          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Heart className="h-10 w-10 text-gray-800" />
          <span className="ml-2 text-2xl font-bold">MilesForHope</span>
        </div>

        <Card className="border-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Set Up Two-Factor Authentication</CardTitle>
            <CardDescription className="text-center">
              {setupData ? 'Scan the QR code with your authenticator app and enter the verification code' : 'Error loading 2FA setup'}
            </CardDescription>
          </CardHeader>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-800 mx-6 mb-6">
              {error}
            </div>
          )}

          <CardContent>
            {setupData ? (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <QRCodeSVG value={setupData.qr_code_url} size={200} />
                </div>
                
                <div className="text-center text-sm text-muted-foreground">
                  <p>Or enter this code manually:</p>
                  <p className="font-mono bg-muted p-2 rounded-md mt-2">{setupData.secret}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="verificationCode" className="flex items-center gap-2">
                      <KeyRound className="h-4 w-4" />
                      Verification Code
                    </Label>
                    <Input
                      id="verificationCode"
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      maxLength={6}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Verify Code'
                    )}
                  </Button>
                </form>
              </div>
            ) : (
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full"
                  asChild
                >
                  <Link href="/admin/forgot-password">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Password Reset
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 