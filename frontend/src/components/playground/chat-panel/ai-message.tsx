export const AIMessage = () => {
  return (
    <>
      <div className="w-full flex items-start space-x-4 mb-4">
        <div className="w-8 h-8 rounded-full flex-shrink-0 border-2 border-primary bg-gradient-to-br backdrop-blur-lg from-purple-600 via-indigo-500 to-white-500 mt-2" />
        <div className="bg-surface text-surface-900 rounded-xl p-3 max-w-full">
          <small className="text-sm xl:text-md break-words">
            Hey, my name is bot and I am more than pleased to help you solve
            this problem. What do you need help with?
          </small>
        </div>
      </div>
    </>
  );
};
