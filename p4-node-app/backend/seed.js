import mongoose from "mongoose";
import dotEnv from "dotenv";
import brandModel from "./models/brandModel.js";
import categoryModel from "./models/categoryModel.js";

dotEnv.config();

const brands = [
    {
        name: "Honda",
        description: "Renowned Japanese manufacturer famous for reliable motorcycles and innovative engineering."
    },
    {
        name: "Yamaha",
        description: "Japanese brand known for versatile motorcycles, ranging from sportbikes to cruisers."
    },
    {
        name: "Suzuki",
        description: "Japanese maker with a strong lineup of performance and commuter motorcycles."
    },
    {
        name: "KTM",
        description: "Austrian company famous for high-performance off-road and racing motorcycles."
    },
    {
        name: "CFMOTO",
        description: "Chinese brand offering affordable, stylish, and feature-rich motorcycles and ATVs."
    },
    {
        name: "Kawasaki",
        description: "Japanese manufacturer known for powerful sport and cruiser motorcycles."
    },
    {
        name: "Bristol",
        description: "British manufacturer focusing on classic and custom motorcycles."
    },
    {
        name: "Harley-Davidson",
        description: "Iconic American brand famous for heavyweight cruisers and a strong biker culture."
    },
    {
        name: "BMW",
        description: "German maker blending luxury, performance, and advanced technology in motorcycles."
    },
    {
        name: "Ducati",
        description: "Italian brand celebrated for sporty, high-performance motorcycles with racing heritage."
    },
    {
        name: "Vespa",
        description: "an iconic Italian brand known for its stylish, lightweight scooters, combining vintage design with modern performance."
    },
    {
        name: "Others",
        description: "Others"
    }
];

const categories = [
    {
        name: "Scooter",
        description: "Compact and fuel-efficient bikes perfect for city commuting and short trips."
    },
    {
        name: "Sports Bike",
        description: "High-performance motorcycles designed for speed and agility on the road."
    },
    {
        name: "Cruiser",
        description: "Comfortable bikes with a laid-back riding style, ideal for long-distance rides."
    },
    {
        name: "Underbone",
        description: "Lightweight motorcycles with a step-through frame, widely used for everyday transport."
    },
    {
        name: "Dual-Sport",
        description: "Versatile bikes built for both on-road and off-road adventures."
    },
    {
        name: "Touring",
        description: "Motorcycles designed for long journeys, equipped with features for rider comfort."
    },
    {
        name: "Chopper",
        description: "Customized cruisers with extended forks and unique styling."
    },
    {
        name: "Adventure",
        description: "Robust motorcycles designed for long-distance off-road and on-road travel."
    },
    {
        name: "Dirt Bike",
        description: "Lightweight motorcycles built specifically for off-road trails and motocross."
    },
    {
        name: "Electric Bike",
        description: "Eco-friendly motorcycles powered by electric motors, ideal for urban commuting."
    },
    {
        name: "Naked",
        description: "Versatile motorcycles with an upright riding position, suitable for beginners and daily use."
    },
    {
        name: "Moped",
        description: "Small, low-powered bikes perfect for short-distance and economical travel."
    },
    {
        name: "Cafe Racer",
        description: "Retro-styled motorcycles emphasizing speed and handling, inspired by 1960s British bike culture."
    },
    {
        name: "Others",
        description: "Others"
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