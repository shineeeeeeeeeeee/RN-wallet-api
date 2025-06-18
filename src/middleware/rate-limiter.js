import ratelimit from "../config/upstash.js";

const ratelimiter = async(req, res, next) => {
    try {
        // in prod -> userID, IP address
        const {success} = await ratelimit.limit("my-rate-limit");

        if(!success){
            return res.status(429).json({message: "Please try again later. Too many requests!"
            })
        }

        next();
    } catch (error) {
        console.log("Rate limit error: ",error);
        next(error);
    }
}

export default ratelimiter;