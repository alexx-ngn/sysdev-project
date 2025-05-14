'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { applyColorToVariable } from '@/lib/color-utils'
import { API_ENDPOINTS } from '@/app/config/api'

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
  eventName: 'MilesForHope',
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

  // Load settings from API on initial render
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.SETTINGS.GET_ALL, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('milesforhope-admin-token')}`,
          },
        })
        
        if (!response.ok) {
          throw new Error('Failed to load settings')
        }

        const data = await response.json()
        
        // Merge API settings with defaults
        const mergedSettings = {
          ...defaultSettings,
          ...data.general,
          ...data.social,
          ...data.appearance,
          ...data.layout,
          ...data.notifications,
        }
        
        setSettings(mergedSettings)
        
        // Apply saved colors to CSS variables
        if (mergedSettings.primaryColor) {
          applyColorToVariable('--primary', mergedSettings.primaryColor)
        }
        
        if (mergedSettings.secondaryColor) {
          applyColorToVariable('--secondary', mergedSettings.secondaryColor)
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
      
      // Group settings by their category
      const groupedSettings: Record<string, Record<string, any>> = {
        general: {},
        social: {},
        appearance: {},
        layout: {},
        notifications: {},
      }

      // Categorize settings
      Object.entries(newSettings).forEach(([key, value]) => {
        if ([
          'organizationName', 'eventName', 'contactEmail', 'contactPhone', 'address', 'aboutOrganization'
        ].includes(key)) {
          groupedSettings.general[key] = value
        } else if ([
          'facebook', 'instagram', 'twitter'
        ].includes(key)) {
          groupedSettings.social[key] = value
        } else if ([
          'primaryColor', 'secondaryColor', 'logo', 'favicon'
        ].includes(key)) {
          groupedSettings.appearance[key] = value
        } else if ([
          'showHeroSection', 'showFeaturedSections', 'showRegistrationCTA', 'showSponsorsHighlight'
        ].includes(key)) {
          groupedSettings.layout[key] = value
        } else if ([
          'sendRegistrationConfirmation', 'sendDonationReceipt', 'sendEventReminders', 'sendAdminNotifications', 'notificationEmail'
        ].includes(key)) {
          groupedSettings.notifications[key] = value
        }
      })

      // Only send non-empty groups
      const filteredSettings: Record<string, any> = {}
      Object.entries(groupedSettings).forEach(([group, values]) => {
        if (Object.keys(values).length > 0) {
          filteredSettings[group] = values
        }
      })

      // Wrap in { settings: ... }
      const response = await fetch(API_ENDPOINTS.SETTINGS.UPDATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('milesforhope-admin-token')}`,
        },
        body: JSON.stringify({ settings: filteredSettings }),
      })

      if (!response.ok) {
        let message = 'Failed to update settings'
        try {
          const data = await response.json()
          if (data && data.errors) {
            message = JSON.stringify(data.errors)
          } else if (data && data.message) {
            message = data.message
          }
        } catch {}
        throw new Error(message)
      }

      // Merge updated settings into current settings
      setSettings(prev => ({ ...prev, ...newSettings }))
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      throw err
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