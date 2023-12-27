import Link from 'next/link';

const NoUrlFound = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center p-4 text-white bg-gray-900 min-h-[86vh] ">
            <p className="text-white">No URLs found</p>
            <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mt-4">
                Create one
            </Link>
        </div>
    );
};

export default NoUrlFound;
