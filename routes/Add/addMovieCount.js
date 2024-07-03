const customer = require("../../schema/JS/custModel");

const StartFunc = async (request, response) => {
    try {
        const data = request.body;
        const custPk = request.params.pk;
        const updateData = {
            "activities.movieCount": data.movieCount,
        }
        const customerData = await customer.findOneAndUpdate({ pk: custPk }, updateData, { new: true });
        
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
