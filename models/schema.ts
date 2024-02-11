import mongoose, {Schema , model} from 'mongoose';

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    blockChainAddress: {type: String, required: true},    
});


const User = mongoose.models.User ||  model('User', userSchema);
export default User;
