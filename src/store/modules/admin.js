

const admin = {
    state: {
        tagsList: []
    },

    mutations:{
        setTagsList(state,tagsList){
            state.tagsList = tagsList
        }
    },

    getters: {
        tagsList(state){
            return state.tagsList
        }
    }

}

export default admin
