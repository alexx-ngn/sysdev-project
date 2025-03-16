"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    runDistance: "",
    agreeTerms: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeTerms: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData)
    // Reset form or show success message
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700">
          Age
        </label>
        <Input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required min="18" />
      </div>
      <div>
        <label htmlFor="runDistance" className="block text-sm font-medium text-gray-700">
          Run Distance
        </label>
        <Select
          id="runDistance"
          name="runDistance"
          value={formData.runDistance}
          onValueChange={(value) => handleChange({ target: { name: "runDistance", value } } as any)}
          required
        >
          <option value="">Select distance</option>
          <option value="5k">5K</option>
          <option value="10k">10K</option>
          <option value="halfMarathon">Half Marathon</option>
          <option value="marathon">Full Marathon</option>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="agreeTerms" checked={formData.agreeTerms} onCheckedChange={handleCheckboxChange} />
        <label
          htmlFor="agreeTerms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I agree to the terms and conditions
        </label>
      </div>
      <Button type="submit" className="w-full">
        Register for the Run
      </Button>
    </form>
  )
}

