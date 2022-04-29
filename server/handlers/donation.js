const { db } = require("../util/admin");

exports.donation = async (req, res) => {
    const donationRef = db.collection('Doacao');
    try{
            donationRef.get().then((snapshot) => {
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