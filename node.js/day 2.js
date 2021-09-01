//POKEAPI CREATED BY GANESH.B (C)2021


const express=require('express');
const app=express()
app.use(express.json())
const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/pokeapi",{useNewUrlParser:true},()=>{
    console.log("mongo server is connected")
});


const pokemonSchema=new mongoose.Schema({
        name:String,
        type:String,
        url:String
})

const pokemonModel= new mongoose.model('pokemons',pokemonSchema);

//to get all pokemons
app.get("/pokemons",async(req,res)=>{

    let pokemons=await pokemonModel.find();
    //res.send("fetching all pokemons.....")
    res.send(pokemons)
    console.log("Successful fetch")

})

app.listen(8000,()=>{
    console.log("server is running....")
})

//to get pokemon based on name
app.get("/pokemon/name/:name",async(req,res)=>{
    let name = req.params.name;
    let pokemon = await pokemonModel.find({name:name});
    res.send(pokemon)
})

//to get pokemon based on type
app.get("/pokemon/type/:type",async(req,res)=>{
    let type = req.params.type;
    let pokemon= await pokemonModel.find({type:type});
    res.send(pokemon);
})

//to create a pokemon
app.post("/createpoke",(req,res)=>{

    let pokemon=req.body;
    let pokeObj= new pokemonModel(pokemon)
    pokeObj.save((err,data)=>{
        if(err===null)
        {
            res.send({"msg":"pokemon created"})
        }
    })
  

})

//to update a pokemon
app.put("/updpoke/:name",(req,res)=>{

    let name=req.params.name;
    let pokemon =req.body;
    pokemonModel.updateOne({name:name},pokemon,(err,data)=>{
        if(err===null){
            res.send("Pokemon Updated")
        }
    })

})

//to delete a pokemon
app.delete("/delpoke/:name",(req,res)=>{
    let name= req.params.name;
    pokemonModel.deleteOne({name:name},(err,data)=>{
        if(err===null){
            res.send("Pokemon deleted")
        }
    })
})