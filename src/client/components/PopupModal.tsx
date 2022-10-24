import React, {
   FC,
   useEffect,
   useState,
   Component,
   PropsWithChildren,
} from 'react';

interface OwnProps {
   show: boolean;
   toggleShow: () => unknown;
   successEvent: () => unknown;
}

const PopupModal: FC<PropsWithChildren<OwnProps>> = ({
   show,
   toggleShow,
   successEvent,
}) => {
   return (
      <>
         <label className={`modal ${show ? 'modal-open' : ''} cursor-pointer`}>
            <label className="modal-box relative">
               <h3 className="text-lg font-bold">
                  Apakah kamu yakin ingin menyelesaikan ujian?
               </h3>
               <p className="py-4">
                  Jika kamu ingin menyelesaikan ujian dan melihat hasil silahkan klik tombol selesai, jika belum yakin silakan klik batal.
               </p>
               <div className="flex justify-end">
                  <button className="btn btn-warning mr-4" onClick={toggleShow}>
                     Batal
                  </button>
                  <button className="btn btn-success" onClick={successEvent}>
                     Selesai
                  </button>
               </div>
            </label>
         </label>
      </>
   );
};

export default PopupModal;
