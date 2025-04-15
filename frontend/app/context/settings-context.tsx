'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { applyColorToVariable } from '@/lib/color-utils'

// Define the types for our settings
export interface WebsiteSettings {
  // General settings
  organizationName: string
  eventName: string
  contactEmail: string
  contactPhone: string
  address: string
  aboutOrganization: string
  
  // Social media
  facebook: string
  instagram: string
  twitter: string
  
  // Appearance
  primaryColor: string
  secondaryColor: string
  logo: string
  favicon: string
  
  // Homepage layout
  showHeroSection: boolean
  showFeaturedSections: boolean
  showRegistrationCTA: boolean
  showSponsorsHighlight: boolean
  
  // Notifications
  sendRegistrationConfirmation: boolean
  sendDonationReceipt: boolean
  sendEventReminders: boolean
  sendAdminNotifications: boolean
  notificationEmail: string
}

// Default settings
const defaultSettings: WebsiteSettings = {
  organizationName: 'MilesForHope',
  eventName: 'MilesForHope Charity Run 2023',
  contactEmail: 'info@milesforhope.org',
  contactPhone: '(555) 123-4567',
  address: '456 Community Lane\nHopeville, State 12345',
  aboutOrganization: 'MilesForHope is dedicated to empowering communities through sustainable development, education, and healthcare initiatives. Our annual charity run brings together participants of all levels to support vital community projects.',
  
  facebook: 'https://facebook.com/milesforhope',
  instagram: 'https://instagram.com/milesforhope',
  twitter: 'https://twitter.com/milesforhope',
  
  primaryColor: '#A5D8FF',
  secondaryColor: '#FFF4CC',
  logo: '',
  favicon: '',
  
  showHeroSection: true,
  showFeaturedSections: true,
  showRegistrationCTA: true,
  showSponsorsHighlight: true,
  
  sendRegistrationConfirmation: true,
  sendDonationReceipt: true,
  sendEventReminders: true,
  sendAdminNotifications: true,
  notificationEmail: 'admin@milesforhope.org',
}

// Create the context
interface SettingsContextType {
  settings: WebsiteSettings
  updateSettings: (newSettings: Partial<WebsiteSettings>) => Promise<void>
  isLoading: boolean
  error: string | null
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

// Provider component
export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<WebsiteSettings>(defaultSettings)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load settings from localStorage on initial render
  useEffect(() => {
    const loadSettings = async () => {
      try {
        // In a real app, you would fetch from an API
        // For now, we'll use localStorage
        const savedSettings = localStorage.getItem('websiteSettings')
        
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings)
          setSettings(parsedSettings)
          
          // Apply saved colors to CSS variables
          if (parsedSettings.primaryColor) {
            applyColorToVariable('--primary', parsedSettings.primaryColor)
          }
          
          if (parsedSettings.secondaryColor) {
            applyColorToVariable('--secondary', parsedSettings.secondaryColor)
          }
        }
        
        setIsLoading(false)
      } catch (err) {
        setError('Failed to load settings')
        setIsLoading(false)
      }
    }
    
    loadSettings()
  }, [])

  // Update settings
  const updateSettings = async (newSettings: Partial<WebsiteSettings>) => {
    try {
      setIsLoading(true)
      
      // In a real app, you would send to an API
      // For now, we'll update localStorage
      const updatedSettings = { ...settings, ...newSettings }
      setSettings(updatedSettings)
      localStorage.setItem('websiteSettings', JSON.stringify(updatedSettings))
      
      // Apply CSS variables for colors
      if (newSettings.primaryColor) {
        applyColorToVariable('--primary', newSettings.primaryColor)
      }
      
      if (newSettings.secondaryColor) {
        applyColorToVariable('--secondary', newSettings.secondaryColor)
      }
      
      setIsLoading(false)
    } catch (err) {
      setError('Failed to update settings')
      setIsLoading(false)
    }
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, isLoading, error }}>
      {children}
    </SettingsContext.Provider>
  )
}

// Custom hook to use the settings context
export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
} 