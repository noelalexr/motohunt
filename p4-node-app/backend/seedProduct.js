import mongoose from "mongoose";
import productModel from "./models/productModel.js";  // adjust path
import dotEnv from "dotenv";

dotEnv.config();
await mongoose.connect(process.env.MONGO_URL);

//MY USER ID
const userId = new mongoose.Types.ObjectId("684d05aea21eb29060761b96");

//BRANDS
const honda = new mongoose.Types.ObjectId("684c315d9ce3fe38ee061abe");
const yamaha = new mongoose.Types.ObjectId("684c315d9ce3fe38ee061abf");
const suzuki = new mongoose.Types.ObjectId("684c315d9ce3fe38ee061ac0");
const ktm = new mongoose.Types.ObjectId("684c315d9ce3fe38ee061ac1");
const cfMoto = new mongoose.Types.ObjectId("684c315d9ce3fe38ee061ac2");
const kawasaki = new mongoose.Types.ObjectId("684c315d9ce3fe38ee061ac3");
const bristol = new mongoose.Types.ObjectId("684c315d9ce3fe38ee061ac4");
const harleyDavidson = new mongoose.Types.ObjectId("684c315d9ce3fe38ee061ac5");
const bmw = new mongoose.Types.ObjectId("684c315d9ce3fe38ee061ac6");
const ducati = new mongoose.Types.ObjectId("684c315d9ce3fe38ee061ac7");
const vespa = new mongoose.Types.ObjectId("684c315d9ce3fe38ee061ac8");
const triumph = new mongoose.Types.ObjectId("684d6f3be94308b618a90396");
const othersBrand = new mongoose.Types.ObjectId("684c315d9ce3fe38ee061ac9");

//CATEGORIES
const scooter = new mongoose.Types.ObjectId("684cf495b2bcaee2d2c0df0e");
const sport = new mongoose.Types.ObjectId("684cf495b2bcaee2d2c0df0f");
const cruiser = new mongoose.Types.ObjectId("684cf495b2bcaee2d2c0df10");
const underbone = new mongoose.Types.ObjectId("684cf495b2bcaee2d2c0df11");
const dualSport = new mongoose.Types.ObjectId("684cf495b2bcaee2d2c0df12");
const touring = new mongoose.Types.ObjectId("684cf495b2bcaee2d2c0df13");
const chopper = new mongoose.Types.ObjectId("684cf495b2bcaee2d2c0df14");
const adventure = new mongoose.Types.ObjectId("684cf495b2bcaee2d2c0df15");
const dirt = new mongoose.Types.ObjectId("684cf495b2bcaee2d2c0df16");
const electric = new mongoose.Types.ObjectId("684cf495b2bcaee2d2c0df17");
const naked = new mongoose.Types.ObjectId("684cf495b2bcaee2d2c0df18");
const moped = new mongoose.Types.ObjectId("684cf495b2bcaee2d2c0df19");
const cafeRacer = new mongoose.Types.ObjectId("684cf495b2bcaee2d2c0df1a");
const maxiScooter = new mongoose.Types.ObjectId("684cf495b2bcaee2d2c0df1b");
const othersCategory = new mongoose.Types.ObjectId("684cf495b2bcaee2d2c0df1c");

