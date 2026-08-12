async function errorHandler(err, req, res, next){
    console.error(err);

    if (err.code === "P2002"){
        return res.status(409).json({ message: "Username already exists."});
    }else if (err.code === "P2025"){
        return res.status(404).json({ message: "User profile not found." });
    }else{
        return res.status(500).json({ 
            message: "Something went wrong.",
            ...(process.env.NODE_ENV !== "production" && { error: err.message })
        });
    }
}

export default errorHandler;