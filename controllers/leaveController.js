import leaveModel from "../models/leaveModel.js";

const addLeave = async (req, res) => {
  const { color, fromDate, toDate } = req.body;
  const email = req.email;
  try {
      // List of required fields
      const requiredFields = ["email", "color", "fromDate", "toDate" ];
      const missingFields = requiredFields.filter(field => !req.body[field]);
      if (missingFields.length > 0) {
        return res.status(400).json({ 
          error: "All fields are required.", 
          missingFields
        });
      }

    const newLeave = new leaveModel({email, color, fromDate, toDate});
    const response = await newLeave.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

const getAllLeaves = async (req, res) => {
  try {
    const allLeaves = await leaveModel.find();
    
    if (!allLeaves || allLeaves.length === 0) {
      return res.status(404).json({ 
        message: "No leave records found."
      });
    }

    res.status(200).json(allLeaves);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};



export {
addLeave,
getAllLeaves,
};
