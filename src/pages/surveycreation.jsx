import { useState, useRef, useEffect } from "react";
import { IoArrowBack, IoSearchOutline, IoAdd } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import {
  BiBold,
  BiItalic,
  BiUnderline,
  BiListOl,
  BiListUl,
  BiLink,
} from "react-icons/bi";
import Input from "../components/input/Input"; // Ensure this component exists
import Card from "../components/problem/Card"; // Ensure this component exists
import LogCreation from "../components/Popups/Inprogress/LogCreation"; // Ensure this component exists

const Dashboard = () => {
  const [selectedCategories, setSelectedCategories] = useState([]); // Track selected categories
  const [files, setFiles] = useState([]); // Track uploaded files
  const [showLogCreation, setShowLogCreation] = useState(false); // Track visibility of LogCreation
  const [searchQuery, setSearchQuery] = useState(""); // Track search query
  const [fileError, setFileError] = useState(""); // Track file upload errors
  const contentEditableRef = useRef(null); // Ref for the contenteditable div
  const scrollableRef = useRef(null); // Ref for the scrollable container

  // Define cardData before using it
  const cardData = [
    {
      title: "Productivity failure",
      status: "New",
      description:
        "Productive failure is a learning design where individuals are allowed to fail in a managed way.",
      date: "2023-10-15",
      author: "J. David",
      imageUrl: "/user1.jpg",
    },
    {
      title: "Task Management",
      status: "Accepted",
      description:
        "Effective task management strategies to improve productivity and focus.",
      date: "2023-10-14",
      author: "A. Smith",
      imageUrl: "/user2.jpg",
    },
    {
      title: "Time Tracking",
      status: "Rejected",
      description:
        "Tools and techniques for tracking time and improving efficiency.",
      date: "2023-10-13",
      author: "M. Johnson",
      imageUrl: "/user3.jpg",
    },
  ];

  // Filter cards based on search query
  const filteredCards = cardData.filter(
    (card) =>
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to apply formatting
  const applyFormatting = (command, value = null) => {
    if (contentEditableRef.current) {
      document.execCommand(command, false, value);
    }
  };

  // Function to toggle category selection
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((c) => c !== category)
      ); // Deselect
    } else {
      setSelectedCategories([...selectedCategories, category]); // Select
    }
  };

  // Function to handle file selection
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files); // Convert FileList to array
    if (selectedFiles.length + files.length > 5) {
      setFileError("You can upload a maximum of 5 files."); // Show error if more than 5 files
      return;
    }
    setFileError(""); // Clear error
    setFiles([...files, ...selectedFiles]); // Add new files to the state
  };

  // Function to handle file removal
  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index); // Remove file at the specified index
    setFiles(updatedFiles);
  };

  // Function to handle card click
  const handleCardClick = (status) => {
    if (status === "New") {
      setShowLogCreation(true); // Open LogCreation popup
    } else {
      alert(`Card status: ${status}`);
    }
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle form submission
  const handleCreate = () => {
    const problemTitle = document.querySelector(
      "input[placeholder='Enter the problem']"
    ).value;
    const description = contentEditableRef.current.innerText;
    const questions = Array.from(
      document.querySelectorAll("input[placeholder='Type your answer']")
    ).map((input) => input.value);

    const formData = {
      problemTitle,
      description,
      questions,
      selectedCategories,
      files,
    };

    console.log("Form Data:", formData); // Replace with actual submission logic
    alert("Form submitted successfully!");
  };

  const categories = [
    "Productivity failure",
    "Mismanagement",
    "Time Management",
    "Communication Issues",
  ];

  // Scroll to bottom when cardData changes
  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  }, [cardData]);

  return (
    <div
      className={`min-h-screen bg-gray-50 ${
        showLogCreation ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      {/* Overlay when popup is active */}
      {showLogCreation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}
      <div className="flex flex-col lg:flex-row h-screen justify-between w-full bg-white p-6 border-b border-[#D3E4FF]">
        {/* Left side - Log creation form */}
        <div className="w-full lg:w-3/5 p-2 overflow-y-auto scrollbar-hide">
          <div className="flex items-center mb-6">
            <button className="text-gray-500 mr-3" onClick={() => setShowLogCreation(false)}>
              <IoArrowBack />
            </button>
            <h2 className="text-lg font-medium">Log creation</h2>
          </div>

          {/* Category */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                    selectedCategories.includes(category)
                      ? "bg-[#FF7622] text-white border-[#FF7622]" // Selected state
                      : "bg-white text-[#5E5E5E] border-[#FF7622]" // Unselected state
                  }`}
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Add New Button (Full Width) */}
            <button className="w-full mt-4 px-3 py-2 text-sm rounded-md border border-[#FF7622] text-[#FF7622] flex items-center justify-center">
              <IoAdd className="mr-1" /> Add New
            </button>
          </div>

          {/* Problem Title */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Problem Title</h3>
            <input
              type="text"
              placeholder="Enter the problem"
              className="w-full p-3 bg-gray-100 rounded-md border-none outline-none"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Description</h3>
            <div
              ref={contentEditableRef}
              contentEditable
              placeholder="Describe the issue..."
              className="w-full p-3 bg-gray-100 rounded-md border-none outline-none min-h-[100px] mb-2"
            ></div>
            <div className="flex gap-2 text-gray-500">
              <button onClick={() => applyFormatting("bold")}>
                <BiBold />
              </button>
              <button onClick={() => applyFormatting("italic")}>
                <BiItalic />
              </button>
              <button onClick={() => applyFormatting("underline")}>
                <BiUnderline />
              </button>
              <button onClick={() => applyFormatting("insertOrderedList")}>
                <BiListOl />
              </button>
              <button onClick={() => applyFormatting("insertUnorderedList")}>
                <BiListUl />
              </button>
              <button
                onClick={() => {
                  const url = prompt("Enter the URL:");
                  if (url) applyFormatting("createLink", url);
                }}
              >
                <BiLink />
              </button>
            </div>
          </div>

          {/* Media Upload */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-1">Media Upload</h3>
            <p className="text-xs text-gray-500 mb-3">
              Add your documents here, and you can upload up to 5 files max
            </p>
            <div className="border border-dashed border-orange-300 rounded-md p-8 flex flex-col items-center justify-center">
              {/* Display Uploaded Images */}
              {files.length > 0 ? (
                <div className="grid grid-cols-3 gap-4 w-full">
                  {files.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)} // Display the image
                        alt={`Uploaded file ${index + 1}`}
                        className="w-full h-24 object-cover rounded-md"
                      />
                      <button
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
                        onClick={() => handleRemoveFile(index)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="bg-orange-100 p-3 rounded-full text-orange-500 mb-3">
                    <FiUpload size={24} />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    Drag your file(s) to start uploading
                  </p>
                  <p className="text-xs text-gray-500 mb-3">OR</p>

                  {/* File Input */}
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    multiple // Allow multiple files
                    onChange={handleFileChange} // Handle file selection
                  />
                  <label
                    htmlFor="file-upload"
                    className="px-4 py-2 border border-orange-500 text-orange-500 rounded-md text-sm cursor-pointer"
                  >
                    Browse files
                  </label>
                </>
              )}
              {fileError && <p className="text-red-500 text-xs mt-2">{fileError}</p>}
            </div>
          </div>

          {/* Questions */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Questions</h3>
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="mb-4">
                <p className="text-sm mb-2">
                  {num}. Have you solved this problem?
                </p>
                <input
                  type="text"
                  placeholder="Type your answer"
                  className="w-full p-3 bg-gray-100 rounded-md border-none outline-none"
                />
              </div>
            ))}
          </div>

          {/* Create button */}
          <div className="bottom-6 bg-white pt-1 pb-20">
            <button
              className="w-full py-3 bg-orange-500 text-white rounded-md font-medium"
              onClick={handleCreate}
            >
              Create
            </button>
          </div>
        </div>

        {/* Right side - Search and Cards */}
        <div className="w-full lg:w-1/3 flex flex-col h-screen">
          {/* Sticky Search Bar */}
          <div className="sticky top-0 bg-white z-10 p-4">
            <Input
              type="text"
              placeholder="Search any problem"
              icon={<IoSearchOutline className="text-gray-400" />}
              value={searchQuery}
              onChange={handleSearchChange}
              className="rounded-full pl-10 border-gray-300 focus:ring-2 focus:ring-[#FF7622]"
            />
          </div>

          {/* Scrollable Cards Container */}
          <div
            ref={scrollableRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide"
          >
            {filteredCards.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                status={card.status}
                description={card.description}
                date={card.date}
                author={card.author}
                imageUrl={card.imageUrl}
                onClick={() => handleCardClick(card.status)} // Handle card click
              />
            ))}
          </div>
        </div>
      </div>

      {/* LogCreation Popup */}
      {showLogCreation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="bg-white p-6 rounded-md shadow-md w-1/2 max-h-[90vh] overflow-y-auto">
            <LogCreation onClose={() => setShowLogCreation(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;