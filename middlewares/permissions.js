const booksCRUDPermission = async(req, res, next) => {
    console.log("res.locals.user", res.locals.user);
    if (res.locals.user) {
        if (res.locals.user.rule !== 3) {
            // which mean it's not a customer
            next();
        } else {
            res.render("notAllowed");
        }
    } else {
        res.render("notAllowed");
    }
};


const usersCRUDPermission = async(req, res, next) => {
    if (res.locals.user) {
        if (res.locals.user.rule == 1) {
            // which mean it's a manager
            next();
        } else {
            res.render("notAllowed");
        }
    } else {
        res.render("notAllowed");
    }
};


const SalesStaticticsPermission = async(req, res, next) => {
    if (res.locals.user) {
        if (res.locals.user.rule == 1) {
            // which mean it's a manager
            next();
        } else {
            res.render("notAllowed");
        }
    } else {
        res.render("notAllowed");
    }
};


export { booksCRUDPermission, usersCRUDPermission, SalesStaticticsPermission };