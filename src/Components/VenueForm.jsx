import axios from "axios";
import  { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Config from "../config";
// import { ImageUpload } from "./ImageUpload";

export default function VenueForm () {
  const initialState = {
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
        sport: "",
        teams: [],
      },
    ],
    images: [],
    availability: [
      {
        date: "",
        isBooked: false,
        bookedBy: null,
      }
    ],
    contact: {
      name: "",
      phone: "",
      email: "",
    }
  };
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
    availability: [ //rehndi aa

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

//   const [selectedFiles, setSelectedFiles] = useState([])
// const [tempUrls, setTempUrls] = useState([])
// const [isOpen, setIsOpen] = useState([])
const [isLoading, setIsLoading] = useState([])
const [images, setImages] = useState([]);

// const [uploadProgres, setUploadProgress] = useState(0)




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
// const UploadPhotos = async () => {
//   if (!images?.length) {
//     toast.error("Please select files first!");
//     return;
//   }

//   const formData = new FormData();
//   images.forEach(image => {
//     formData.append('images', image.file); //image should match multer field name
//   });
//   try {
//     // Add loading state
//     setIsLoading(true);
    
//     const res = await axios.post(
//       `http:${Config.HOST}:${Config.PORT}/venue/register`, 
//         formData,{
//         headers: { 'Content-Type': 'multipart/form-data' },
 
//       }
//     );
    
//     if (res.data.status === true) {
//       toast.success("Images uploaded successfully!");
//       // Cleanup
// images.forEach(image => URL.revokeObjectURL(image.url));
// setImages([]);
     
//     }
//   } catch (err) {
//     toast.error(err.response?.data?.message || "Upload failed");
//   } finally {
//     setIsLoading(false);
//   }
// };

//dssssssssssssss

  useEffect(() => {
    return () => images.forEach(image => URL.revokeObjectURL(image.url));
  }, []);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      images: images.map(img => img.url)
    }));
  }, [images]);




const MAX_IMAGES = 5; // Maximum number of images allowed

const handleImageUpload = (event) => {
  
  const files = event.target.files;
  if (!files) return;
    // Convert FileList to array
  const fileArray = Array.from(files);
 // Add file validation
 const MAX_FILES = 5;
 const MAX_SIZE = 5 * 1024 * 1024; // 5MB


  // Check if adding new files would exceed the limit
  if ( files.length > MAX_FILES) {
    toast.error(`Maximum ${MAX_FILES} files allowed`);
    return;
  }
  // Process each file
  const newImages = fileArray.map(file => {
    // Validate file size (5MB limit)
    if (file.size > MAX_SIZE) {
      toast.error(`${file.name} exceeds 5MB limit`);
      return false;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error(`${file.name} is not an image`);
      return null;
    }
    return {
      url: URL.createObjectURL(file),
      file: file // Store the actual file for later upload
    };
  }).filter(image => image !== null);

  setImages(prevImages => [...prevImages, ...newImages]);
};

