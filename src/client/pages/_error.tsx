export default function CustomError() {
   return (
      <div className="font-sans flex min-h-[80vh] items-center justify-center p-7 text-center">
         <div>
            <h1 className="mb-4 py-0 px-[50px] text-[100px] font-bold leading-[0.7] text-[#343a40]">
               OPPS
            </h1>
            <h5 className="mb-2 text-[24px] font-normal leading-[1.2] text-[#868ba1]">
               Mohon maaf, halaman gagal dimuat.
            </h5>
            <p className="mb-[50px] text-[#868ba1]">
               Silahkan muat kembali halaman ini [F5]. Terima kasih
            </p>
         </div>
      </div>
   );
}
