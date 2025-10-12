import mongoose from "mongoose";

const ShoesSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['MEN', 'WOMEN', 'KIDS', 'UNISEX']
    },
    category: {
        type: String,
        required: true
    },
    maincategory: {
        type: String,
        required: true
    },
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number,
        required: true
    },
    is_in_inventory: {
        type: Boolean,
        default: true
    },
    items_left: {
        type: Number,
        required: true,
        min: 0
    },
    imageURL: {
        type: String,
        required: true
    },
    imageURL2: {
        type: String,
        required: false
    },
    imageURL3: {
        type: String,
        required: false
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    sizes: {
        type: [String],
        required: true,
        validate: {
            validator: function(v) {
                return v.length > 0;
            },
            message: 'At least one size must be provided'
        }
    },
    colors: {
        type: [{
            name: {
                type: String,
                required: true
            },
            images: {
                type: [String],
                required: true,
                validate: {
                    validator: function(v) {
                        return v.length > 0;
                    },
                    message: 'At least one image must be provided for each color'
                }
            }
        }],
        required: true,
        validate: {
            validator: function(v) {
                return v.length > 0;
            },
            message: 'At least one color must be provided'
        }
    }
}, {
    timestamps: true,
    collection: 'Shoesdata'
});

const Shoes_schema = mongoose.model('Shoesdata', ShoesSchema);

export default Shoes_schema;