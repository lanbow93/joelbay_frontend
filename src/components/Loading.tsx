import Typewriter from 'typewriter-effect'
import { loadingStrings } from '../utils/jsonDetails.json'
function Loading() {
    return (
        <div className="loading">
            <Typewriter
                options={{
                    strings: loadingStrings,
                    autoStart: true,
                    loop: true,
                    delay: 20,
                    deleteSpeed: 20,
                }}
            />
        </div>
    )
}

export default Loading
