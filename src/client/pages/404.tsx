export default function Custom404() {
    return (
        <div className="flex min-h-[80vh] items-center justify-center p-7 text-center font-sans">
            <div>
                <h1 className="mb-4 px-[50px] text-[100px] font-bold leading-[0.7] text-[#343a40]">
                    404
                </h1>
                <h5 className="tx-sm-24 tx-normal font-normalleading-[1.2] mb-2 text-[24px] text-[#868ba1]">
                    Mohon maaf, halaman yang dicari tidak ditemukan.
                </h5>
                <p className="mb-[50px] text-[#868ba1]">
                    Silahkan kembali ke halaman sebelumnya. Terima kasih
                </p>
                <p className="mb-[50px] text-[#868ba1]">
                    <a
                        href="./"
                        style={{
                            transition:
                                'color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
                        }}
                    >
                        Kembali ke Dashboard
                    </a>
                </p>
            </div>
        </div>
    );
}
