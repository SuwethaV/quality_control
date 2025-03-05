import { Plus } from "lucide-react"

const Header = ({ username }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl text-gray-600 font-normal">Welcome {username}. .</h1>
      <button className="flex items-center gap-2 text-gray-600">
        Create log
        <div className="bg-orange-500 text-white p-2 rounded-md">
          <Plus className="h-5 w-5" />
        </div>
      </button>
    </div>
  )
}

export default Header

