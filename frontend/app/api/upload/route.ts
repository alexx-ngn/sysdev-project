import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }
    
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Create a unique filename
    const filename = `${Date.now()}-${file.name}`
    
    // Save to public directory
    const publicDir = join(process.cwd(), 'public', 'uploads')
    const filePath = join(publicDir, filename)
    
    await writeFile(filePath, buffer)
    
    // Return the URL path
    return NextResponse.json({ 
      url: `/uploads/${filename}` 
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    )
  }
} 