const products = [
    {
        name: "Kawasaki Ninja 650 2025",
        description: "The Kawasaki Ninja 650 2025 price in the Philippines starts from ₱452,000. it is available in 1 variants in the Philippines. The Ninja 650 is powered by a 649 cc engine, and has a 6-Speed gearbox. The Kawasaki Ninja 650 has a seating height of 790 mm and kerb weight of 172 kg . The Ninja 650 comes with Dual Disc front brakes and Disc rear brakes along with ABS. Over 28 users have reviewed Ninja 650 on basis of Features, Mileage, seating comfort, and engine performance. Ninja 650 top competitors are Ninja ZX-6R, Z650, CBR500R and CB650R.",
        price: 452000,
        category: sport,
        brand: kawasaki,
        engineDisplacement: 649,
        image: { url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749878066/kawasaki-ninja-650-slant-rear-view-full-image-981324_zulf9c.avif" },
        user: userId
    },
    {
        name: "Honda CB650R 2025",
        description: "The Honda CB650R 2025 price in the Philippines starts from ₱524,000. it is available in 3 colors, 1 variants in the Philippines. The CB650R is powered by a 649 cc engine, and has a 6-Speed gearbox. The Honda CB650R has a seating height of 810 mm and kerb weight of 203 kg . The CB650R comes with Disc front brakes and Disc rear brakes along with ABS. Over 32 users have reviewed CB650R on basis of Features, Mileage, seating comfort, and engine performance. CB650R top competitors are Ninja 650, Z650, 790 Duke and SV 650.",
        price: 524000,
        category: naked,
        brand: honda,
        engineDisplacement: 649,
        image: { url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749880782/honda-cb650r-slant-rear-view-full-image-623584_rhrdb5.avif" },
        user: userId
    },
    {
        name: "Suzuki Hayabusa 2025",
        description: "The Suzuki Hayabusa 2025 price in the Philippines starts from ₱1.235 Million. it is available in 2 colors, 1 variants in the Philippines. The Hayabusa is powered by a 1340 cc engine, and has a 6-Speed gearbox. The Suzuki Hayabusa has a seating height of 800 mm and kerb weight of 264 kg . The Hayabusa comes with Dual Disc front brakes and Disc rear brakes along with ABS. Over 17 users have reviewed Hayabusa on basis of Features, Mileage, seating comfort, and engine performance. Hayabusa top competitors are S 1000, Ninja ZX-10R, SuperSport and Panigale V2.",
        price: 1235000,
        category: sport,
        brand: suzuki,
        engineDisplacement: 1340,
        image: { url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749880992/suzuki-hayabusa-slant-rear-view-full-image-231449_ud3rnd.avif" },
        user: userId
    },
    {
        name: "Ducati Panigale V4 2025",
        description: "The Ducati Panigale V4 2025 price in the Philippines starts from ₱1.995 Million. it is available in 1 variants in the Philippines. The Panigale V4 is powered by a 1103 cc engine, and has a 6-Speed gearbox. The Ducati Panigale V4 has a seating height of 835 mm and kerb weight of 198 kg . The Panigale V4 comes with Dual Disc front brakes and Disc rear brakes along with ABS. Over 13 users have reviewed Panigale V4 on basis of Features, Mileage, seating comfort, and engine performance. Panigale V4 top competitors are Ninja H2, CBR1000RR-R, YZF R1M and RSV4.",
        price: 1995000,
        category: sport,
        brand: ducati,
        engineDisplacement: 1103,
        image: { url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749881111/ducati-panigale-v4-right-side-viewfull-image-319591_hjjknd.avif" },
        user: userId
    },
    {
        name: "BMW G 310 2025",
        description: "The BMW G 310 2025 price in the Philippines starts between ₱300,000 - 320,000 . it is available in 3 colors, 2 variants in the Philippines. The G 310 is powered by a 313 cc engine, and has a 6-Speed gearbox. The BMW G 310 has a seating height of 835 mm and kerb weight of 175 kg . The G 310 comes with Disc front brakes and Disc rear brakes along with ABS. Over 19 users have reviewed G 310 on basis of Features, Mileage, seating comfort, and engine performance. G 310 top competitors are Himalayan, 390 Adventure and Himalayan 450.",
        price: 300000,
        category: adventure,
        brand: bmw,
        engineDisplacement: 313,
        image: { url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749881234/bmw-g-310-slant-rear-view-full-image-496668_x4kp3z.avif" },
        user: userId
    },
    {
        name: "Vespa Primavera 2025",
        description: "The Vespa Primavera 2025 price in the Philippines starts between ₱210,000 - 235,000 . it is available in 7 colors, 3 variants in the Philippines. The Primavera is powered by a 155 cc engine, and has a Variable Speed gearbox. The Primavera comes with Disc front brakes and Drum rear brakes along with ABS. Over 16 users have reviewed Primavera on basis of Features, Mileage, seating comfort, and engine performance. Primavera top competitors are Sprint, XTOWN 300i, XTOWN CT 300i and KRV 180i TCS.",
        price: 210000,
        category: scooter,
        brand: vespa,
        engineDisplacement: 155,
        image: { url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749881361/vespa-primavera-slant-front-view-full-image-461173_iuwlau.webp" },
        user: userId
    },
    {
        name: "Honda Gold Wing 2025",
        description: "The Honda Gold Wing 2025 price in the Philippines starts between ₱2 - 2.1 Million. it is available in 3 colors, 2 variants in the Philippines. The Gold Wing is powered by a 1833 cc engine, and has a 7-Speed gearbox. The Honda Gold Wing has a seating height of 745 mm and kerb weight of 385 kg . The Gold Wing comes with Disc front brakes and Disc rear brakes along with ABS. Over 22 users have reviewed Gold Wing on basis of Features, Mileage, seating comfort, and engine performance. Gold Wing top competitors are Street Glide, Road Glide, R 1250 RT and Low Rider ST.",
        price: 2000000,
        category: touring,
        brand: honda,
        engineDisplacement: 1833,
        image: { url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749881465/honda-gold-wing-slant-front-view-full-image-169472_fkdqcz.avif" },
        user: userId
    },
    {
        name: "Harley-Davidson Fat Bob 2025",
        description: "The Harley-Davidson Fat Bob 2025 price in the Philippines starts from ₱1.5 Million. it is available in 3 colors, 1 variants in the Philippines. The Fat Bob is powered by a 1868 cc engine, and has a 6-Speed gearbox. The Fat Bob comes with Disc front brakes and Disc rear brakes along with ABS. Over 11 users have reviewed Fat Bob on basis of Features, Mileage, seating comfort, and engine performance. Fat Bob top competitors are Low Rider, Street Bob, XDiavel and Fat Boy 114.",
        price: 1500000,
        category: cruiser,
        brand: harleyDavidson,
        engineDisplacement: 1868,
        image: { url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749881612/harley-davidson-fat-bob-slant-rear-view-full-image-524422_sindmu.avif" },
        user: userId
    },
    {
        name: "Honda ADV160 2025",
        description: "The Honda ADV160 2025 price in the Philippines starts from ₱166,900. it is available in 3 colors, 1 variants in the Philippines. The ADV160 is powered by a 157 cc engine, and has a Variable Speed gearbox. The Honda ADV160 has a seating height of 780 mm and kerb weight of 133 kg . The ADV160 comes with Disc front brakes and Disc rear brakes along with ABS. Over 18 users have reviewed ADV160 on basis of Features, Mileage, seating comfort, and engine performance. ADV160 top competitors are PCX160, Aerox 155, ADX 160 and Click 160.",
        price: 166900,
        category: maxiScooter,
        brand: honda,
        engineDisplacement: 157,
        image: { url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749882994/honda-adv-160-slant-front-view-full-image-580713_pzxtrt.avif" },
        user: userId
    },
    {
        name: "CFMoto 400 NK",
        description: "The CFMoto 400 NK 2025 price in the Philippines starts from ₱219,000. it is available in 2 colors, 1 variants in the Philippines. The 400 NK is powered by a 400 cc engine, and has a 6-Speed gearbox. The CFMoto 400 NK has a seating height of 815 mm and kerb weight of 206 kg . The 400 NK comes with Disc front brakes and Disc rear brakes along with ABS. Over 29 users have reviewed 400 NK on basis of Features, Mileage, seating comfort, and engine performance. 400 NK top competitors are Duke 390, 650 MT and Street Triple.",
        price: 219000,
        category: dualSport,
        brand: cfMoto,
        engineDisplacement: 400,
        image: { url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749905003/cfmoto-400-nk-left-side-view-full-image-637735_p8xwzz.avif" },
        user: userId
    },
    {
        name: "Triumph Street Triple",
        description: "The Triumph Street Triple 2025 price in the Philippines starts between ₱695,000 - 795,000 . it is available in 2 colors, 2 variants in the Philippines. The Street Triple is powered by a 765 cc engine, and has a 6-Speed gearbox. The Street Triple comes with Dual Disc front brakes and Disc rear brakes along with ABS. Over 9 users have reviewed Street Triple on basis of Features, Mileage, seating comfort, and engine performance. Street Triple top competitors are 400 NK and 650 MT.",
        price: 695000,
        category: naked,
        brand: triumph,
        engineDisplacement: 765,
        image: { url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749905352/triumph-street-triple-slant-rear-view-full-image-126046_zcibaq.avif" },
        user: userId
    },
    {
        name: "Suzuki Raider R150 Fi",
        description: "The Suzuki Raider R150 Fi 2025 price in the Philippines starts from ₱121,900. it is available in 5 colors, 1 variants in the Philippines. The Raider R150 Fi is powered by a 148 cc engine, and has a 6-Speed gearbox. The Raider R150 Fi comes with Disc front brakes and Disc rear brakes. Over 46 users have reviewed Raider R150 Fi on basis of Features, Mileage, seating comfort, and engine performance. Raider R150 Fi top competitors are Sniper 155 and Raider R150 Carb.",
        price: 121900,
        category: underbone,
        brand: suzuki,
        engineDisplacement: 148,
        image: { url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749905607/suzuki-raider-r150-fi-slant-rear-view-full-image-975019_e0klda.avif" },
        user: userId
    },
    {
        name: "Big Bear Choppers Athena Chopper",
        description: "The 2008 Big Bear Choppers Athena is a custom-built chopper known for its sleek design and powerful performance. It features a long, low stance with a distinctive stretched frame, often incorporating a springer front end. The Athena typically boasts a high-displacement, air-cooled V-twin engine, delivering ample horsepower and torque for a thrilling riding experience. Other common features include custom paint jobs, billet aluminum wheels, and high-quality components throughout, reflecting the brand's focus on both aesthetics and performance.",
        price: 1875000,
        category: chopper,
        brand: othersBrand,
        engineDisplacement: 1638,
        image: { url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749905994/7e42047b406c9f8fda16605a3715f374_jlpf8k.jpg" },
        user: userId
    },
    {
        name: "Yamaha XTZ 125",
        description: "The Yamaha XTZ 125 2025 price in the Philippines starts from ₱89,900. it is available in 2 colors, 1 variants in the Philippines. The XTZ 125 is powered by a 124 cc engine, and has a 5-Speed gearbox. The Yamaha XTZ 125 has a seating height of 840 mm and kerb weight of 118 kg . The XTZ 125 comes with Disc front brakes and Drum rear brakes. Over 20 users have reviewed XTZ 125 on basis of Features, Mileage, seating comfort, and engine performance. XTZ 125 top competitors XR150L.",
        price: 89900,
        category: dirt,
        brand: yamaha,
        engineDisplacement: 124,
        image: { url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749907124/yamaha-xtz-125-slant-rear-view-full-image-875362_ksbi64.avif" },
        user: userId
    },
    {
        name: "Royal Enfield Continental GT 650",
        description: "The Royal Enfield Continental GT 650 2025 price in the Philippines starts from ₱459,000. it is available in 5 colors, 1 variants in the Philippines. The Continental GT 650 is powered by a 648 cc engine, and has a 6-Speed gearbox. The Royal Enfield Continental GT 650 has a seating height of 790 mm and kerb weight of 198 kg . The Continental GT 650 comes with Disc front brakes and Disc rear brakes along with ABS. Over 15 users have reviewed Continental GT 650 on basis of Features, Mileage, seating comfort, and engine performance. Continental GT 650 top competitors are Interceptor 650, 700 CL-X Heritage, Seiemmezzo and Shotgun 650.",
        price: 459000,
        category: cafeRacer,
        brand: othersBrand,
        engineDisplacement: 648,
        image: { url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749907401/royal-enfield-continental-gt-650-slant-rear-view-full-image-403034_nae0ss.avif" },
        user: userId
    },
];

for (const product of products) {
    const existing = await productModel.findOne({ name: product.name });
    if (existing) {
        console.log(`Skipped: ${product.name} (already exists)`);
    } else {
        await productModel.create(product);
        console.log(`Inserted: ${product.name}`);
    }
}

await mongoose.disconnect();
console.log("Seeding completed!");