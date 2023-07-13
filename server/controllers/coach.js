import Coach from "../models/coach.js";

export const addCoach = async (req , res) =>{
    const {  name,email , mobile , spec } = req.body;

  try {
    const newCoach = new Coach({
      
      name,
      email,
      mobile,
      spec
    });
    const existingCoach = await Coach.findOne({name});
    if(existingCoach){
        return res.status(404).json({message : "Your details already exist"})
    }else {
        await newCoach.save();
        res.json(newCoach);

    }
    
  } catch (error) {
    console.error('Failed to add details:', error);
    res.status(500).json({ error: 'Failed to create class' });
  }
}

export const getCoaches = async (req , res) =>{

  try {
    const coachList = await Coach.find();
    res.status(200).json(coachList)
  } catch (error) {
    console.log(error);
    res.status(404).json({message : error.message})
  }

}

export const updateTrainer = async (req,res) =>{
  const { id } = req.params;
  const { name, email, mobile, spec } = req.body;

  try {
    const coach = await Coach.findByIdAndUpdate(
      id,
      { name, email, mobile, spec },
      { new: true }
    );

    if (!coach) {
      return res.status(404).json({ error: 'Coach not found' });
    }

    res.json(coach);
  } catch (error) {
    console.error('Failed to update coach details:', error);
    res.status(500).json({ error: 'Failed to update coach details' });
  }
}


export const deleteTrainer = async (req, res) => {
  const { coachId } = req.params;

  try {
    await Coach.findByIdAndDelete(coachId);
    res.json({ message: 'Trainer deleted successfully' });
  } catch (error) {
    console.error('Failed to delete trainer:', error);
    res.status(500).json({ error: 'Failed to delete trainer' });
  }
};