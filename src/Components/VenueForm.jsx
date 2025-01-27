import  { useEffect, useState } from "react";
import { ImageUpload } from "./ImageUpload";

export default function VenueForm () {
  const [formData, setFormData] = useState({
    name: "",
    location: {
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      latitude: null,
      longitude: null,
    },
    capacity: null,
    sports: [],
    dimensions: {
      length: null,
      width: null,
      radius: null,
    },
    pitch: {
      type: "",
      length: null,
      width: null,
    },
    facilities: {
      floodlights: false,
      dressingRooms: 2,
      parking: true,
      restrooms: true,
      foodStalls: true,
      scoreboards: {
        digital: true,
        manual: false,
      },
      firstAid: true,
      commentaryBox: true,
    },

    eventsHosted: [
      {
        eventName: "",
        date: "",
        sport:"",
        teams: [],
      },
    ],
    images: [],
    availability: [
      {
        date:"",
        isBooked:false,
        bookedBy:null,
      }
    ],
    contact: {
      name: "",
      phone: "",
      email: "",
    },
  });

  const [images, setImages] = useState([]);
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      images: images.map(img => img.url)
    }));
  }, [images]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add your submission logic here
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold mb-6">Venue Registration Form</h1>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Venue Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Address</label>
          <input
            type="text"
            name="location.address"
            value={formData.location.address}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">City</label>
            <input
              type="text"
              name="location.city"
              value={formData.location.city}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">State</label>
            <input
              type="text"
              name="location.state"
              value={formData.location.state}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">Country</label>
            <input
              type="text"
              name="location.country"
              value={formData.location.country}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Pincode</label>
            <input
              type="text"
              name="location.pincode"
              value={formData.location.pincode}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">Latitude</label>
            <input
              type="number"
              name="location.latitude"
              value={formData.location.latitude}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Longitude</label>
            <input
              type="number"
              name="location.longitude"
              value={formData.location.longitude}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Capacity */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Capacity</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        {/* Sports */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Sports</label>
          <div className="flex flex-wrap gap-2">
            {["Cricket", "Football", "Hockey", "Tennis", "Basketball"].map(
              (sport) => (
                <label key={sport} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="sports"
                    value={sport}
                    onChange={(e) => {
                      const { checked, value } = e.target;
                      setFormData((prev) => ({
                        ...prev,
                        sports: checked
                          ? [...prev.sports, value]
                          : prev.sports.filter((s) => s !== value),
                      }));
                    }}
                  />
                  {sport}
                </label>
              )
            )}
          </div>
        </div>

        {/* Dimensions */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Dimensions</label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Length</label>
              <input
                type="number"
                name="dimensions.length"
                value={formData.dimensions.length}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Width</label>
              <input
                type="number"
                name="dimensions.width"
                value={formData.dimensions.width}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Radius</label>
              <input
                type="number"
                name="dimensions.radius"
                value={formData.dimensions.radius}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Pitch */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Pitch Type</label>
          <select
            name="pitch.type"
            value={formData.pitch.type}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Pitch Type</option>
            {["Grass", "Clay", "Synthetic", "Hard"].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">Pitch Length</label>
            <input
              type="number"
              name="pitch.length"
              value={formData.pitch.length}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Pitch Width</label>
            <input
              type="number"
              name="pitch.width"
              value={formData.pitch.width}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Facilities */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Facilities</label>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="facilities.floodlights"
                checked={formData.facilities.floodlights}
                onChange={handleChange}
              />
              Floodlights
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="facilities.parking"
                checked={formData.facilities.parking}
                onChange={handleChange}
              />
              Dressing Room
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="facilities.parking"
                checked={formData.facilities.parking}
                onChange={handleChange}
              />
              Parking
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="facilities.restrooms"
                checked={formData.facilities.restrooms}
                onChange={handleChange}
              />
              Restrooms
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="facilities.foodStalls"
                checked={formData.facilities.foodStalls}
                onChange={handleChange}
              />
              Food Stalls
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="facilities.scoreboards.digital"
                checked={formData.facilities.scoreboards.digital}
                onChange={handleChange}
              />
              Digital Scoreboard
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="facilities.scoreboards.manual"
                checked={formData.facilities.scoreboards.manual}
                onChange={handleChange}
              />
              Manual Scoreboard
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="facilities.firstAid"
                checked={formData.facilities.firstAid}
                onChange={handleChange}
              />
              First Aid
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="facilities.commentaryBox"
                checked={formData.facilities.commentaryBox}
                onChange={handleChange}
              />
              Commentary Box
            </label>
          </div>
        </div>

        {/* Event Hosted */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Event Hosted</label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Event Name</label>
              <input
                type="string"
                name="Name"
                // value={formData.dimensions.length}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <input
                type="number"
                name="date"
                value={formData.dimensions.width}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Sports</label>
          <select
            name="Select"
            value={formData.sports.type}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Pitch Type</option>
            {["Cricket", "Football", "Hockey", "Tennis","BasketBall"].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
            <div>
              <label className="block text-sm font-medium mb-2">Teams</label>
              <input
                type="string"
                name="teams"
                // value={formData.dimensions.radius}
                onChange={handleChange}
                className="w-full p-2 text-black border rounded-lg"
              />
            </div>
          </div>
        </div>
        <div className="space-y-4">
        <label>Venue Images</label>
        <ImageUpload 
        images={images}     // Pass current images array
        setImages={setImages}  // Pass function to update images
      />      
        </div>
        {/* Contact */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Contact Name</label>
          <input
            type="text"
            name="contact.name"
            value={formData.contact.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              type="text"
              name="contact.phone"
              value={formData.contact.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="contact.email"
              value={formData.contact.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

