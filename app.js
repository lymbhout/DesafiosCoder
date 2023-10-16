// quieres
const ProductManager = require('./Df1.js');
const   express = require('express')
// Objeto llamado 
const Objeto1 = new  ProductManager('./text-output-file.json')
// Objeto1.addProduct('camisa','blanca de lino puro',5,'sin imagen',9,20)
// Objeto1.addProduct('camisa','negra de lino puro',5,'sin imagen',10,25)
// Objeto1.addProduct('camisa','azul de lino puro',10,'sin imagen',11,20)
// Objeto1.addProduct('camisa','blanca de algodon',28,'sin imagen',12,20)
// Objeto1.addProduct('camisa','negra de algodon',18,'sin imagen',13,20)
// Objeto1.addProduct('camisa','azul de algodon',18,'sin imagen',14,20)
// Objeto1.addProduct('camisa','gris de algodon',18,'sin imagen',15,20)
// Objeto1.addProduct('camisa','gris de tela turca',28,'sin imagen',116,20)
// Objeto1.addProduct('camisa','blanca de tela peruana',28,'sin imagen',17,20)
// Objeto1.addProduct('camisa manga larga','blanca de tela peruana',28,'sin imagen',18,30)
// Objeto1.addProduct('camisa manga corta','blanca de tela peruana',28,'sin imagen',19,30)

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.get('/products', async (req,res)=>{
    const {query} = req;
    const {limit}= query;
    let llamar = await Objeto1.getProducts()
    if(!limit){
        res.json(llamar)
    }else{
        const result = llamar.filter((product) => product.id <= parseInt(limit));
        res.json(result);
    }
})

app.get('/products/:pid', async (req,res)=>{
    let llamar =  await Objeto1.getProducts()
    let pid = req.params.pid;
    let productoID = llamar.find(p => p.id === parseInt(pid))
    
    if(!productoID){return res.json({error:'Producto no encontrado '})}
    
    res.json(productoID)
})

app.listen('8080',()=>{
    console.log('servidor express 8080 escuchado con exito');
});
