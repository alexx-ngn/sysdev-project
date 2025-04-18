'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock, AlertCircle, Heart, Check, X } from 'lucide-react';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    email: searchParams.get('email') || '',
    token: searchParams.get('token') || '',
    password: '',
    password_confirmation: '',
  });
  const [validationErrors, setValidationErrors] = useState<{
    password?: string[];
  }>({});

  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
    match: false,
  });

  const updatePasswordChecks = (password: string, confirmation: string) => {
    setPasswordChecks({
      length: password.length >= 12,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[@$!%*?&]/.test(password),
      match: password === confirmation && password !== '',
    });
  };

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    
    if (password.length < 12) {
      errors.push('Password must be at least 12 characters long');
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      errors.push('Password must contain at least one special character (@$!%*?&)');
    }
    
    return errors;
  };

  useEffect(() => {
    const verifyToken = async () => {
      if (!formData.email || !formData.token) {
        setError('Invalid reset link. Please request a new password reset.');
        setIsTokenValid(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:8000/api/admin/verify-reset-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            token: formData.token,
          }),
        });

        const data = await response.json();
        setIsTokenValid(data.valid);
        if (!data.valid) {
          setError('Invalid or expired reset link. Please request a new password reset.');
        }
      } catch (err) {
        setError('Failed to verify reset link. Please try again.');
        setIsTokenValid(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (formData.email && formData.token) {
      verifyToken();
    }
  }, [formData.email, formData.token]);

  // Update password checks whenever password or confirmation changes
  useEffect(() => {
    updatePasswordChecks(formData.password, formData.password_confirmation);
  }, [formData.password, formData.password_confirmation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setValidationErrors({});

    // Client-side validation
    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      setValidationErrors({ password: passwordErrors });
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setValidationErrors({ password: ['Passwords do not match'] });
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8000/api/admin/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess('Password has been reset successfully. You can now login with your new password.');
        setTimeout(() => {
          router.push('/admin/login');
        }, 3000);
      } else {
        if (data.errors?.password) {
          setValidationErrors({ password: Array.isArray(data.errors.password) ? data.errors.password : [data.errors.password] });
        } else {
          throw new Error(data.message || 'Failed to reset password');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const RequirementCheck = ({ met, text }: { met: boolean; text: string }) => (
    <div className="flex items-center gap-2">
      {met ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <X className="h-4 w-4 text-gray-300" />
      )}
      <span className={met ? 'text-green-500' : 'text-gray-500'}>{text}</span>
    </div>
  );

  if (isTokenValid === null) {
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
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
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
            <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
            <CardDescription className="text-center">
              {isTokenValid 
                ? 'Enter your new password below'
                : 'Invalid or expired reset link'}
            </CardDescription>
          </CardHeader>

          {error && (
            <Alert variant="destructive" className="mx-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mx-4">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {isTokenValid && (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    New Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    minLength={12}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  {validationErrors.password && (
                    <div className="text-sm text-red-500 space-y-1">
                      {validationErrors.password.map((error, index) => (
                        <p key={index}>{error}</p>
                      ))}
                    </div>
                  )}
                  <div className="text-sm space-y-2 mt-2">
                    <p className="text-muted-foreground">Password requirements:</p>
                    <div className="grid gap-2">
                      <RequirementCheck met={passwordChecks.length} text="At least 12 characters long" />
                      <RequirementCheck met={passwordChecks.uppercase} text="One uppercase letter" />
                      <RequirementCheck met={passwordChecks.lowercase} text="One lowercase letter" />
                      <RequirementCheck met={passwordChecks.number} text="One number" />
                      <RequirementCheck met={passwordChecks.special} text="One special character (@$!%*?&)" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password_confirmation" className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Confirm New Password
                  </Label>
                  <Input
                    id="password_confirmation"
                    type="password"
                    required
                    minLength={12}
                    value={formData.password_confirmation}
                    onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                  />
                  <div className="text-sm mt-2">
                    <RequirementCheck met={passwordChecks.match} text="Passwords match" />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading || !Object.values(passwordChecks).every(Boolean)}
                >
                  {isLoading ? 'Resetting Password...' : 'Reset Password'}
                </Button>
              </CardContent>
            </form>
          )}

          {!isTokenValid && (
            <CardContent>
              <Button
                onClick={() => router.push('/admin/forgot-password')}
                className="w-full"
                variant="outline"
              >
                Request New Reset Link
              </Button>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
} 