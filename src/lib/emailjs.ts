import emailjs from '@emailjs/browser';

// EmailJS response interface
interface EmailJSResponse {
  success: boolean;
  message: string;
  result?: any;
}

// Initialize EmailJS with your public key
const initEmailJS = () => {
  emailjs.init({
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'oVV84c6cn-Y2Y7I7V',
  });
};

// Send email using EmailJS
export const sendEmail = async (templateParams: {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  message: string;
}): Promise<EmailJSResponse> => {
  try {
    // Initialize EmailJS if not already done
    initEmailJS();

    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_n6poqut',
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_umuudte',
      {
        from_name: templateParams.fullName,
        from_email: templateParams.email,
        phone: templateParams.phone,
        organization: templateParams.organization,
        message: templateParams.message,
        to_email: 'info@vukazine.com', // Your receiving email
      }
    );

    return {
      success: true,
      message: 'Thank you! Your message has been sent successfully. We\'ll be in touch within 24 hours.',
      result
    };
  } catch (error) {
    console.error('EmailJS Error:', error);
    return {
      success: false,
      message: 'Failed to send message. Please try again or contact us directly at info@vukazine.com.'
    };
  }
};