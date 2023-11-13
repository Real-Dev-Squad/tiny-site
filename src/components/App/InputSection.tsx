import { ChangeEvent } from 'react';

import Button from '@/components/Button';
import InputBox from '@/components/InputBox';

interface InputSectionProps {
    url: string;
    setUrl: (url: string) => void;
    handleUrl: () => void;
}

const InputSection: React.FC<InputSectionProps> = ({ url, setUrl, handleUrl }) => (
    <div className="flex flex-col justify-center items-center rounded-2xl mt-5 sm:mt-10 w-[100%] text-gray-400">
        <h1 className="text-3xl md:text-4xl xl:text-4xl text-center mb-8 text-white font-semibold">
            Enter a URL to shorten
        </h1>

        <div className="bg-gray-200 flex flex-row justify-center items-center space-y-0 space-x-0 rounded-2xl mt-5 sm:mt-10 w-[100%]">
            <p className="ml-2">🔗</p>
            <InputBox
                type="text"
                hideLabel={true}
                className="bg-gray-200 text-black w-full outline-none p-4 rounded-l-2xl"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
                value={url}
                placeholder="Enter the URL"
                name="URL"
            />
            <Button
                className="bg-gray-300 text-black text-lg rounded-r-2xl py-4 px-8 hover:bg-gray-400"
                onClick={handleUrl}
            >
                Shorten
            </Button>
        </div>
    </div>
);

export default InputSection;
