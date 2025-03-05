import { useState } from "react";
import { ArrowLeft, ChevronDown, Check } from "lucide-react";

const LogCreation = ({ onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false); // State to toggle between expanded and collapsed views

  const handleViewDetails = () => {
    setIsExpanded(!isExpanded); // Toggle the expanded state
  };

  return (
    <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto max-h-[90vh] overflow-y-auto hidden-scrollbar">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button className="text-gray-600 hover:text-gray-800" onClick={onClose}>
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-medium ml-4">Log creation</h1>
      </div>

      {/* Status */}
      <div className="space-y-4 mb-6">
        <h2 className="text-blue-500 font-medium">Problem submitted</h2>
        <p className="text-gray-600">
          Your problem is submitted. Waiting for the supervisor's approval
        </p>

        {/* View Details Button */}
        <button
          onClick={handleViewDetails}
          className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <span className="text-gray-600">View details</span>
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </button>
      </div>

      {/* Full Form (Conditionally Rendered) */}
      {isExpanded && (
        <div className="space-y-6">
          {/* Category */}
          <div>
            <h3 className="text-gray-700 font-medium mb-2">Category</h3>
            <span className="inline-block px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-sm">
              Productivity failure
            </span>
          </div>

          {/* Problem Title */}
          <div>
            <h3 className="text-gray-700 font-medium mb-2">Problem Title</h3>
            <p className="text-gray-600">Water leakage</p>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-gray-700 font-medium mb-2">Description</h3>
            <p className="text-gray-600">
              Unintended escape of water from pipes, fixtures, or structures,
              leading to potential damage and waste in AS block.
            </p>
          </div>

          {/* Media Upload */}
          <div>
            <h3 className="text-gray-700 font-medium mb-2">Media Upload</h3>
            <p className="text-gray-500 text-sm mb-3">
              Add your documents here, and you can upload up to 5 files max
            </p>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">phoenix-document.pdf</span>
              <div className="flex items-center">
                <span className="text-blue-500 mr-2">Upload complete</span>
                <div className="bg-green-500 rounded-full p-1">
                  <Check className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Questions */}
          <div>
            <h3 className="text-gray-700 font-medium mb-2">Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-gray-600 mb-2">
                  1. Have you solve this problem
                </h4>
                <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                  Yes, i try to solve the problem
                </p>
              </div>
            </div>
          </div>

          {/* Additional Questions Section */}
          <div className="space-y-4">
            {[3, 4, 5].map((num) => (
              <div key={num}>
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

          {/* Status Section */}
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Status</h3>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="Accepted"
                  className="mr-2"
                />
                <span className="text-sm">Accepted</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="Rejected"
                  className="mr-2"
                />
                <span className="text-sm">Rejected</span>
              </label>
            </div>
          </div>

          {/* Remarks Section */}
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Remarks</h3>
            <textarea
              placeholder="Your text goes here"
              className="w-full p-3 bg-gray-100 rounded-md border-none outline-none min-h-[100px]"
            />
          </div>

          {/* Buttons Section */}
          <div className="mt-6 flex justify-end gap-4">
            <button
              className="px-4 py-2 text-gray-600 rounded-md hover:bg-gray-100"
              onClick={onClose} // Close the popup and return to the dashboard
            >
              Back
            </button>
            <button
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
              onClick={() => alert("Saved!")}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogCreation;