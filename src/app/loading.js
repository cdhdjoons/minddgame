import Image from "next/image";
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {

    return (
        <div className=" w-full h-full">
            <div className=" w-full h-full max-w-[500px] pt-3 relative flex flex-col justify-center items-center bg-cover bg-no-repeat " >
                <div className="w-[200px] aspect-[200/200] flex justify-center items-center relative">
                    <CircularProgress color="secondary" />
                </div>
            </div>
        </div>
    );
}
