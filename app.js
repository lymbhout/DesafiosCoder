// quieres
const ProductManager = require('./Df1.js');
const   express = require('express')
// Objeto llamado 
const Objeto1 = new  ProductManager('./text-output-file.json')
Objeto1.addProduct('camisa','camisa de algodon blanco',8.5,'hdhdhdh',5,22)
Objeto1.addProduct('blusa','camisa de algodon blanco',8.5,'hdhdhdh',3,22)

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())



app.get('/products', async (req,res)=>{
    const {query} = req;
    const {limit}= query;
    let llamar =  await ProductManager.getProducts()
    console.log(llamar);
    if(!limit){
        res.json(Objeto1)
    }else{
        const result = llamar.filter((product) => product.id <= parseInt(limit));
        res.json(result);
    }
})

app.get('/products/:pid',(req,res)=>{
    let pid = req.params.pid;
    let productoID = llamar.find(p => p.id === pid)
    
    if(!productoID){return res.json({error:'Producto no encontrado '})}
    
    res.json(productoID)
})

app.listen('8080',()=>{
    console.log('servidor express 8080 escuchado con exito');
});
