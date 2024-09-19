import clsx from 'clsx'
import React from 'react'

const ModalWrapper = ({
  children,
  onClose,
  contentMaxWidth = 'max-w-lg',
  closeButton = 'right',
  position = 'center',
}) => {
  return (
    <div
      id="modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0"
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div
        className={clsx(
          `animate-modal relative mt-10 flex w-full gap-4 ${contentMaxWidth}`,
          {
            'mx-auto': position == 'center',
            'ml-auto': position == 'right',
          },
        )}
      >
        {/* Modal content  */}
        <button
          type="button"
          onClick={onClose}
          className={clsx(
            `absolute -top-10 right-0 ms-auto inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm text-gray-400 hover:text-gray-900 sm:static`,
            {
              'order-2': closeButton == 'right',
            },
          )}
          data-modal-hide="modal"
        >
          <svg
            className="h-3 w-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        {children}
      </div>
    </div>
  )
}

export default ModalWrapper
