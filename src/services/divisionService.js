const DivisionRepository = require('../repositories/divisionRepository')

const DivisionService = {
    getAllDivision: async () => {
        const division = await DivisionRepository.getAllDivision();
        return division;
    },

    getAllUnit: async () => {
        const unit = await DivisionRepository.getAllUnit();
        return unit
    },

    getById: async (id) => {
        const division = await DivisionRepository.getById(id);
        if (!division) throw new Error("Division Not Found");
        return division;
    },

    createDivision: async (name) => {
        const division = await DivisionRepository.create(name);
        return division;
    },

    updateDivision: async (id, name) => {
        const division = await DivisionRepository.getById(id)
        if (!division) throw new Error("Division Not Found");
        return await DivisionRepository.update(id, name)
    },

    deleteDivision: async (id) => {
        const division = await DivisionRepository.getById(id)
        if (!division) throw new Error("Division Not Found");
        return await DivisionRepository.delete(id)
    }
}

module.exports = DivisionService