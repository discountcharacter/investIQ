import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function POST(request: Request) {
  try {
    const { question } = await request.json();
    
    const prompt = `You are a helpful finance education assistant. Please answer the following question about finance: ${question}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const answer = response.text();
    
    return NextResponse.json({ answer });
  } catch (error) {
    console.error('AI response error:', error);
    return NextResponse.json({ error: 'Failed to get AI response' }, { status: 500 });
  }
}