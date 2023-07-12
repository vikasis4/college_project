export const generateOtp = ()=>{
    var numb = Math.floor(100000 + Math.random() * 900000);
    return numb
}
