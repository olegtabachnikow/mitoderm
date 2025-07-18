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
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY_HERE',
  defaultHeaders: {
    'OpenAI-Beta': 'assistants=v2'
  }
});

// Assistant ID from user
const ASSISTANT_ID = 'asst_iLuuoGjP8ljZJDcRSus2819a';

// הגדרת timeout מותאם לתוכנית Vercel hobby
export const maxDuration = 60; // 60 שניות - המקסימום בתוכנית hobby

// Helper function to wait for run completion with better timeout handling
async function waitForRunCompletion(threadId: string, runId: string): Promise<any> {
  let attempts = 0;
  const maxAttempts = 60; // 60 seconds max (reduced polling frequency)
  
  while (attempts < maxAttempts) {
    try {
      // Use fetch instead of SDK to avoid TypeScript issues
      const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY_HERE'}`,
          'OpenAI-Beta': 'assistants=v2',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const run = await response.json();
      
      if (run.status === 'completed') {
        return run;
      } else if (run.status === 'failed') {
        throw new Error(`Assistant run failed: ${run.last_error?.message || 'Unknown error'}`);
      } else if (run.status === 'expired') {
        throw new Error('Assistant run expired');
      }
      
      // Adaptive wait - longer waits for better performance
      if (attempts < 10) {
        await new Promise(resolve => setTimeout(resolve, 500)); // 0.5s for first 10 attempts
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1s for later attempts
      }
      attempts++;
    } catch (error) {
      console.error('Error checking run status:', error);
      throw error;
    }
  }
  
  throw new Error('Assistant run timed out');
}

export async function POST(request: NextRequest) {
  try {
    const { 
      message, 
      threadId = null, // קבלת thread ID קיים
      isInitial = false,
      isInactivityTimeout = false,
      hasPhoneNumber = false,
      phoneNumber = '',
      isContactRequest = false,
      isSuccessMessage = false,
      isErrorMessage = false,
      errorType = ''
    } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    console.log('=== OPENAI ASSISTANT REQUEST ===');
    console.log('Message:', message);
    console.log('Thread ID:', threadId);
    console.log('Special flags:', { isInitial, isInactivityTimeout, hasPhoneNumber, isContactRequest, isSuccessMessage, isErrorMessage });

    let currentThreadId = threadId;

    // Create a new thread only if none exists (first message)
    if (!currentThreadId) {
      console.log('Creating new thread...');
      const thread = await openai.beta.threads.create();
      currentThreadId = thread.id;
      console.log('New thread created:', currentThreadId);
    } else {
      console.log('Using existing thread:', currentThreadId);
    }

    // Prepare the current message with context
    let currentMessage = message;
    
    // Add special context based on flags
    if (isInitial) {
      currentMessage = "זו התחלת השיחה - שלח הודעת פתיחה מהמדריך";
    } else if (isInactivityTimeout) {
      currentMessage = "לא הייתה פעילות במשך זמן - שאל אם תרצה שיחזרו אליה (כמו במדריך)";
    } else if (hasPhoneNumber && phoneNumber) {
      currentMessage = `הלקוח שלח הודעה עם מספר טלפון: ${phoneNumber}. ההודעה המלאה: "${message}". תגיב לפי המדריך לזיהוי מספר טלפון.`;
    } else if (isContactRequest) {
      currentMessage = `הלקוח ביקש יצירת קשר: "${message}". תגיב לפי המדריך לבקשות יצירת קשר.`;
    } else if (isSuccessMessage) {
      currentMessage = "הטופס נשלח בהצלחה - שלח הודעת הצלחה מהמדריך";
    } else if (isErrorMessage) {
      if (errorType === 'form_submission') {
        currentMessage = "הייתה שגיאה בשליחת הטופס - הצע פתרונות חלופיים";
      } else if (errorType === 'connection') {
        currentMessage = "הייתה שגיאה בחיבור - הצע פתרונות ודרכי קשר חלופיות";
      } else {
        currentMessage = "הייתה שגיאה כללית - נסה לעזור ולהציע פתרונות";
      }
    }

    // Add the current message to existing thread
    console.log('Adding message to thread...');
    await openai.beta.threads.messages.create(currentThreadId, {
      role: 'user',
      content: currentMessage
    });

    // Run the assistant
    console.log('Creating run...');
    const run = await openai.beta.threads.runs.create(currentThreadId, {
      assistant_id: ASSISTANT_ID
    });

    console.log('Waiting for run completion...');
    // Wait for completion
    const completedRun = await waitForRunCompletion(currentThreadId, run.id);

    if (completedRun.status !== 'completed') {
      throw new Error(`Assistant run ended with status: ${completedRun.status}`);
    }

    console.log('Getting messages from thread...');
    // Get the messages from the thread
    const messages = await openai.beta.threads.messages.list(currentThreadId);
    
    // Get the latest assistant message
    const latestMessage = messages.data.find((msg: any) => msg.role === 'assistant');
    
    if (!latestMessage || !latestMessage.content || latestMessage.content.length === 0) {
      throw new Error('No response from assistant');
    }

    // Extract text content
    const textContent = latestMessage.content.find((content: any) => content.type === 'text');
    if (!textContent || !(textContent as any).text) {
      throw new Error('No text content in assistant response');
    }

    const responseText = (textContent as any).text.value;

    console.log('=== OPENAI ASSISTANT RESPONSE ===');
    console.log('Response:', responseText);
    console.log('Response length:', responseText.length);
    console.log('Contains [SHOW_CONTACT_FORM]?', responseText.includes('[SHOW_CONTACT_FORM]'));
    console.log('Contains SHOW_CONTACT_FORM (any case)?', responseText.toLowerCase().includes('show_contact_form'));
    console.log('First 100 chars:', responseText.substring(0, 100));
    console.log('Last 100 chars:', responseText.substring(Math.max(0, responseText.length - 100)));
    console.log('=== END DEBUG ===');

    return NextResponse.json({
      message: responseText,
      threadId: currentThreadId, // החזרת thread ID - הוא שומר הכל!
    });

  } catch (error) {
    console.error('OpenAI Assistant API Error:', error);
    
    // Return a fallback response in case of error
    let fallbackMessage = 'מצטערת, הייתה בעיה טכנית. אנא נסי שוב או צרי קשר ישירות 😊';
    
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      
      // Provide more specific fallback based on error type
      if (error.message.includes('API key')) {
        fallbackMessage = 'מצטערת, יש בעיה עם הגדרות המערכת. אנא צרי קשר ישירות בוואטסאפ 😊';
      } else if (error.message.includes('timeout') || error.message.includes('Gateway Timeout')) {
        fallbackMessage = 'מצטערת, התגובה לוקחת יותר זמן מהצפוי. אנא נסי שוב 😊';
      }
    }
    
    // Parse request body again for error handling
    const requestBody = await request.json();
    
    return NextResponse.json({
      message: fallbackMessage,
      threadId: requestBody.threadId || null,
    });
  }
}
