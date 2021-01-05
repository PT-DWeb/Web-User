const datamongoose = require("../mongoose/productModel");
const manufacturerModel = require("../mongoose/manufacturerModel");
const { ObjectId } = require("mongodb");

const formatConcurency = (concurency) => {
    let result = "";
    const arr = [];
    let tmp;
    do {
        tmp = concurency % 1000;
        arr.unshift(tmp == 0 ? "000" : tmp);
        concurency = Math.floor(concurency / 1000);
    } while (concurency > 0);

    for (let i = 0; i < arr.length; i++) {
        result += arr[i];
        result += i == arr.length - 1 ? "" : ".";
    }

    return result;
}

const getConcurency = (strConcurency) => {
    let result = 0;
    const arr = strConcurency.split(".");
    for (let i of arr) {
        result = result * 1000 + parseInt(i);
    }

    return result;
}

const changeIdManufacturer = async () => {
    const products = await datamongoose.find();
    let idmanufacturer;
    var iphone = /ipho/i;
    var samsung = /sam/i;
    var huawei = /hua/i;
    var xiaomi = /xiao/i;
    var oppo = /oppo/i;
    var vivo = /vivo/i;
    var itel = /itel/i;
    var vsmart = /vsmar/i;
    var realme = /real/i;
    for (let i of products) {

        if (iphone.test(i.name)) {
            idmanufacturer = "5fefd77974c412a9040fdb26";
        }
        else if (samsung.test(i.name)) {
            idmanufacturer = "5fefd79774c412a9040fdb27";
        }
        else if (xiaomi.test(i.name)) {
            idmanufacturer = "5fefd7ad74c412a9040fdb28";
        }
        else if (huawei.test(i.name)) {
            idmanufacturer = "5fefd7ba74c412a9040fdb29";
        }
        else if (oppo.test(i.name)) {
            idmanufacturer = "5fefd7c774c412a9040fdb2a";
        }
        else if (vivo.test(i.name)) {
            idmanufacturer = "5fefd7c774c412a9040fdb2b";
        }
        else if (itel.test(i.name)) {
            idmanufacturer = "5fefd7e274c412a9040fdb2c";
        }
        else if (vsmart.test(i.name)) {
            idmanufacturer = "5fefd7f774c412a9040fdb2d";
        }
        else if (realme.test(i.name)) {
            idmanufacturer = "5fefd80b74c412a9040fdb2e";
        }
        //console.log(idmanufacturer);
        await datamongoose.findOneAndUpdate(
            { _id: i._id },
            {
                idmanufacturer: idmanufacturer,
            }
        );
    }
}

exports.listmobiles = async (pageNumber, itemPerPage, filter, sort) => {
    // let money;
    // let randomNum;
    // const products=await datamongoose.find();
    // for(let i of products){
    //     randomNum = Math.floor((Math.random() * 60) + 1);
    //     money= randomNum * 500000;
    //     await datamongoose.findOneAndUpdate(
    //         {_id: i._id},
    //         {     
    //             baseprice: money,
    //             discountprice: money-Math.ceil(money*10/100),
    //             // quantitySold: randomNum*2,
    //             // price: money-Math.ceil(money*10/100),
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
    //}
    //Khoi tao lại giá trị id nhà sx
    //changeIdManufacturer();

    const option = {
        offset: (pageNumber - 1) * itemPerPage,
        limit: itemPerPage,
        sort: sort,
    }
    const listmobiles = await datamongoose.paginate(filter, option);
    return listmobiles;
};

exports.findProduct = async (object) => {
    const product = await datamongoose.find(object);

    //console.log(product);
    return product;
};

exports.findOneProduct = async (object) => {
    const product = await datamongoose.findOne(object);
    //console.log(product);
    return product;
};

exports.findNewProduct = async (numProduct) => {
    const sort = {
        releaseDay: -1,
    };
    const product = await datamongoose.find().limit(numProduct).sort(sort);
    return product;
}
exports.findHighlightsProduct = async (numProduct) => {
    const sort = {
        releaseDay: -1,
        quantitySold: -1,
    };
    const product = await datamongoose.find().limit(numProduct).sort(sort);
    return product;
}

exports.findSimilarProduct = async (filter) => {
    const diff = 1000000;
    const product = await datamongoose.findOne(filter);
    const similarProduct = await datamongoose.find({
        _id: { $ne: product._id },
        $or: [{ 'idmanufacturer': product.idmanufacturer },
        {
            'discountprice': { $gte: product.discountprice - diff, $lte: product.discountprice + diff },
        }]
    }).
        limit(4);
    return similarProduct;
}

exports.findProductByInfo = async (filter) => {
    console.log(filter);

    let idmanufacturer;
    let conditionram = {};
    let conditionprice = {};
    let release;


    // Nhà sản xuất
    if (filter.manufacturer != null) {
        const findidmanufacturer = await manufacturerModel.findOne({
            manufacturer: filter.manufacturer,
        })
        idmanufacturer = ObjectId(findidmanufacturer._id);
    }
    // Ram
    // if (filter.storage != null) {
    //     let string = filter.price;
    //     let storage = string.slice(len - 3, len);

    // }


    // Gia
    if (filter.price != null) {
        const stringprice = filter.price;
        if (stringprice.search('duoi') != -1) {
            Object.assign(conditionprice, { $lt: 2000000 });// nho hon 2tr
        }
        else if (stringprice.search('tren') != -1) {
            Object.assign(conditionprice, { $gt: 20000000 });//lon hon 20tr
        }
        else {
            const price = +stringprice.slice(3, 4)
            if (price === 2) {
                // Tu 2tr den 4tr
                Object.assign(conditionprice, { $gte: 2000000, $lte: 4000000 });
            }
            else if (price === 4) {
                // Tu 4tr den 7tr
                Object.assign(conditionprice, { $gte: 4000000, $lte: 7000000 });
            }
            else if (price === 7) {
                // Tu 7tr den 13tr
                Object.assign(conditionprice, { $gte: 7000000, $lte: 13000000 });
            }
            else {
                // Tu 13tr den 20tr
                Object.assign(conditionprice, { $gte: 13000000, $lte: 20000000 });
            }
        }
    }

    // Ngay ra mat
    if (filter.release != null) {
        const stringrelease = filter.release;
        const day = +stringrelease.slice(0, 2);
        console.log(day);
        release = new Date();
        release.setDate(release.getDate() - day);
        console.log(release);
    }
    //Query
    const data = await datamongoose.find(
        {
            // 'idmanufacturer': idmanufacturer,
            // 'discountprice': conditionprice,
            // 'releaseDay': {"$gte": release}
            // $expr: { 
            //     storage : {$eq: [{ $substr: [ '$storage', 0, 3 ] },{'storage':/^2GB/}]} 
            // } 
            //'storage':{'$regex':/^12GB/}
            //$expr: { $lt: [ "$baseprice" , "$discountprice" ] }
            $expr:  {$and: [{'storage':/^8GB/}, {$gte: 
                [{ $convert: 
                    { input: {$substr: [ '$storage', 0, 1]}, to: "double" } },
                8]
            }]} 
            //'storage': {$substr: [ '$storage', 0, 1]}

            // discountprice:
            // {
            //     $cond: { if: { $gte: ["$baseprice", 26500000] }, then: 23850000, else: 20 }
            // }
        }
        // [
        //     {
        //        $project:
        //          {
               
        //            discountprice:
        //                {
        //                    $cond: { if: { $gte: ["$baseprice", 26500000] }, then: 23850000, else: 20 }
        //                }
        //          }
        //     }
        // ]
    )
    return data;
}