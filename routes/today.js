const customer = require('../schema/custModel'); 

const StartFunc = async (req, res) => {
    try {
        // Get the current date and set the time to the start of the day (00:00:00)
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        // Get the current date and set the time to the end of the day (23:59:59)
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // Find customers created today
        const customers = await customer.find({
            updatedAt: {
                $gte: startOfDay,
                $lt: endOfDay
            }
        });

        return res.status(200).send(customers);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
}

module.exports = StartFunc;
