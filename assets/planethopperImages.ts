const planetHopperImages = [
  "https://images.ferryhopper.com/locations/Skiathos.jpg",
  "https://images.ferryhopper.com/locations/Santorini.jpg",
  "https://images.ferryhopper.com/locations/Naxos.jpg",
  "https://images.ferryhopper.com/locations/Ios.JPG",
  "https://images.ferryhopper.com/locations/Santorini.jpg",
];

export const getRandomImage = () => {
  const random = Math.floor(Math.random() * planetHopperImages.length);
  return planetHopperImages[random];
};
