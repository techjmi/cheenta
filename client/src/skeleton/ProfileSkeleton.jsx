const ProfileSkeleton = () => {
    return (
      <div className="max-w-4xl mx-auto text-center py-6 animate-pulse">
        <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto"></div>
        <div className="h-6 w-40 bg-gray-300 rounded mx-auto mt-4"></div>
        <div className="h-4 w-32 bg-gray-300 rounded mx-auto mt-2"></div>
        <div className="h-4 w-48 bg-gray-300 rounded mx-auto mt-2"></div>
  
        <div className="flex gap-4 justify-center mt-4">
          <div className="h-10 w-32 bg-gray-300 rounded"></div>
          <div className="h-10 w-32 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  };
  
  export default ProfileSkeleton;
  