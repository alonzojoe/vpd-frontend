export const toPascalCase = (inputString) => {
    return inputString
      .split(/\s+/) 
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join('');
}
  

export const formatPhoneNumber = (number) => {
  const formattedNumber = String(number).replace(/\D/g, ''); // Remove non-numeric characters
  const leadingZeros = '0'.repeat(11 - formattedNumber.length); // Add leading zeros if needed

  return leadingZeros + formattedNumber;
}