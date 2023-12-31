
function isValidCreditCardNumber(cardNumber) {
    // Kredi kartı numarasının geçerliliğini kontrol etmek için Luhn algoritmasını kullandım
    cardNumber = cardNumber.replace(/\D/g, ''); // Sadece rakamları al
  
    if (!/^\d{13,19}$/.test(cardNumber)) return false; // Geçerli kart numarası uzunluğu
  
    let sum = 0;
    let isAlternate = false;
  
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = Number(cardNumber.charAt(i));
      if (isAlternate) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
      isAlternate = !isAlternate;
    }
  
    if (sum % 10 !== 0) return false; // Luhn algoritması kontrolü yaptım
  
    return true;
  }
  
  function isValidExpiryDate(expiryDate) {
    const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!regex.test(expiryDate)) return false;
  
    // İlgili ayları ve yılları alın
    const [month, year] = expiryDate.split(/\D/);
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    // Son kullanma tarihi kontrolü
    if (+year < currentYear || (+year === currentYear && +month < currentMonth)) {         
      return false; 
    }
  
    return true;
  }
  
  function isValidCVV(cvv) {
    // Geçerli bir CVV kontrolü ekleyin 3 veya 4 haneli
    return /^\d{3,4}$/.test(cvv);
  }
  
  function getCreditCardType(cardNumber) {
    cardNumber = cardNumber.replace(/\D/g, '');
  
    if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(cardNumber)) {
      return 'Visa';
    } else if (/^5[1-5][0-9]{14}$/.test(cardNumber)) {
      return 'MasterCard';
    } else if (/^3[47][0-9]{13}$/.test(cardNumber)) {
      return 'American Express';
    } else if (/^6(?:011|5[0-9]{2})[0-9]{12}$/.test(cardNumber)) {
      return 'Discover';
    } else if (/^(?:2131|1800|35[0-9]{3})[0-9]{11}$/.test(cardNumber)) {
      return 'JCB';
    } else {
      return 'Unknown';
    }
  }
  
  module.exports = {
    isValidCreditCardNumber,
    isValidExpiryDate,
    isValidCVV,
    getCreditCardType,
  };
  