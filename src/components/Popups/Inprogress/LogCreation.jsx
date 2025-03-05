import { useState } from "react"
import LogCreationCollapsed from "./LogCreationCollapsed"
import LogCreationExpanded from "./LogCreationExpanded"

const LogCreation = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleViewDetails = () => {
    setIsExpanded(true)
  }

  const handleCollapse = () => {
    setIsExpanded(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {isExpanded ? (
        <LogCreationExpanded onCollapse={handleCollapse} />
      ) : (
        <LogCreationCollapsed onViewDetails={handleViewDetails} />
      )}
    </div>
  )
}

export default LogCreation

