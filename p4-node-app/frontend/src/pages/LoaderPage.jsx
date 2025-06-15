const LoaderPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-white/10">
            <div className="flex items-center justify-center bg-white/70 px-2 pr-5 py-1 rounded-full">
                <img
                    src="/images/loader/loader-wheel.webp"
                    alt="Loading..."
                    className="w-20 h-20 animate-spin m-2"
                />
                <p className="text-[#990000] text-2xl font-bold">Loading...</p>
            </div>
        </div>
    );
}

export default LoaderPage

