const customer = require("../schema/custModel");
const mongoose = require('mongoose');

const StartFunc = async (request, response) => {
    try {
        const data = request.body;
        const id = request.params.id;
        const updateData = {
            "activities.lunchCount": data.lunchCount
        }
        const customerData = await customer.findByIdAndUpdate(id, updateData, { new: true });
        
        if (!customerData) {
            return response.status(404).json({ message: "Customer not found" });
        } else {
            return response.status(200).json({ message: "Customer updated successfully", data: customerData });
        }

    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "An error occurred" });
    }
}

module.exports = StartFunc;
