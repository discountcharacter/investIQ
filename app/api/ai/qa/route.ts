// import { NextResponse } from 'next/server';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
// const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
// export const dynamic = "force-dynamic";
// export async function POST(request: Request) {
//   try {
//     const { question } = await request.json();
    
//     const prompt = `You are a helpful finance education assistant. Please answer the following question about finance: ${question}`;
    
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const answer = response.text();
    
//     return NextResponse.json({ answer });
//   } catch (error) {
//     console.error('AI response error:', error);
//     return NextResponse.json({ error: 'Failed to get AI response' }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("❌ ERROR: GEMINI_API_KEY is missing. Set it in your environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(request: Request) {
  try {
    const { question } = await request.json();
    if (!question) {
      return NextResponse.json({ error: "Missing 'question' in request body" }, { status: 400 });
    }

    console.log("🔹 Received Question:", question);

    const prompt = `You are a helpful finance education assistant. Answer this question about finance: ${question}`;

    const result = await model.generateContent(prompt);
    
    // Ensure response exists
    if (!result || !result.response) {
      console.error("❌ ERROR: No valid response from AI model.");
      return NextResponse.json({ error: "AI model did not return a response" }, { status: 500 });
    }

    let answer;
    try {
      // Some versions return response.text(), others use .candidates[0].content
      answer = result.response.text?.() || result.response.candidates?.[0]?.content;
    } catch (error) {
      console.error("❌ ERROR parsing AI response:", error);
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

    if (!answer) {
      console.error("❌ ERROR: Empty AI response.");
      return NextResponse.json({ error: "AI response was empty" }, { status: 500 });
    }

    console.log("✅ AI Answer:", answer);

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("❌ AI Response Error:", error);
    return NextResponse.json({ error: "Failed to get AI response" }, { status: 500 });
  }
}