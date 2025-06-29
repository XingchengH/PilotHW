import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { config } from "dotenv";

config();

const songs = [
  {
    title: "Midnight Vibes",
    artist: "Luna Echo",
    genre: "Chill",
    language: "English",
    imgUrl: "/cover-images/1.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: 225,
  },
  {
    title: "Sunset Drive",
    artist: "Neon Waves",
    genre: "Synthwave",
    language: "English",
    imgUrl: "/cover-images/2.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: 252,
  },
  {
    title: "Starlight Dreams",
    artist: "Aurora Skies",
    genre: "Ambient",
    language: "English",
    imgUrl: "/cover-images/3.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: 178,
  },
  {
    title: "Electric Pulse",
    artist: "Voltage",
    genre: "EDM",
    language: "English",
    imgUrl: "/cover-images/4.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    duration: 213,
  },
  {
    title: "Ocean Breeze",
    artist: "Blue Horizon",
    genre: "Chillwave",
    language: "Spanish",
    imgUrl: "/cover-images/5.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    duration: 248,
  },
  {
    title: "City Lights",
    artist: "Skyline",
    genre: "Pop",
    language: "English",
    imgUrl: "/cover-images/6.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    duration: 206,
  },
  {
    title: "Golden Hour",
    artist: "Amber Tone",
    genre: "Indie",
    language: "English",
    imgUrl: "/cover-images/7.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    duration: 300,
  },
  {
    title: "Dreamcatcher",
    artist: "Nova",
    genre: "Lo-fi",
    language: "Korean",
    imgUrl: "/cover-images/8.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    duration: 215,
  },
  {
    title: "Echoes",
    artist: "Shadow Pulse",
    genre: "Trance",
    language: "English",
    imgUrl: "/cover-images/9.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    duration: 198,
  },
  {
    title: "Frozen Time",
    artist: "Arctic Flow",
    genre: "Chillstep",
    language: "English",
    imgUrl: "/cover-images/10.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    duration: 244,
  },
  {
    title: "Neon Dreams",
    artist: "RetroNova",
    genre: "Synthpop",
    language: "English",
    imgUrl: "/cover-images/11.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    duration: 201,
  },
  {
    title: "Lost Signal",
    artist: "Bytewave",
    genre: "Electropop",
    language: "English",
    imgUrl: "/cover-images/12.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    duration: 230,
  },
  {
    title: "Wanderlust",
    artist: "Open Skies",
    genre: "Ambient",
    language: "French",
    imgUrl: "/cover-images/13.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
    duration: 267,
  },
  {
    title: "Serotonin Rush",
    artist: "Mindstate",
    genre: "House",
    language: "English",
    imgUrl: "/cover-images/14.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
    duration: 193,
  },
  {
    title: "Afterglow",
    artist: "Radiant",
    genre: "Pop Rock",
    language: "English",
    imgUrl: "/cover-images/15.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
    duration: 289,
  },
  {
    title: "Solar Tide",
    artist: "Helios",
    genre: "Cinematic",
    language: "English",
    imgUrl: "/cover-images/16.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: 220,
  },
  {
    title: "Gravity",
    artist: "Falling Echo",
    genre: "Dubstep",
    language: "English",
    imgUrl: "/cover-images/17.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: 250,
  },
  {
    title: "Crystalline",
    artist: "Shatterloop",
    genre: "Experimental",
    language: "Japanese",
    imgUrl: "/cover-images/18.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: 199,
  },
  {
    title: "Halcyon Skies",
    artist: "Zenith",
    genre: "Downtempo",
    language: "English",
    imgUrl: "/cover-images/19.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    duration: 238,
  },
  {
    title: "Nocturne",
    artist: "Echo Sleep",
    genre: "Dream Pop",
    language: "English",
    imgUrl: "/cover-images/20.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    duration: 212,
  },
];

const seedSongs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    await Song.deleteMany({});

    await Song.insertMany(songs);

    console.log("Songs seeded successfully!");
  } catch (err) {
    console.log("error seeding songs", err);
  } finally {
    mongoose.connection.close();
  }
};

seedSongs();
