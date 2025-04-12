'use client'

import { useSettings } from "@/app/context/settings-context"
import { useEffect } from "react"

/**
 * This component applies website settings to the document
 * It should be included in the layout or pages where settings should be applied
 */
export function WebsiteSettings() {
  const { settings } = useSettings()

  // Apply settings to the document
  useEffect(() => {
    // Update document title
    document.title = settings.organizationName

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', settings.aboutOrganization.substring(0, 160))
    }

    // Update favicon if available
    if (settings.favicon) {
      const favicon = document.querySelector('link[rel="icon"]')
      if (favicon) {
        favicon.setAttribute('href', settings.favicon)
      }
    }

    // Apply CSS variables for colors
    if (settings.primaryColor) {
      document.documentElement.style.setProperty('--primary', settings.primaryColor)
    }

    if (settings.secondaryColor) {
      document.documentElement.style.setProperty('--secondary', settings.secondaryColor)
    }
  }, [settings])

  // This component doesn't render anything
  return null
} 