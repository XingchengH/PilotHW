import mongoose from "mongoose";
import { config } from "dotenv";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";

config();

const seedData = async () => {
  const songs = [
    {
      title: "Midnight Vibes",
      artist: "Luna Echo",
      genre: "Chill",
      language: "English",
      imgUrl: "https://via.placeholder.com/150x150?text=Album+1",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      duration: 225,
    },
    {
      title: "Sunset Drive",
      artist: "Neon Waves",
      genre: "Synthwave",
      language: "English",
      imgUrl: "https://via.placeholder.com/150x150?text=Album+2",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      duration: 252,
    },
    {
      title: "Starlight Dreams",
      artist: "Aurora Skies",
      genre: "Ambient",
      language: "English",
      imgUrl: "https://via.placeholder.com/150x150?text=Album+3",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      duration: 178,
    },
    {
      title: "Electric Pulse",
      artist: "Voltage",
      genre: "EDM",
      language: "English",
      imgUrl: "https://via.placeholder.com/150x150?text=Album+4",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      duration: 213,
    },
    {
      title: "Ocean Breeze",
      artist: "Blue Horizon",
      genre: "Chillwave",
      language: "Spanish",
      imgUrl: "https://via.placeholder.com/150x150?text=Album+5",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
      duration: 248,
    },
    {
      title: "City Lights",
      artist: "Skyline",
      genre: "Pop",
      language: "English",
      imgUrl: "https://via.placeholder.com/150x150?text=Album+6",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
      duration: 206,
    },
    {
      title: "Golden Hour",
      artist: "Amber Tone",
      genre: "Indie",
      language: "English",
      imgUrl: "https://via.placeholder.com/150x150?text=Album+7",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
      duration: 300,
    },
    {
      title: "Dreamcatcher",
      artist: "Nova",
      genre: "Lo-fi",
      language: "Korean",
      imgUrl: "https://via.placeholder.com/150x150?text=Album+8",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
      duration: 215,
    },
    {
      title: "Echoes",
      artist: "Shadow Pulse",
      genre: "Trance",
      language: "English",
      imgUrl: "https://via.placeholder.com/150x150?text=Album+9",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
      duration: 198,
    },
    {
      title: "Frozen Time",
      artist: "Arctic Flow",
      genre: "Chillstep",
      language: "English",
      imgUrl: "https://via.placeholder.com/150x150?text=Album+10",
      audioUrl:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
      duration: 244,
    },
    {
      title: "Neon Dreams",
      artist: "RetroNova",
      genre: "Synthpop",
      language: "English",
      imgUrl: "https://via.placeholder.com/150x150?text=Album+11",
      audioUrl:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
      duration: 201,
    },
    {
      title: "Lost Signal",
      artist: "Bytewave",
      genre: "Electropop",
      language: "English",
      imgUrl: "https://via.placeholder.com/150x150?text=Album+12",
      audioUrl:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
      duration: 230,
    },
    {
      title: "Wanderlust",
      artist: "Open Skies",
      genre: "Ambient",
      language: "French",
      imgUrl: "https://via.placeholder.com/150x150?text=Album+13",
      audioUrl:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
      duration: 267,
    },
    {
      title: "Serotonin Rush",
      artist: "Mindstate",
      genre: "House",
      language: "English",
      imgUrl: "https://via.placeholder.com/150x150?text=Album+14",
      audioUrl:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
      duration: 193,
    },
    {
      title: "Afterglow",
      artist: "Radiant",
      genre: "Pop Rock",
      language: "English",
      imgUrl: "https://via.placeholder.com/150x150?text=Album+15",
      audioUrl:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
      duration: 289,
    },
    {
      title: "Solar Tide",
      artist: "Helios",
      genre: "Cinematic",
      language: "English",
      imgUrl: "https://via.placeholder.com/150x150?text=Album+16",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      duration: 220,
    },
    {
      title: "Gravity",
      artist: "Falling Echo",
      genre: "Dubstep",
      language: "English",
      imgUrl: "https://via.placeholder.com/150x150?text=Album+17",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      duration: 250,
    },
    {
      title: "Crystalline",
      artist: "Shatterloop",
      genre: "Experimental",
      language: "Japanese",
      imgUrl: "https://via.placeholder.com/150x150?text=Album+18",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      duration: 199,
    },
    {
      title: "Halcyon Skies",
      artist: "Zenith",
      genre: "Downtempo",
      language: "English",
      imgUrl: "https://via.placeholder.com/150x150?text=Album+19",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      duration: 238,
    },
    {
      title: "Nocturne",
      artist: "Echo Sleep",
      genre: "Dream Pop",
      language: "English",
      imgUrl: "https://via.placeholder.com/150x150?text=Album+20",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
      duration: 212,
    },
  ];
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    await Song.deleteMany({});
    await Album.deleteMany({});
    // Insert songs
    const insertedSongs = await Song.insertMany(songs);

    // Create albums referencing grouped song IDs
    const albums = [
      {
        title: "Chill Nights",
        artist: "Luna Echo",
        imgUrl: "https://via.placeholder.com/300x300?text=Chill+Nights",
        releaseYear: 2021,
        songs: insertedSongs.slice(0, 5).map((song) => song._id),
      },
      {
        title: "Retro Drive",
        artist: "Neon Waves",
        imgUrl: "https://via.placeholder.com/300x300?text=Retro+Drive",
        releaseYear: 2022,
        songs: insertedSongs.slice(5, 10).map((song) => song._id),
      },
      {
        title: "Wavescapes",
        artist: "Blue Horizon",
        imgUrl: "https://via.placeholder.com/300x300?text=Wavescapes",
        releaseYear: 2023,
        songs: insertedSongs.slice(10, 15).map((song) => song._id),
      },
      {
        title: "Celestial Echoes",
        artist: "Zenith",
        imgUrl: "https://via.placeholder.com/300x300?text=Celestial+Echoes",
        releaseYear: 2020,
        songs: insertedSongs.slice(15, 20).map((song) => song._id),
      },
    ];

    const insertedAlbums = await Album.insertMany(albums);

    for (let i = 0; i < insertedAlbums.length; i++) {
      const album = insertedAlbums[i];
      const albumSongs = album.songs;

      await Song.updateMany(
        { _id: { $in: albumSongs } },
        { albumId: album._id }
      );
    }

    console.log("Songs and albums seeded successfully!");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await mongoose.disconnect();
  }
};

seedData();
