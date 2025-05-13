export const Loading = () => {
    return (
       <div className="flex items-center justify-center min-h-screen bg-[#121520]">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#10cfc9] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#10cfc9] text-lg font-medium">Loading...</p>
      </div>
    </div>
    );
};