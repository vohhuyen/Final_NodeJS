import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    city:{
        type: String,
        require: true
    },
    address:{
        type: String,
        require: true
    },
    distance:{
        type: String,
        require: true
    },
    photo:{
        type:[String],
        require: true
    },
    title:{
        type:String,
        require: true
    },
    desc:{
        type: String,
        require: true
    },
    rating:{
        type: Number,
        min: 0,
        max: 5
    },
    rooms:{
        type: [String],
    },
    cheapestPrice:{
        type: Number,
        require: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
},{timestamps:true}
);

export default mongoose.model("User", UserSchema)