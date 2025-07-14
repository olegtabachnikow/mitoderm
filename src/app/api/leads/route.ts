import { NextRequest, NextResponse } from 'next/server';
import { LeadService } from '../../../services/leadService';

// הגדרת timeout ארוך יותר עבור פעולות עם Gemini
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const { name, phone, email, conversationSummary } = await request.json();

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    // שימוש בשירות החדש
    const leadService = LeadService.getInstance();
    
    const success = await leadService.saveLead({
      name,
      phone,
      email,
      source: 'צ\'אטבוט אתר',
      conversationSummary
    });

    return NextResponse.json({ 
      success,
      message: success ? 'הליד נשמר בהצלחה!' : 'שגיאה בשמירת הליד'
    });

  } catch (error) {
    console.error('Leads API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process lead' },
      { status: 500 }
    );
  }
} 