function errHasSensitiveInfo(err) {
    console.log(err, "100");
    console.log(err.toString(), "101");
    // If err contains sensitive info, make it into a generic string for user!
    if (typeof err === 'string' || err instanceof String) {
        return err
    }
    return "The error had sensitive information in it. But something went wrong, sorry you guys!"
}

export {
    errHasSensitiveInfo
}