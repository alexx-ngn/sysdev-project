import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Forward the request to the backend API
    const response = await fetch('http://localhost:8000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Backend error:', data);
      throw new Error(data.message || 'Failed to submit contact form');
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to submit contact form' },
      { status: 500 }
    );
  }
} 