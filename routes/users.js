const mongoose=require("mongoose");
const plm=require("passport-local-mongoose");

mongoose.connect("mongodb+srv://gmingwithshadow:ak0213@cluster3.mcfpo7n.mongodb.net/LoginTest?retryWrites=true&w=majority")
.then(()=>{
  console.log("Conneted")
})
.catch((err)=>{
  console.log(err)
})

const userSchema=mongoose.Schema({
  username:String,
  password:Number,
  secret:String
});
userSchema.plugin(plm)

module.exports = mongoose.model("Myuser",userSchema);