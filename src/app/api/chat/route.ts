/**
 * Copyright (c) 2024 Mitoderm. All rights reserved.
 *
 * This software and associated documentation files (the "Software") are proprietary
 * to Mitoderm and are protected by copyright law. No part of the Software may be
 * reproduced, distributed, or transmitted in any form or by any means, including
 * photocopying, recording, or other electronic or mechanical methods, without the
 * prior written permission of Mitoderm, except in the case of brief quotations
 * embodied in critical reviews and certain other noncommercial uses permitted by
 * copyright law.
 *
 * For permission requests, contact: info@mitoderm.com
 */

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { readFileSync } from 'fs';
import { join } from 'path';

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
    'AIzaSyB47Zt8wAKT3b3fAm_IbI9xbrbhgJcnfFA'
);

// קריאת המדריך המלא מקובץ AssistantGuide
const getFullGuide = () => {
  try {
    const guidePath = join(process.cwd(), 'AssistantGuide.txt');
    return readFileSync(guidePath, 'utf-8');
  } catch (error) {
    console.error('Failed to read AssistantGuide file:', error);
    return '';
  }
};

// יצירת ה-SYSTEM_PROMPT עם המדריך המלא
const buildSystemPrompt = () => {
  const fullGuide = getFullGuide();
  return fullGuide;
};

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // הכנת הקשר עם 8 ההודעות האחרונות בלבד (4 של המשתמש + 4 של הצ'אטבוט)
    const systemPrompt = buildSystemPrompt();
    let contextMessages = '';

    if (conversationHistory.length > 0) {
      // לקחת רק את 8 ההודעות האחרונות
      const recentHistory = conversationHistory.slice(-8);

      // בניית הקשר בתבנית פשוטה
      contextMessages = '\n\nהודעות קודמות להקשר:\n';
      recentHistory.forEach((msg: any, index: number) => {
        const speaker = msg.role === 'user' ? 'לקוח/ה' : 'מיטודרם';
        contextMessages += `${speaker}: ${msg.content}\n`;
      });
      contextMessages += '\n';
    }

    // שילוב המדריך + הקשר + ההודעה החדשה
    const fullPrompt = `${systemPrompt}${contextMessages}הודעה אחרונה של הלקוח/ה: ${message}

תן תשובה מקצועית ומותאמת בהתאם למדריך:`;

    console.log('=== CONTEXT DEBUG ===');
    console.log('Total history length:', conversationHistory.length);
    console.log('Recent history length:', conversationHistory.slice(-8).length);
    console.log('Context messages:', contextMessages);
    console.log('User message:', message);
    console.log('=== END CONTEXT DEBUG ===');

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    // דיבוג - הדפסת התגובה של Gemini
    console.log('=== GEMINI RESPONSE DEBUG ===');
    console.log('User message:', message);
    console.log('Gemini response:', text);
    console.log(
      'Contains SHOW_CONTACT_FORM?',
      text.includes('[SHOW_CONTACT_FORM]')
    );
    console.log('=== END DEBUG ===');

    return NextResponse.json({
      message: text,
      conversationHistory: [
        ...conversationHistory,
        { role: 'user', content: message },
        { role: 'assistant', content: text },
      ],
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
