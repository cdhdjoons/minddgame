import Image from "next/image";
import Link from "next/link";

export default function Games() {
    return (
        <div className=" w-full h-full">
            <div className=" w-full h-full max-w-[500px] relative flex flex-col justify-evenly bg-cover bg-no-repeat " >
                <iframe
                    src="/game/index.html" // public 폴더에 있는 게임 파일 경로
                    className="w-full h-full "
                    title="Game"
                />
            </div>
        </div>
    );
}