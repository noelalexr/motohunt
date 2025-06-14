import mongoose from "mongoose";
import dotEnv from "dotenv";
import brandModel from "./models/brandModel.js";
import categoryModel from "./models/categoryModel.js";

dotEnv.config();

const brands = [
    {
        name: "Honda",
        logo: {
            url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749823225/honda-logo_waksqy.png"
        }
    },
    {
        name: "Yamaha",
        logo: {
            url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749823226/yamaha-logo_emwtme.webp"
        }
    },
    {
        name: "Suzuki",
        logo: {
            url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749823224/suzuki-logo_k5x42w.png"
        }
    },
    {
        name: "KTM",
        logo: {
            url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749823224/ktm-logo_ybtiet.png"
        }
    },
    {
        name: "CFMOTO",
        logo: {
            url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749823224/cfmoto-logo_uoc5wb.jpg"
        }
    },
    {
        name: "Kawasaki",
        logo: {
            url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749823225/kawasaki-logo_zsy8cp.png"
        }
    },
    {
        name: "Bristol",
        logo: {
            url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749823225/bristol-logo_sqzyf2.jpg"
        }
    },
    {
        name: "Harley-Davidson",
        logo: {
            url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749823224/harley-davidson-logo_cyhlxm.jpg"
        }
    },
    {
        name: "BMW",
        logo: {
            url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749823227/bmw-logo_vrlpsb.png"
        }
    },
    {
        name: "Ducati",
        logo: {
            url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749823227/ducati-logo_ytjdlc.png"
        }
    },
    {
        name: "Vespa",
        logo: {
            url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749823226/vespa-logo_b8b5r8.png"
        }
    },
    {
        name: "Triumph",
        logo: {
            url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749905190/triumph-logo_obnlbi.png"
        }
    },
    {
        name: "Others",
        logo: {
            url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749823736/others-logo_uytki2.png"
        }
    }
];

const categories = [
    {
        name: "Scooter",
        image: {
            url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749873291/scooter_h8jcp6.png"
        }
    },
    {
        name: "Sport",
        image: {
            url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749873290/sports-bike_givknk.jpg"
        }
    },
    {
        name: "Cruiser",
        image: {
            url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749873291/cruiser_mhhm2m.png"
        }
    },
    {
        name: "Underbone",
        image: {
            url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749873291/underbone_dofyt3.png"
        }
    },
    {
        name: "Dual Sport",
        image: {
            url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749873291/dual-sport_qf3rbk.jpg"
        }
    },
    {
        name: "Touring",
        image: {
            url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749873291/touring_d909ri.jpg"
        }
    },
    {
        name: "Chopper",
        image: {
            url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749873292/chopper_rth2df.jpg"
        }
    },
    {
        name: "Adventure",
        image: {
            url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749873292/adventure_sxjtte.jpg"
        }
    },
    {
        name: "Dirt",
        image: {
            url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749873291/dirt-bike_cuicbw.jpg"
        }
    },
    {
        name: "Electric",
        image: {
            url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749873290/electric-bike_roxpvs.jpg"
        }
    },
    {
        name: "Naked",
        image: {
            url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749873293/naked_rolyzu.png"
        }
    },
    {
        name: "Moped",
        image: {
            url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749873290/moped_aangwl.jpg"
        }
    },
    {
        name: "Cafe Racer",
        image: {
            url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749873293/cafe-racer_cv8eeb.jpg"
        }
    },
    {
        name: "Maxi Scooter",
        image: {
            url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749873292/maxi-scooter_t74y6f.jpg"
        }
    },
    {
        name: "Others",
        image: {
            url: "https://res.cloudinary.com/dty5cnb6e/image/upload/v1749873406/others-logo_oaeuqv.png"
        }
    }
];



async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URL);

        //USED UPSERT TO RETAIN EXISTING DATA

        //BRAND UPSERT
        for (const brand of brands) {
            await brandModel.updateOne(
                { name: brand.name },
                { $set: brand },
                { upsert: true }
            );
        }

        //CATEGORY UPSERT
        for (const category of categories) {
            await categoryModel.updateOne(
                { name: category.name },
                { $set: category },
                { upsert: true }
            );
        }

        console.log("Brands, Categories and Engine Displacement seeded!");
        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error("Error seeding:", error);
        mongoose.disconnect();
        process.exit(1);
    }
}

seed();