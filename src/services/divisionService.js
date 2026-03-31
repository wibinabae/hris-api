const DivisionRepository = require('../repositories/divisionRepository')

const DivisionService ={
    getAllDivision: async()=>{
        const division = await DivisionRepository.getAllDivision();
        return division;
    },

    getAllUnit: async()=>{
        const unit = await DivisionRepository.getAllUnit();
        return unit
    }
}

module.exports = DivisionService