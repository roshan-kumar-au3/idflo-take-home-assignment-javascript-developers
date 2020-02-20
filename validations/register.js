const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validateRegisterInput = data => {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.city = !isEmpty(data.city) ? data.city : "";
    data.country = !isEmpty(data.country) ? data.country : "";
    data.dateOfBirth = !isEmpty(data.dateOfBirth) ? data.dateOfBirth : "";
    if (
        !Validator.isLength(data.name, {
            min: 2,
            max: 30
        })
    ) {
        errors.name = "Name Must be between 2 and 30 character";
    }
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name is required";
    }
    // if (
    //     !Validator.equals(data.accountType, "Partner") &&
    //     !Validator.equals(data.accountType, "Customer")
    // ) {
    //     errors.accountType = "Account Type must be 'Partner' or 'Customer'";
    // }
    // if (Validator.isEmpty(data.accountType)) {
    //     errors.accountType = "Account Type is required";
    // }
    // if (
    //     !Validator.isLength(data.password, {
    //         min: 6,
    //         max: 20
    //     })
    // ) {
    //     errors.password = "password Must be between 6 and 20 character";
    // }
    // if (Validator.isEmpty(data.password)) {
    //     errors.password = "Password is required";
    // }
    // if (!Validator.equals(data.password, data.confirmPassword)) {
    //     errors.confirmPassword = "Both password should be same";
    // }
    // if (Validator.isEmpty(data.confirmPassword)) {
    //     errors.confirmPassword = "Confirm password is required";
    // }
    // if (!Validator.isEmail(data.email)) {
    //     errors.email = "Invalid email";
    // }
    // if (Validator.isEmpty(data.email)) {
    //     errors.email = "Email is required";
    // }
    // if (!Validator.isEmpty(data.phoneNumber)) {
    //   if (
    //     !Validator.isMobilePhone(data.phoneNumber) ||
    //     !Validator.isLength(data.phoneNumber, {
    //       min: 10,
    //       max: 10
    //     })
    //   ) {
    //     errors.phoneNumber = "Invalid Phone number";
    //   }
    // }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
