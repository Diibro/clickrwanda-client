export function standardizePhoneNumber(phone, code) {
     if(phone){
          // Remove any non-digit characters from the phone number
          const cleanedPhone = phone.replace(/\D/g, "");

          // Check if the phone number starts with the provided country code
          if (cleanedPhone.startsWith(code)) {
          return cleanedPhone; // Already has the correct country code
          }
          // Check if the phone number starts with any country code (starting with a '+')
          if (cleanedPhone.startsWith("+")) {
          return cleanedPhone; // Has a different country code, no changes
          }
          // Add the provided country code to the phone number
          return `${code}${cleanedPhone}`;
     }
     
}