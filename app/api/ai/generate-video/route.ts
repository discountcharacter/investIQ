import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function POST(request: Request) {
  try {
    const { topic } = await request.json();
    
    const prompt = `Generate a short script for a finance education video on: ${topic}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const script = response.text();
    
    const mockVideoUrl = `https://example.com/videos/${Date.now()}`;
    
    return NextResponse.json({ videoUrl: mockVideoUrl, script });
  } catch (error) {
    console.error('AI response error:', error);
    return NextResponse.json({ error: 'Failed to generate video script' }, { status: 500 });
  }
}