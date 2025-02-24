import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EditableTable = ({ categories, getAllCategory }) => {
    const [readOnly, setReadOnly] = useState(null); 
    const [editedValues, setEditedValues] = useState({}); 
    const handleInputChange = (id, value) => {
        setEditedValues((prev) => ({ ...prev, [id]: value }));
    };

    const handleSaveClick = async (id) => {
        try {
            console.log(editedValues);
            const updatedName = editedValues[id] || categories.find((item) => item._id === id)?.name;

            const { data } = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/v1/category/update-category/${id}`,
                { name: updatedName }
            );

            if (data.success) {
                toast.success(data.message);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Error in server");
        }

        setReadOnly(null);
    };

    const handleDeleteClick = async (id) => {
        try {
            const { data } = await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/v1/category/delete-category/${id}`
            );

            if (data.success) {
                toast.success(data.message);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Error deleting category");
        }
    };

    return (
        <table className="w-[30rem] border border-gray-300 rounded-lg shadow-sm">
            <thead>
                <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">No.</th>
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
                {categories?.map((item, index) => {
                    const isEditing = readOnly === item._id;
                    return (
                        <tr key={item._id} className="border-b border-gray-300 transition duration-200">
                            <td className="py-3 px-6 text-left">{index + 1}</td>
                            <td className="py-3 px-6 text-left">
                                <input
                                    type="text"
                                    value={isEditing ? editedValues[item._id] ?? item.name : item.name}
                                    readOnly={!isEditing}
                                    onChange={(e) => handleInputChange(item._id, e.target.value)}
                                    className={`${
                                        isEditing
                                            ? "w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 transition duration-300 focus:outline-none"
                                            : "cursor-context-menu focus:outline-none"
                                    }`}
                                />
                            </td>
                            <td className="py-3 px-6 text-center">
                                <div className="flex items-center justify-center gap-3">
                                    {isEditing ? (
                                        <button
                                            onClick={() => handleSaveClick(item._id)}
                                            className="bg-green-500 text-white px-3 py-1.5 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setReadOnly(item._id);
                                                setEditedValues((prev) => ({
                                                    ...prev,
                                                    [item._id]: item.name,
                                                }));
                                            }}
                                            className="bg-yellow-500 text-white px-3 py-1.5 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
                                        >
                                            Edit
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDeleteClick(item._id)}
                                        className="bg-red-500 text-white px-3 py-1.5 rounded-lg shadow-md hover:bg-red-600 transition duration-300 cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default EditableTable;
