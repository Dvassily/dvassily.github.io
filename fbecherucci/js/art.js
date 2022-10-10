{
    function initCategory(collection, target) {
        let table = $("#category-table");

        new NavTable(table, collection, target);
    }

    //TODO: Rename work
    function initSubcategory(collection, subcategoryKey, target) {
        let table = $("#works-table");
        let work = collection.find(p => p.key === subcategoryKey);

        if (work !== undefined) {
            new NavTable(table, work.content, target);
        }
    }

    //TODO: rename model
    function initModel(collection, subcategoryKey, workKey) {
        let fullSizeImage = $("img#model-fullsize");
        let modelTitle = $("div#model-title");
        let work = collection.find(c => c.key === subcategoryKey);

        //TODO: handle errors
        if (work !== undefined) {
            let model = work.content.find(w => w.key === workKey);

            fullSizeImage.attr("src", model.fullsize);
            modelTitle.text(model.title);
        }
    }
}
