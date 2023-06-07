import * as Yup from 'yup';
import moment from 'moment';

// Defining User Registration Schema for form validation
const registerSchema = Yup.object({
    userName: Yup.string()
        .min(5)
        .max(25)
        .required('Please enter user name here.'),
    email: Yup.string().email().required('Please enter email here.'),
    password: Yup.string()
        .min(8)
        .required()
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            'Password must contain at least 8 characters, one uppercase, one number and one special case character'
        ),
    confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref('password'), null], 'Passwords must matched'),

    role: Yup.string(),
    yearOfExperience: Yup.number().when('role', {
        is: (val) => val === 'photographer' || val === 'caterer',
        then: () =>
            Yup.number()
            .min(1)
            .max(10)
            .required('year of experience is required for photographer or caterer'),
        otherwise: () => Yup.number().notRequired(),
    }),

    serviceCharges: Yup.number().when('role', {
        is: (val) => val === 'photographer' || val === 'caterer',
        then: () =>
            Yup.number()
            .min(10000)
            .max(100000)
            .required('service Charges is required for photographer or caterer'),
        otherwise: () => Yup.number().notRequired(),
    }),
});

// Defining User Updation Schema for form validation
const updateUserSchema = Yup.object({
    userName: Yup.string()
        .min(5)
        .max(25)
        .required('Please enter user name here.'),
    email: Yup.string().email().required('Please enter email here.'),
    role: Yup.string().required('Role is required'),
    yearOfExperience: Yup.number().when('role', {
        is: (val) => val === 'photographer' || val === 'caterer',
        then: () =>
            Yup.number()
            .min(1)
            .max(20)
            .required('year of experience is required for photographer or caterer'),
        otherwise: () => Yup.number().notRequired(),
    }),

    serviceCharges: Yup.number().when('role', {
        is: (val) => val === 'photographer' || val === 'caterer',
        then: () =>
            Yup.number()
            .min(10000)
            .max(100000)
            .required('service Charges is required for photographer or caterer'),
        otherwise: () => Yup.number().notRequired(),
    }),
});

// Defining User Login Schema for form validation
const loginSchema = Yup.object({
    email: Yup.string().email().required('Please enter email here.'),
    password: Yup.string()
        .min(8)
        .required()
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            'Password must contain at least 8 characters, one uppercase, one number and one special case character'
        ),
});

// Defining Booking Schema for form validation
const today = new Date();
today.setHours(23, 59, 59, 999);
const bookingSchema = Yup.object({
    date: Yup.date()
        .typeError('Date is Required')
        .min(moment().startOf('day').toDate(), 'Date must be tomorrow or later'),
    timeSlot: Yup.number().min(1, 'Please choose Timeslot').max(2).required(),
    dealId: Yup.number().min(1, 'Please choose atleast one deal').required(),
    noPersons: Yup.number()
        .min(50)
        .max(500)
        .required('Minimum of 50 persons and maximum of 500 persons are allowed'),
    themeColor: Yup.string().required(
        'Please choose from available theme colors'
    ),
    photographer: Yup.string(),
    caterer: Yup.string(),
});

// Defining Contact Us schema for form validation
const contactUsSchema = Yup.object({
    name: Yup.string().min(5).max(25).required('Please enter user name here.'),
    email: Yup.string().email().required('Please enter email here.'),
    query: Yup.string().min(10).max(200).required('Please enter your query.'),
});

// Defining Deal Schema
const dealsSchema = Yup.object({
    dealName: Yup.string().min(5).max(25).required('Please enter deal name'),
    dealPrice: Yup.number()
        .min(1000)
        .max(10000)
        .required('Deal price is required'),
    dealItems: Yup.array().required('Deal Items are required.'),
});
export {
    registerSchema,
    loginSchema,
    bookingSchema,
    contactUsSchema,
    updateUserSchema,
    dealsSchema,
};