const removeImage = (index) => {
  setImages(prevImages => {
    const newImages = [...prevImages];
    // Revoke the object URL to prevent memory leaks
    URL.revokeObjectURL(newImages[index].url);
    newImages.splice(index, 1);
    return newImages;
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!images?.length) {
      toast.error("Please select images!");
      return;
  }
  console.log(formData)

  // First, validate required fields
  if (!formData.name || !formData.capacity || 
      !formData.location.address || !formData.location.city || 
      !formData.location.state || !formData.location.country || 
      !formData.contact.name || !formData.contact.phone) {

      toast.error("Please fill all required fields!");
      return;
  }

  const formDataToSend = new FormData();


  // Create venue data object that matches schema
  const venueData = {
      name: formData.name,
      location: {
          address: formData.location.address,
          city: formData.location.city,
          state: formData.location.state,
          country: formData.location.country,
          pincode: formData.location.pincode || '',
          latitude: formData.location.latitude || null,
          longitude: formData.location.longitude || null
      },
      capacity: Number(formData.capacity),
      sports: formData.sports,
      dimensions: {
          length: Number(formData.dimensions.length) || null,
          width: Number(formData.dimensions.width) || null,
          radius: Number(formData.dimensions.radius) || null
      },
      pitch: {
          type: formData.pitch.type || '',
          length: Number(formData.pitch.length) || null,
          width: Number(formData.pitch.width) || null
      },
      facilities: {
          floodlights: Boolean(formData.facilities.floodlights),
          dressingRooms: Number(formData.facilities.dressingRooms),
          parking: Boolean(formData.facilities.parking),
          restrooms: Boolean(formData.facilities.restrooms),
          foodStalls: Boolean(formData.facilities.foodStalls),
          scoreboards: {
              digital: Boolean(formData.facilities.scoreboards.digital),
              manual: Boolean(formData.facilities.scoreboards.manual)
          },
          firstAid: Boolean(formData.facilities.firstAid),
          commentaryBox: Boolean(formData.facilities.commentaryBox)
      },
      eventsHosted: formData.eventsHosted.map(event => ({
          eventName: event.eventName,
          date: event.date,
          sport: event.sport,
          teams: event.teams
      })),
      availability: formData.availability.map(slot => ({
          date: slot.date,
          isBooked: Boolean(slot.isBooked),
          bookedBy: slot.bookedBy
      })),
      contact: {
          name: formData.contact.name,
          phone: formData.contact.phone,
          email: formData.contact.email || ''
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
  };

  // Append venue data
  formDataToSend.append('venueData', JSON.stringify(venueData));
  
  // Append images
  images.forEach(image => {
      formDataToSend.append('images', image.file);
  });
console.log(JSON.stringify(formDataToSend))
  try {
      setIsLoading(true);
      const res = await axios.post(
          `http:${Config.HOST}:${Config.PORT}/venue/register`, 
          formDataToSend,
          { 
              headers: { 
                  'Content-Type': 'multipart/form-data'
              } 
          }
      );

      if (res.data.status) {
          toast.success("Venue registered successfully!");
          setFormData(initialState);
          images.forEach(image => URL.revokeObjectURL(image.url));
          setImages([]);
      }
  } catch (err) {
      console.error('Submit error:', err);
      toast.error(err.response?.data?.message || "Registration failed");
  } finally {
      setIsLoading(false);
  }
};
const handleAddAvailability = () => {
  setFormData((prev) => ({
    ...prev,
    availability: [
      ...prev.availability,
      { date: "", isBooked: false, bookedBy: null },
    ],
  }));
};
const handleAddEvent = () => {
  setFormData((prev) => ({
    ...prev,
    eventsHosted: [
      ...prev.eventsHosted,
      { eventName: "", date: "", sport: "", teams: [] },
    ],
  }));
};
const handleEventChange = (index, e) => {
  const { name, value } = e.target;
  const updatedEvents = [...formData.eventsHosted];
  updatedEvents[index][name] = value;
  setFormData((prev) => ({
    ...prev,
    eventsHosted: updatedEvents,
  }));
};

const handleAvailabilityChange = (index, e) => {
  const { name, value, type, checked } = e.target;
  const updatedAvailability = [...formData.availability];
  updatedAvailability[index][name] = type === "checkbox" ? checked : value;
  setFormData((prev) => ({
    ...prev,
    availability: updatedAvailability,
  }));
};
if(isLoading){
  return (
    <div>fuck</div>
  )
}
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
              required
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
              required
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
              required
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
                name="facilities.dressingRoom"
                checked={formData.facilities.dressingRooms}
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
          <label className="block text-sm font-medium mb-2">Events Hosted</label>
          {formData.eventsHosted.map((event, index) => (
            <div key={index} className="mb-4 border p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Event Name
                  </label>
                  <input
                    type="text"
                    name="eventName"
                    value={event.eventName}
                    onChange={(e) => handleEventChange(index, e)}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={event.date}
                    onChange={(e) => handleEventChange(index, e)}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Sport</label>
                <select
                  name="sport"
                  value={event.sport}
                  onChange={(e) => handleEventChange(index, e)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Select Sport</option>
                  {["Cricket", "Football", "Hockey", "Tennis", "Basketball"].map(
                    (sport) => (
                      <option key={sport} value={sport}>
                        {sport}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Teams</label>
                <input
                  type="text"
                  name="teams"
                  value={event.teams.join(", ")}
                  onChange={(e) => {
                    const { value } = e.target;
                    const updatedEvents = [...formData.eventsHosted];
                    updatedEvents[index].teams = value
                      .split(",")
                      .map((team) => team.trim());
                    setFormData((prev) => ({
                      ...prev,
                      eventsHosted: updatedEvents,
                    }));
                  }}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter teams separated by commas"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddEvent}
            className="mt-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Add Event
          </button>
        </div>
        {/* availablity */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Availability</label>
          {formData.availability.map((availability, index) => (
            <div key={index} className="mb-4 border p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={availability.date}
                    onChange={(e) => handleAvailabilityChange(index, e)}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="isBooked"
                      checked={availability.isBooked}
                      onChange={(e) => handleAvailabilityChange(index, e)}
                    />
                    Is Booked
                  </label>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddAvailability}
            className="mt-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Add Availability
          </button>
        </div>
        <div className="space-y-4">
         <div className="space-y-4 ">
       
      <div className="flex items-center justify-around w-[44rem] ">
        <div className="w-96">
        <label
          htmlFor="image-upload"
          className={`w-full h-32 border-2 border-dashed border-venue-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-venue-500 transition-colors duration-200 ${
            images.length >= MAX_IMAGES ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-venue-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-venue-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-venue-400">
              PNG, JPG or JPEG (MAX. 5MB) - {images.length}/{MAX_IMAGES} images
            </p>
          </div>
          <input
            id="image-upload"
            type="file"
            className="hidden"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            disabled={images.length >= MAX_IMAGES}
          />
        </label>
        </div>
       {/* {images.length < 1  ? <div></div>: <div onClick={UploadPhotos} className="h-14 border rounded-sm w-28 bg-indigo-500 flex justify-center items-center hover:cursor-pointer hover:bg-indigo-600"><h5 className="font-mono text-xl text-white ">Upload</h5></div>
       } */}
       </div>
   
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-0 ">
          {images.map((image, index) => (
            <div key={index} className="relative group w-24 ">
              <img
                src={image.url}
                alt={`Uploaded ${index + 1}`}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <button
                type="button"
                className="text-sm  absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded opacity-100 group hover: cursor-pointer opacity-100 bg-red-500 transition-opacity duration-200"
                onClick={() => removeImage(index)}
              >
                Remove
              </button>
            

            </div>

          ))}

        </div>
        
      )}
       
    </div>
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

