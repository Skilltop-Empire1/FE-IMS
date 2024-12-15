import React, { useState } from 'react';
import { Edit2Icon, Trash } from 'lucide-react';
import EditStoreModal from '../modals/EditStoreModal';
import { useDeleteStoreMutation, useUpdateStoreMutation } from '../../redux/APIs/storeApi';
import style from './storeComponentStyle.module.css';
import ConfirmationModal  from '../modals/ConfirmationModal';

const StoreDetail = ({ selectedStore, onClose }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteStore] = useDeleteStoreMutation();
  const [updateStore] = useUpdateStoreMutation();
  const [showModal, setShowModal] = useState(false);



  const handleDelete = () => {
    onDelete(selectedStore.id); // Call the delete function with the store ID
    setShowModal(false); // Close the modal after deletion
  };

  // Handle edit modal open/close
  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  // Handle delete store
  const handleDeleteStore = async () => {
    try {
      await deleteStore(selectedStore.storeId).unwrap();
      alert('Store deleted successfully')
      // console.log(`Store with ID: ${selectedStore.storeId} deleted successfully`);
      setShowModal(false); // Optionally close the detail view after deletion
      window.location.reload()
    } catch (error) {
      console.error("Failed to delete store:", error);
    }
  };

  // Handle store update
  const handleUpdateStore = async (updatedData) => {
    try {
      await updateStore({ id: selectedStore.storeId, updatedData }).unwrap();
      console.log(`Store with ID: ${selectedStore.storeId} updated successfully`);
      closeEditModal(); // Close modal after successful update
    } catch (error) {
      // console.error("Failed to update store:", error);
    }
  };

  return (
    <div className={`my-11  ${style.box}`}>
      {selectedStore ? (
        <div>
          <h3>{selectedStore.location}</h3>
          <div className={style.moreInfo}>
            <p>Name: {selectedStore.storeName}</p>
            <p>Employee: {selectedStore.noOfStaff}</p>
            <p>Manager: {selectedStore.storeManager}</p>
            <p>Contact: {selectedStore.storeContact}</p>
          </div>

          {/* Edit and Delete Icons */}
          <div className="flex gap-3 mt-3">
            <Edit2Icon className="text-blue-500 cursor-pointer" onClick={openEditModal} />
            <Trash className="text-red-500 cursor-pointer" onClick={()=> setShowModal(true)} />
          </div>

          {/* Edit Store Modal */}
          {isEditModalOpen && (
            <EditStoreModal
              store={selectedStore}
              onClose={closeEditModal}
              onUpdate={handleUpdateStore}
            />
          )}

           {/* Confirmation Modal for Deletion */}
           <ConfirmationModal
            showModal={showModal}
            setShowModal={setShowModal}
            handleDelete={handleDeleteStore}
            title="Store and any linked Categories and Products"
          />
        </div>
      ) : (
        <h3>No selected store</h3>
      )}
    </div>
  );
};

export default StoreDetail;
