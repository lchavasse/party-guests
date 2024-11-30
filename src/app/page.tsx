'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js'
import { Afacad } from 'next/font/google';

const supabaseUrl = 'https://fwcuguulstooyzkkxtvg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3Y3VndXVsc3Rvb3l6a2t4dHZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU0MzcyNTEsImV4cCI6MjA0MTAxMzI1MX0.DukHnchH5-5qs_F6c4jJtTWTw3CIaNHx2sWenhUnGFw';
const supabase = createClient(supabaseUrl, supabaseKey)

const afacad = Afacad({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const EmailSignup = () => { 
  const [displayText, setDisplayText] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Typing animation effect
  useEffect(() => {
    const text = "Lachlan's Birthday Drinks";
    let currentIndex = 0;
    
    const intervalId = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 150);

    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const { error } = await supabase
        .from('party_guests')
        .insert([{ name, phone, created_at: new Date().toISOString() }]);
      
      if (error) throw error;
      setSubmitted(true);
      setName('');
      setPhone('');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center justify-center w-[90%]">
        <div className="text-center">
          <h1 className={`text-4xl mb-2 text-gray-900 h-12 ${afacad.className}`}>
            {displayText}
          </h1>
          <p className="text-gray-600 mb-8">
            Friday 6th December, 9pm, Nr Old St.
          </p>
        </div>
        <div className="w-[90%] max-w-md p-8 bg-white rounded-lg shadow-lg">
        {!submitted ? (
          <>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter a name, maybe even yours!"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none text-gray-900"
            />
            <input
              type="phone"
              placeholder="Your phone number - if you wish to know where it is!"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none text-gray-900"
            />
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full px-4 py-2 text-white bg-gray-700 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? 'loading...' : "I'll be there!"}
            </button>
            
            {message && (
              <p className="text-sm text-gray-600 mt-2">
                {message}
              </p>
            )}
          </form>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2 text-gray-900">See you on Friday!!!</h2>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default EmailSignup;