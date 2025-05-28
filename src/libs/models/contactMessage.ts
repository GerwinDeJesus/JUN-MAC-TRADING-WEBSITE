import mongoose, { Schema, model, models } from "mongoose";

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true });

const ContactMessage = models.ContactMessage || model("ContactMessage", contactSchema);

export default ContactMessage;
