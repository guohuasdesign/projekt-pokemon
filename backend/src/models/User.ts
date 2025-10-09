import { Schema, model } from 'mongoose';

const userSchema = new Schema(
	{
		firstName: { type: String, required: [true, 'First name is required'] },
		lastName: { type: String, required: [true, 'last name is required'] },
		email: {
			type: String,
			required: [true, 'Email is required'],
			unique: true,
			lowercase: true
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
			select: false
		}
	},
	{ timestamps: true }
);

export default model('User', userSchema);