
export default function Loader() {
    

    return (
        <>
            <div
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                style={{ pointerEvents: 'all' }} // Ensure pointer events are active while loading
                >
                    <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            </div>

        </>
    )
}
