const roleCheck = async(role) => {
    switch (role) {
        case "admin":
        	return
        case "seller":
        	return
        default:
            throw new Error(`unknown role '${role}'`)
    }
}

export { roleCheck }
