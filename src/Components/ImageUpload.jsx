
// export const ImageUpload = ({images, setImages} ) => {
//   const MAX_IMAGES = 5; // Maximum number of images allowed

//   const handleImageUpload = (event) => {
//     const files = event.target.files;
//     if (!files) return;

//     // Convert FileList to array
//     const fileArray = Array.from(files);

//     // Check if adding new files would exceed the limit
//     if (images.length + fileArray.length > MAX_IMAGES) {
//       alert(`You can only upload up to ${MAX_IMAGES} images`);
//       return;
//     }

//     // Process each file
//     const newImages = fileArray.map(file => {
//       // Validate file size (5MB limit)
//       if (file.size > 5 * 1024 * 1024) {
//         alert(`File ${file.name} is too large. Maximum size is 5MB`);
//         return null;
//       }

//       // Validate file type
//       if (!file.type.startsWith('image/')) {
//         alert(`File ${file.name} is not an image`);
//         return null;
//       }

//       return {
//         url: URL.createObjectURL(file),
//         file: file // Store the actual file for later upload
//       };
//     }).filter(image => image !== null);

//     setImages(prevImages => [...prevImages, ...newImages]);
//   };

//   const removeImage = (index) => {
//     setImages(prevImages => {
//       const newImages = [...prevImages];
//       // Revoke the object URL to prevent memory leaks
//       URL.revokeObjectURL(newImages[index].url);
//       newImages.splice(index, 1);
//       return newImages;
//     });
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-center w-full">
//         <label
//           htmlFor="image-upload"
//           className={`w-full h-32 border-2 border-dashed border-venue-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-venue-500 transition-colors duration-200 ${
//             images.length >= MAX_IMAGES ? 'opacity-50 cursor-not-allowed' : ''
//           }`}
//         >
//           <div className="flex flex-col items-center justify-center pt-5 pb-6">
//             <svg
//               className="w-8 h-8 mb-4 text-venue-400"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 20 16"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//               />
//             </svg>
//             <p className="mb-2 text-sm text-venue-500">
//               <span className="font-semibold">Click to upload</span> or drag and drop
//             </p>
//             <p className="text-xs text-venue-400">
//               PNG, JPG or JPEG (MAX. 5MB) - {images.length}/{MAX_IMAGES} images
//             </p>
//           </div>
//           <input
//             id="image-upload"
//             type="file"
//             className="hidden"
//             multiple
//             accept="image/*"
//             onChange={handleImageUpload}
//             disabled={images.length >= MAX_IMAGES}
//           />
//         </label>
//       </div>

//       {images.length > 0 && (
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//           {images.map((image, index) => (
//             <div key={index} className="relative group">
//               <img
//                 src={image.url}
//                 alt={`Uploaded ${index + 1}`}
//                 className="w-full h-32 object-cover rounded-lg"
//               />
//               <button
//                 type="button"
//                 className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
//                 onClick={() => removeImage(index)}
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };