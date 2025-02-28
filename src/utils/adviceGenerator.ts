
export interface Advice {
  message: string;
  type: 'warning' | 'suggestion' | 'positive';
}

// This is a simplified version that would be replaced with actual AI in production
export const generateAdvice = (
  transcript: string,
  partnerInfo: string[]
): Advice | null => {
  const lowerTranscript = transcript.toLowerCase();
  
  // Keywords that might indicate conflict or tension
  const warningKeywords = ['annoyed', 'angry', 'upset', 'frustrated', 'never', 'always', 'whatever'];
  const hasWarningKeyword = warningKeywords.some(keyword => lowerTranscript.includes(keyword));
  
  // If there's a detected keyword match
  if (hasWarningKeyword) {
    // Check if there are partner-specific triggers
    if (partnerInfo[0] && lowerTranscript.includes('voice') && partnerInfo[0].toLowerCase().includes('voice')) {
      return {
        message: "Try speaking more softly. Your partner gets upset when voices are raised.",
        type: 'warning'
      };
    }
    
    if (lowerTranscript.includes('never') || lowerTranscript.includes('always')) {
      return {
        message: "Avoid generalizations like 'never' or 'always'. Try specific examples instead.",
        type: 'warning'
      };
    }
    
    if (lowerTranscript.includes('annoyed') || lowerTranscript.includes('angry') || lowerTranscript.includes('upset')) {
      return {
        message: "Take a deep breath. Using emotion words can escalate tension.",
        type: 'warning'
      };
    }
    
    return {
      message: "Your tone might be causing tension. Try pausing to listen.",
      type: 'warning'
    };
  }
  
  // Keywords that might indicate a positive interaction
  const positiveKeywords = ['understand', 'appreciate', 'feel', 'sorry', 'thanks', 'thank you', 'love'];
  const hasPositiveKeyword = positiveKeywords.some(keyword => lowerTranscript.includes(keyword));
  
  if (hasPositiveKeyword) {
    if (lowerTranscript.includes('understand') || lowerTranscript.includes('feel')) {
      return {
        message: "Great empathetic language! Keep acknowledging their feelings.",
        type: 'positive'
      };
    }
    
    if (lowerTranscript.includes('appreciate') || lowerTranscript.includes('thank')) {
      return {
        message: "Excellent! Expressing gratitude builds connection.",
        type: 'positive'
      };
    }
    
    return {
      message: "You're using positive language. Keep going!",
      type: 'positive'
    };
  }
  
  // If no specific patterns are detected, occasionally give a random suggestion
  if (transcript.length > 30 && Math.random() > 0.7) {
    const suggestions = [
      "Try asking an open-ended question to learn more.",
      "Consider summarizing what you've heard to confirm understanding.",
      "Acknowledging their perspective can help, even if you disagree.",
      "Remember to maintain open body language.",
    ];
    
    return {
      message: suggestions[Math.floor(Math.random() * suggestions.length)],
      type: 'suggestion'
    };
  }
  
  return null;
};
