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

'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './Chatbot.module.scss';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatbotProps {
  locale: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ locale }) => {
  const [isOpen, setIsOpen] = useState(true); // מתחיל פתוח
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // הודעת פתיחה עם שאלות בחירה
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        role: 'assistant',
        content: `היי! 😊 אני מומחית האקסוזומים של מיטודרם!

אקסוזומים הם מהפכה אמיתית בעולם הקוסמטיקה! זה בועיות ננו טבעיות שמעבירות מידע חיוני בין תאים - כמו מערכת דואר חכמה של הגוף. האקסוזומים הסינתטיים שלנו מכילים 73 פקטורי גדילה ויודעים לדבר ישירות עם התאים לגרום להם להתחדש באופן מדהים!

מה הכי מעניין אותך?`,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
    
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setConversationHistory(data.conversationHistory || []);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'מצטערת, הייתה שגיאה בחיבור. אנא נסי שוב או צרי קשר ישירות בוואטסאפ 😊',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // פונקציה לשליחת שאלות מוכנות
  const sendPredefinedMessage = async (message: string) => {
    const userMessage: Message = {
      role: 'user',
      content: message,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setConversationHistory(data.conversationHistory || []);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'מצטערת, הייתה שגיאה בחיבור. אנא נסי שוב או צרי קשר ישירות בוואטסאפ 😊',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };



  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* כפתור פתיחת הצ'אט */}
      <button
        className={`${styles.chatButton} ${isOpen ? styles.open : ''}`}
        onClick={toggleChat}
        aria-label="פתח צ'אט"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

             {/* חלון הצ'אט */}
       {isOpen && (
         <div className={styles.chatWindow} dir="rtl">
          <div className={styles.chatHeader}>
            <div className={styles.headerContent}>
              <div className={styles.avatar}>
                <Image
                  src="/images/logo.svg"
                  alt="Mitoderm"
                  width={32}
                  height={32}
                />
              </div>
              <div className={styles.headerText}>
                <h3>מיטודרם צ'אט</h3>
                <p>מומחית אקסוזומים</p>
              </div>
            </div>
            <button
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label="סגור צ'אט"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className={styles.messagesContainer}>
            {messages.map((message, index) => (
              <div key={index}>
                <div
                  className={`${styles.message} ${
                    message.role === 'user' ? styles.userMessage : styles.assistantMessage
                  }`}
                >
                  <div className={styles.messageContent}>
                    {message.role === 'assistant' && (
                      <div className={styles.assistantAvatar}>
                        <Image
                          src="/images/logo.svg"
                          alt="Mitoderm"
                          width={24}
                          height={24}
                        />
                      </div>
                    )}
                    <div 
                      className={styles.messageText}
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    />
                  </div>
                  <div className={styles.messageTime}>
                    {message.timestamp.toLocaleTimeString('he-IL', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
                
                {/* הצגת כפתורי השאלות רק להודעת הפתיחה הראשונה */}
                {index === 0 && message.role === 'assistant' && messages.length === 1 && (
                  <div style={{ marginTop: '10px', marginRight: '40px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <button 
                        className={styles.predefinedQuestionBtn}
                        onClick={() => sendPredefinedMessage('מהם אקסוזומים?')}
                      >
                        🧬 מהם אקסוזומים ולמה הם מהפכה?
                      </button>
                      <button 
                        className={styles.predefinedQuestionBtn}
                        onClick={() => sendPredefinedMessage('מה התועלות העיקריות של המוצרים?')}
                      >
                        ✨ מה התועלות העיקריות של המוצרים?
                      </button>
                      <button 
                        className={styles.predefinedQuestionBtn}
                        onClick={() => sendPredefinedMessage('כמה עולים המוצרים?')}
                      >
                        💰 כמה עולים המוצרים וכמה הרווח?
                      </button>
                      <button 
                        className={styles.predefinedQuestionBtn}
                        onClick={() => sendPredefinedMessage('איך נרשמים למפגש ההדרכה?')}
                      >
                        📚 איך נרשמים למפגש ההדרכה?
                      </button>
                      <button 
                        className={styles.predefinedQuestionBtn}
                        onClick={() => sendPredefinedMessage('במה המוצר שונה וטוב יותר ממוצרים אחרים דומים?')}
                      >
                        🏆 במה המוצרים שלנו שונים וטובים יותר?
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.message} ${styles.assistantMessage}`}>
                <div className={styles.messageContent}>
                  <div className={styles.assistantAvatar}>
                    <Image
                      src="/images/logo.svg"
                      alt="Mitoderm"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputContainer}>
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="כתבי הודעה..."
              className={styles.messageInput}
              disabled={isLoading}
              rows={1}
            />
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className={styles.sendButton}
              aria-label="שלח הודעה"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot; 