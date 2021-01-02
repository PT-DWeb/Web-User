const datamongoose = require("../mongoose/productModel");

const formatConcurency = (concurency)=>{
    let result="";
    const arr=[];
    let tmp;
    do{
        tmp=concurency%1000;
        arr.unshift(tmp==0?"000":tmp);
        concurency=Math.floor(concurency/1000);
    }while(concurency>0);

    for(let i=0;i<arr.length;i++){
        result+=arr[i];
        result += i==arr.length-1 ? "" :".";
    }   

    return result;
}

const getConcurency = (strConcurency) =>{
    let result=0;
    const arr=strConcurency.split(".");
    for(let i of arr){
        result = result*1000+parseInt(i);
    }  

    return result;
}

exports.listmobiles = async(pageNumber, itemPerPage, filter,sort) =>{
    // let money;
    // let randomNum;
    // const products=await datamongoose.find();
    // for(let i of products){
    //     randomNum = Math.floor((Math.random() * 60) + 1);
    //     money= randomNum * 500000;
    //     await datamongoose.findOneAndUpdate(
    //         {_id: i._id},
    //         {     
    //             baseprice: formatConcurency(money),
    //             discountprice: formatConcurency(money-Math.ceil(money*10/100)),
    //             quantitySold: randomNum*2,
    //             price: money-Math.ceil(money*10/100),
    //         }
    //     );

    //     //Khơi tao cac gia tri khong co sẵn 
    //     // if(i.quantityAvailable==undefined){
    //     //     await datamongoose.findOneAndUpdate(
    //     //         {_id: i._id},
    //     //         {     
    //     //             quantityAvailable: 1000,
    //     //             description: "Lorem ipsum dolor sit amet, consectetur",
    //     //             releaseDay: Date.now(),
    //     //             reviewNum: 0,
    //     //             trackNum: 0,
    //     //             DeletedState: 0,
    //     //         }
    //     //     );
    //     // }
    // }

    const option={
        offset: pageNumber,
        limit: itemPerPage,
        sort: sort,
    }
    const listmobiles = await datamongoose.paginate(filter,option);
    return listmobiles;
};

exports.findProduct = async(object) =>{
    const product = await datamongoose.find(object);

    //console.log(product);
    return product;
};

exports.findOneProduct = async(object) =>{
    const product = await datamongoose.findOne(object);
    //console.log(product);
    return product;
};

exports.findNewProduct = async(numProduct)=>{
    const sort={
        releaseDay: -1,
    };
    const product=await datamongoose.find().limit(numProduct).sort(sort);
    return product;
}
exports.findHighlightsProduct = async(numProduct)=>{
    const sort={
        releaseDay: -1,
        quantitySold: -1,
    };
    const product=await datamongoose.find().limit(numProduct).sort(sort);
    return product;
}

exports.findSimilarProduct = async(filter) => {
    const diff=1000000;
    const product=await datamongoose.findOne(filter);
    const similarProduct = await datamongoose.find({ 
                                            _id:{$ne:product._id},
                                            $or:[{'idmanufacturer': product.idmanufacturer},
                                                {'price': { $gte: product.price - diff, $lte: product.price +diff},
                                            }]
                                        }).
                                        limit(4);
    return similarProduct;                                    
}