// paintings
let paintings = [
    {
        "key" : "mymi",
        "preview" : "res/images/logo_preview.png",
        "title" : "Mymi",
        "content" : [
            {
                "key" : "mymi_0",
                "title" : "Mymi, technique, dimensions, année",
                "preview" : "res/images/mymi_preview.png",
                "fullsize" : "res/images/mymi_fullsize.png"
            }
        ]
    },
    {
        "key" : "puces",
        "preview" : "res/images/logo_preview.png",
        "title" : "Les puces"
    },
    {
        "key" : "paysages",
        "preview" : "res/images/logo_preview.png",
        "title" : "Paysages"
    },
    {
        "key" : "genre",
        "preview" : "res/images/logo_preview.png",
        "title" : "Scènes de genre"
    },
    {
        "key" : "autoportraits",
        "preview" : "res/images/logo_preview.png",
        "title" : "Autoportraits"
    },
    {
        "key" : "portraits",
        "preview" : "res/images/logo_preview.png",
        "title" : "Portraits"
    },
    {
        "key" : "selfies",
        "preview" : "res/images/logo_preview.png",
        "title" : "Selfies"
    }
];


// targets
let targets = [
    {
        "key" : "home",
        "navkey" : "menu",
        "view" : "inc/content/home.html",
        "shownavbar" : true,
        "init" : () => {
            initNews();
        },
        "content" : [
            {
                "key" : "paintings",
                "navkey" : "peinture",
                "view" : "inc/content/paintings.html",
                "init" : () => {
                    initCategory(paintings, "home/paintings");
                },
                "content" : [
                    {
                        "key" : "mymi",
                        "navkey" : "Mymi",
                        "view" : "inc/content/mymi.html",
                        "init" : () => {
                            //TODO: deduce from object
                            initSubcategory(paintings, "mymi", "home/paintings/mymi");
                        },
                        "content" : [
                            {
                                "key" : "mymi_0",
                                "navkey" : "Peinture",
                                "view" : "inc/content/painting.html",
                                "init" : () => {
                                    //TODO: deduce from object
                                    initModel(paintings, "mymi", "mymi_0")
                                }
                            }
                        ]
                    }
                ]
            },
            {
                "key" : "sculptures",
                "navkey" : "sculptures",
                "view" : "inc/content/sculptures.html"
            },
            {
                "key" : "drawings",
                "navkey" : "dessins",
                "view" : "inc/content/drawings.html",
            },
            {
                "key" : "engravings",
                "navkey" : "gravures",
                "view" : "inc/content/engravings.html",
            },
            {
                "key" : "persisting",
                "navkey" : "images persistentes",
                "view" : "inc/content/persisting.html",
            }
        ],
    },
    {
        "key" : "about",
        "navkey" : "",
        "View" : "inc/content/about.html",
    }
];
