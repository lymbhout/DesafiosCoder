const fs = require('fs')
let contador = 1
class ProductManager  {
    constructor (path){
        this.products = [];
        this.path = path
    }
    addProduct = async(title,descripcion,price,thumbnail,code,stock) =>{
        if(!title,!descripcion,!price,!thumbnail,!code,!stock){
            console.error('Los campocos title, descripcion,price,thumbnail,code and stock son requeridos!  ')
            return;
        }

        const newproducts ={
            id: this.products.length +1,
            title,
            descripcion,
            price,
            thumbnail,
            code,
            stock
        }

        const producCode = this.products.find((f) => f.code === code )
        
        if(producCode){
            console.error(`El code: (${code}) esta repedito, debe ingresar otro dato Code`);
            return;
        }

        this.products.push(newproducts)
        const produArray = this.products
            console.log('Productos agregados\n');
                try {
                    console.log('  Escritura de archivos.\n')
                    console.log(' Iniciando la escritura...\n')
                    const contenido = JSON.stringify(produArray)
                    console.log(' Finalizó la escritura.\n')
                    await fs.promises.writeFile(this.path, contenido, 'utf-8')
                } catch (error) {
                    console.log(error);
                }
            
        }
        getProducts = async()=>{
            try {
                console.log('Lectura de archivo\n');
                const lesctura = await fs.promises.readFile(this.path,'utf-8')
                const lescturaJson = JSON.parse(lesctura)
                console.log('Lectura realizada:');
                return lescturaJson;
            } catch (error) {
                console.log(error);
                
            }
    }
    
    getProductById = async (id)=>{
        try {
            const lescturaByID = await fs.promises.readFile(this.path,'utf-8')
            const lescturaJsonByID = JSON.parse(lescturaByID)
            const findByID = lescturaJsonByID.find((fbid)=> fbid.id === id)
            return findByID;
        } catch (error) {
            console.log(error);
            
        }
    }
        async updateProduct (id,updatedProduct){
                const lescturaByID = await fs.promises.readFile(this.path,'utf-8')
                const products =  JSON.parse(lescturaByID)
                const {title,description,price,thumbnail,code,stock}=updatedProduct
                var productIndex=-10
                products.forEach((element,index)=>{
                if(element.id===id){
                    productIndex=index
                }
                })
                if(productIndex===-10){
                return console.log("Id no encontrado, no se pudo actualizar")
                }
            
                if(title){
                products[productIndex].title=title
                }
                if(description){
                products[productIndex].description=description
                }
                if(price){
                products[productIndex].price=price
                }
                if(thumbnail){
                products[productIndex].thumbnail=thumbnail
                }
                if(code){
                products[productIndex].code=code
                }
                if(stock){
                products[productIndex].stock=stock
                }
                const contenido = JSON.stringify(products)
                await fs.promises.writeFile(this.path, contenido, 'utf-8')
                console.log(`producto cambiado  `);
            
            }
    delateProduct = (id)=>{
        (async function (run){
            if(!run) return;
            const fs = require('fs')
            try {
                const delateProduct = Objeto1.products.filter((fd) => fd.id !== id)
                const contenido = JSON.stringify(delateProduct)
                await fs.promises.writeFile(Objeto1.path,contenido,'utf-8')
                console.log('Producto eliminado :\n'+ contenido);

            } catch (error) {
                console.log(error);
                
            }
        })(true) // para usar correctamente se debe tener el metodo addProduct en (false )
    }
}



// const Objeto1 = new ProductManager('./text-output-file.json')


module.exports = ProductManager