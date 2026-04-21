const ImageKit=require("@imagekit/nodejs")
require("dotenv").config()



const imagekit=new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})

// async function uploadFile(buffer){
//     const result=await imagekit.upload({
//         file:buffer,
//         fileName:Date.now()+".jpg"
//     })
//     return result;
//}
// const uploadFile=async (file)=>{
//     return await imagekit.upload({
//         file:file,
//         fileName:Date.now()+".jpg"
//     })
// }
async function uploadFile(file) {
  try {
    const result = await imagekit.files.upload({
      file: file.buffer.toString("base64"), // buffer → base64
      fileName: Date.now() + "-" + file.originalname,
    });

    return result;
  } catch (error) {
    console.log("ImageKit Error:", error);
    throw error;
  }
}

module.exports=uploadFile;