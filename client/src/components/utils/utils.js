export function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  }
  
  export function formatDate2(dateString) {
    if (!dateString) {
      return '';
    }
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  export function maskEmail(email) {
    const atIndex = email.lastIndexOf('@');
    if (atIndex > 0) {
      const maskedEmail = 'XXXXXX' + email.substring(atIndex);
      return maskedEmail;
    }
    return email;
  }

  export function maskPhoneNumber(phoneNumber) {
    if (phoneNumber && phoneNumber.length >= 6) {
      const visibleDigits = 6;
      const maskedPart = 'X'.repeat(phoneNumber.length - visibleDigits);
      const visiblePart = phoneNumber.slice(0, visibleDigits);
      return visiblePart + maskedPart;
    }
    return phoneNumber;
  }
  
  