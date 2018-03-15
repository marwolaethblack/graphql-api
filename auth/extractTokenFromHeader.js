module. exports = (context) => {
    const authHeader = context.request.headers.authorization;
    if(authHeader) {
        return authHeader.replace("Bearer ", "");
    } else {
        throw new Error("No Authorization header");
    }

}