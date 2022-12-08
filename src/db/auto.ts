import { Schema, model, Types } from "mongoose";

interface IAuto {
  status: string;
  brand: string;
  name: string;
  prodDate: Date;
  price: number;
  oldVersions?: Array<Types.ObjectId>;
}

const autoSchema = new Schema<IAuto>({
  status: {
    type: String,
    required: true,
    enum: ["actual", "deprecated"],
    default: "actual",
  },
  brand: { type: String, required: true },
  name: { type: String, required: true },
  prodDate: { type: Date, required: true },
  price: { type: Number, required: true },
  oldVersions: [{ type: Schema.Types.ObjectId, ref: "Auto" }],
});

const Auto = model<IAuto>("Auto", autoSchema);

export { Auto };
