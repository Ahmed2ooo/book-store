import otpGenerator from 'otp-generator'



export const genroterOtp=()=>{
   return otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

}