import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GraduationCap, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'
import { config } from '@/config'
import { getFriendlyErrorMessage, getApiErrorMessage } from '@/lib/errorHandler'

export default function ChangePasswordPage() {
  const navigate = useNavigate()
  const { refetchUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    // Client-side validation
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match. Please try again.')
      return
    }

    if (currentPassword === newPassword) {
      setError('Your new password must be different from your current password.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${config.apiUrl}/api/auth/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Use user-friendly error message from API
        setError(getApiErrorMessage(data))
        return
      }

      setSuccess(true)

      // Refetch user to update must_change_password flag
      await refetchUser()

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)
    } catch (err) {
      // Handle network errors and other unexpected errors
      const friendlyError = getFriendlyErrorMessage(err)
      setError(friendlyError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-8">
        {/* Logo and Header */}
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <GraduationCap className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Change Password Required</h1>
          <p className="text-sm text-muted-foreground">
            For security reasons, you must change your password before continuing
          </p>
        </div>

        {/* Password Change Form */}
        <Card>
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-center text-xl">New Password</CardTitle>
            <CardDescription className="text-center">
              Please choose a strong password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  disabled={loading || success}
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={loading || success}
                />
                <p className="text-xs text-muted-foreground">
                  Min 8 chars, 1 uppercase, 1 lowercase, 1 number
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading || success}
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 rounded-md">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="flex items-center gap-2 p-3 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 rounded-md">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>Password changed successfully! Redirecting...</span>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={loading || success}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {success ? 'Success!' : 'Change Password'}
              </Button>
            </form>

            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-md">
              <p className="text-xs text-yellow-800 dark:text-yellow-300">
                <strong>Important:</strong> You cannot access the application until you change your password. Your new password must be different from your current password and meet all security requirements.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
