const ConfirmationModal = ({ showModal, setShowModal, handleDelete, title }) => {
    if (!showModal) return null; // Don't render the modal if it's not visible
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white shadow-lg rounded-lg w-[350px] h-[200px] p-6 relative">
          <h2 className="text-xl font-semibold mb-4">Are you sure you want to delete this {title}?</h2>
          <div className="flex justify-center mt-10 gap-10">
            <button
              onClick={handleDelete} // Handle the delete action
              className="text-white  bg-red-600 p-3 hover:bg-red-800  rounded-md"
            >
              Delete
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="text-white bg-purple-800 hover:bg-purple-950 p-3 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmationModal;
  