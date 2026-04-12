const {readData,writeData} = require('../utils/fileHandler');

const products = [];

exports.getProduct = (req,res)=>{
let products = readData();

let {search,category,brand,sort,page = 1,limit = 5} = req.query;
//search
if(search){
    products = products.filter(p=>
        p.name.toLowerCase().includes(search.toLowerCase())
    );
}
    //filter
    if(category){
        products = products.filter(p =>p.category === category);
    }
    if(brand){
        products = products.filter(p => p.brand === brand);
    }

    // Sorting 
    if(sort === 'price'){
        products.sort((a,b)=>a.price - b.price);
    }
    if(sort === 'name'){
        products.sort((a,b)=>a.name.localeCompare(b.name));
    }

    //pafination

    const start = (Number(page) - 1) * Number(limit);
    const paginated = products.slice(start,start + Number(limit));
    res.json({
        total:products.length,
        page:Number(page),
        data:paginated
    })
};


exports.createProduct = (req,res)=>{
    const products = readData();
    const newProduct = {
        id:Date.now(),
        name : req.body.name,
        price: Number(req.body.price),
        category: req.body.category,
        brand:req.body.brand,
        variant: req.body.variant,
        image:req.file ? req.file.filename : null
    };

    products.push(newProduct);
    writeData(products);

    res.json({message: "Product added",product:newProduct});
};



// updateproduct
exports.updateProduct = (req,res)=>{
    let products = readData();
    const {id} = req.params;

    const index = products.findIndex(p => p.id == id);

    if(index === -1) {
        return res.status(404).json({message: "Not found"});
    }
  products[index] = {
    ...products[index],
    ...req.body,
    image:req.file ? req.file.filename:products[index].image

  };
  writeData(products);

  res.json({message: "Updated",products: products[index]});
};

exports.deleteProduct = (req,res) =>{
    let products = readData();
    const {id} = req.params;

    const filtered = products.filter(p => p.id != id);
    writeData(filtered);
    res.json({
        message:"product Deleted Successfully"
    });
};