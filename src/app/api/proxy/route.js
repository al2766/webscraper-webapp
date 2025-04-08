import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
  try {
    // Get URL from query parameters
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    
    if (!url) {
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 }
      );
    }
    
    // Set custom headers to mimic a browser
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'Cache-Control': 'max-age=0'
    };
    
    // Fetch the website
    const response = await axios.get(url, { headers });
    
    // Return the HTML content
    return new NextResponse(response.data, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8'
      }
    });
  } catch (error) {
    console.error('Error proxying website:', error);
    
    // Handle different types of errors
    if (error.response) {
      return NextResponse.json(
        { error: `Target server responded with ${error.response.status}` },
        { status: error.response.status }
      );
    } else if (error.request) {
      return NextResponse.json(
        { error: 'Could not connect to the target server' },
        { status: 502 }
      );
    } else {
      return NextResponse.json(
        { error: 'Internal error: ' + error.message },
        { status: 500 }
      );
    }
  }
}