const ImageKit=require("@imagekit/nodejs")
require("dotenv").config()



const imagekit=new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadFile(buffer){
    const result=await imagekit.files.upload({
        file:buffer.toString("base64"),
        fileName:"image.jpg"
    })
    return result;
}
// const uploadFile=async (file)=>{
//     return await imagekit.upload({
//         file:file,
//         fileName:Date.now()+".jpg"
//     })
// }

module.exports=uploadFile;