const Customer = require("../../schema/JS/custModel");

const StartFunc = async (request, response) => {
    try {
        const data = request.body;
        const custPk = request.params.pk;

        const updateData = {
            $push: {
                "activities.nurseryCount":  { $each: data }
            }
        };

        const customerData = await Customer.findOneAndUpdate(
            { pk: custPk }, 
            updateData, 
            { new: true }
        );

        if (!customerData) {
            return response.status(404).json({ message: "Customer not found" });
        }

        return response.status(200).json({ message: "Customer updated successfully", data: customerData });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: "An error occurred" });
    }
};

module.exports = StartFunc;
