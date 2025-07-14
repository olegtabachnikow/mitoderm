import { NextRequest, NextResponse } from 'next/server';
import { LeadService } from '../../../services/leadService';

// הגדרת timeout ארוך יותר עבור Gemini 2.5
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const { conversationHistory } = await request.json();

    if (!conversationHistory || conversationHistory.length === 0) {
      return NextResponse.json({ error: 'No conversation provided' }, { status: 400 });
    }

    // שימוש בשירות החדש
    const leadService = LeadService.getInstance();
    const extractedInfo = await leadService.extractInfoFromConversation(conversationHistory);

    return NextResponse.json({ 
      success: true, 
      data: extractedInfo 
    });

  } catch (error) {
    console.error('Extract Info API Error:', error);
    return NextResponse.json(
      { error: 'Failed to extract information' },
      { status: 500 }
    );
  }
} 