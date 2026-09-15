import mongoose from "mongoose";
import Item from "./models/item.model.js"

async function updateLinks() {
  try {
    await mongoose.connect("mongodb+srv://abdul7490rehman:mmm786mmm@cluster0.08ozm.mongodb.net");

    const result = await Item.updateMany(
      {
        $or: [
          { link1080p: { $regex: /\.lol/ } },
          { link720p: { $regex: /\.lol/ } },
          { link480p: { $regex: /\.lol/ } },
          { link4k: { $regex: /\.lol/ } }
        ]
      },
      [
        {
          $set: {
            link1080p: { $replaceAll: { input: "$link1080p", find: ".lol", replacement: ".zip" } },
            link720p: { $replaceAll: { input: "$link720p", find: ".lol", replacement: ".zip" } },
            link480p: { $replaceAll: { input: "$link480p", find: ".lol", replacement: ".zip" } },
            link4k: { $replaceAll: { input: "$link4k", find: ".lol", replacement: ".zip" } }
          }
        }
      ]
    );

    console.log(`✅ Update complete! Modified ${result.modifiedCount} documents.`);
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error updating links:", err);
  }
}

updateLinks();
