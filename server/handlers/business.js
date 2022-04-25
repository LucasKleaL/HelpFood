const { db } = require("../util/admin");

exports.business = async (req, res) => {
    const businessRef = db.collection('Business');
    try{
            businessRef.get().then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
            console.log(data);
            return res.status(201).json(data);
        })
    } catch (error) {
        return res
        .status(500)
        .json({ general: "Algo deu errado, tente novamente"});          
    }
};