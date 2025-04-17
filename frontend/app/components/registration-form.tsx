"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from '@/app/context/language-context'
import { toast } from "sonner"

export function RegistrationForm() {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    Email: "",
    RegistrationStatus: "pending"
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.errors) {
          // Handle validation errors
          const errorMessages = Object.values(data.errors).flat().join('\n')
          throw new Error(errorMessages)
        }
        throw new Error(data.error || t('register.errorMessage'))
      }

      toast.success(t('register.successMessage'))
      setFormData({
        FirstName: "",
        LastName: "",
        PhoneNumber: "",
        Email: "",
        RegistrationStatus: "pending"
      })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('register.errorMessage'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
          {t('register.form.firstName')}
        </label>
        <Input
          type="text"
          id="FirstName"
          name="FirstName"
          value={formData.FirstName}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>
      <div>
        <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
          {t('register.form.lastName')}
        </label>
        <Input 
          type="text" 
          id="LastName" 
          name="LastName" 
          value={formData.LastName} 
          onChange={handleChange} 
          required 
          disabled={isLoading}
        />
      </div>
      <div>
        <label htmlFor="PhoneNumber" className="block text-sm font-medium text-gray-700">
          {t('register.form.phoneNumber')}
        </label>
        <Input
          type="tel"
          id="PhoneNumber"
          name="PhoneNumber"
          value={formData.PhoneNumber}
          onChange={handleChange}
          required
          disabled={isLoading}
          pattern="^(\+1)?\d{10}$"
          title="Please enter a valid 10-digit phone number (e.g., 1234567890 or +11234567890)"
        />
      </div>
      <div>
        <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
          {t('register.form.email')}
        </label>
        <Input 
          type="email" 
          id="Email" 
          name="Email" 
          value={formData.Email} 
          onChange={handleChange} 
          required 
          disabled={isLoading}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? t('register.form.submitting') : t('register.form.submit')}
      </Button>
    </form>
  )
}

