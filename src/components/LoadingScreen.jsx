import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

export const LoadingScreen = ({ onComplete }) => {
    const [text, setText] = useState("");
    const fullText = "<Nino Pajarillo/>";

    useEffect(() => {
        let index = 0;

        const interval = setInterval(() => {
            setText((prevText) => {
                index = prevText.length + 1;
                if (index > fullText.length) {
                    clearInterval(interval);
                    setTimeout(onComplete, 1000); // Call onComplete after animation
                    return prevText;
                }
                return fullText.substring(0, index);
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-50 bg-black text-gray-100 flex flex-col items-center justify-center">
            <div className="mb-4 text-4xl font-mono font-bold">
                {text} <span className="animate-blink ml-1">|</span>
            </div>

            <div className="w-[800px] h-[200px] bg-gray-800 rounded relative overflow-hidden">
                <div className="w-[40%] h-full bg-blue-800 shadow-[0_0]_15px_#3b82f6 animate-loading-bar"></div>
            </div>
        </div>
    );
};

// ✅ Add PropTypes validation
LoadingScreen.propTypes = {
    onComplete: PropTypes.func.isRequired, // Ensure onComplete is a required function
};

export default LoadingScreen;
