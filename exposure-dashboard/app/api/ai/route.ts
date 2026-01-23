import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
// Note: Requires GOOGLE_API_KEY in .env.local
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { message } = body;

        console.log("AI Request (Gemini):", message);

        if (!process.env.GOOGLE_API_KEY) {
            return NextResponse.json({ 
                success: false, 
                message: "Google API Key is missing. Please add GOOGLE_API_KEY to your .env.local file." 
            });
        }

        // Use Gemini Pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});

        // System prompt context
        const systemContext = `
            You are Exposure OS, a sophisticated, futuristic AI operating system for Exposure Solutions. 
            You are helpful, concise, and professional. 
            You control the dashboard and file systems. 
            When asked to do something you can't actually do yet, simulate the response confidently.
            Current user query: ${message}
        `;

        const result = await model.generateContent(systemContext);
        const response = await result.response;
        const reply = response.text();

        return NextResponse.json({ 
            success: true, 
            message: reply 
        });

    } catch (error: any) {
        console.error('AI Error:', error);
        return NextResponse.json({ success: false, message: "Connection to Neural Core (Gemini) failed." }, { status: 500 });
    }
}
