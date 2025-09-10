import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true, 
      index: true 
    },
    amountCents: { 
      type: Number, 
      required: true, 
      min: [1, 'Amount must be at least 0.01'] 
    },
    type: { 
      type: String, 
      enum: ['credit', 'debit'], 
      required: true, 
      index: true 
    },
    status: {
      type: String,
      enum: ['Completed', 'Pending', 'Failed'],
      default: 'Pending',
      required: true,
      index: true
    },
    description: { 
      type: String, 
      trim: true, 
      maxlength: 240 
    },
    occurredAt: { 
      type: Date, 
      default: Date.now, 
      index: true 
    },
  },
  { timestamps: true }
);

transactionSchema.index({ user: 1, occurredAt: -1 });

export default mongoose.model('Transaction', transactionSchema);
