const { mongoose } = require("mongoose");

const UserSchema = mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    domains: {
        type: [String], 
        default : ['ul.vardhan.works']
    },
    password: {
        type: String,
        required: true,
    },
    profilePhoto: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    },
    role: {
        type: String,
        default: 'user'
    },
}, { timestamps: true }
);

const User = mongoose.model('user', UserSchema)
module.exports = User