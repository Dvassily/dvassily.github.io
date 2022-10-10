{
    // Navtable
    function NavTable(element, data, target) {
        this.element = element;

        //TODO: check attr exists
        this.rowCount = element.data('navtable-rows');
        this.colCount = element.data('navtable-cols');
        this.data = data;
        this.target = target;
        this.init();
    }

    NavTable.prototype.fetchData = function(key) {
        return this.data.find(entry => entry.key == key);
    }

    NavTable.prototype.init = function() {
        let previousRow = undefined;

        for (let i = 0; i < this.rowCount; ++i) {
            let row = this.element.children("[data-navtable-rowindex='"+ i +"']");

            if (row.length === 0) {
                row = $('<div>')
                    .data('navtable-rowindex', i);

                if (previousRow === undefined) {
                    this.element.prepend(row);
                } else {
                    row.insertAfter(previousRow);
                }
            }

            let previousCell = undefined;

            for (let j = 0; j < this.colCount; ++j) {
                let cell = row.children("[data-navtable-colindex='"+ j +"']");

                if (cell.length === 0) {
                    cell = $('<div>')
                        .data('navtable-colindex', j);

                    if (previousCell === undefined) {
                        row.prepend(cell);
                    } else {
                        cell.insertAfter(previousCell);
                    }
                } else {
                    //TODO: check data provided
                    let data = this.fetchData(cell.data('navtable-key'));

                    if (data !== undefined) {
                        this.initCell(cell, i, j, data);
                    }
                }

                previousCell = cell;
            }

            previousRow = row;
        }
    }

    NavTable.prototype.initCell = function(cell, row, col, data) {
        cell.data('navigation-target', this.target + "/" + data.key);

        let image = $("<img>")
            .attr("class", "navtable-cell-preview")
            .attr("src", data.preview)
            .attr("alt", "preview_" + data.key);

        let title = $('<div>')
            .attr('class', 'navtable-cell-title')
            .text(data.title)

        cell.append(image)
            .append(title);

        addNavigationHandler(cell);
    }


    function parseTarget(targetKey) {
        const rootIndex = 0;
        const categoryIndex = 1;
        const subcategoryIndex = 2;
        const workIndex = 3;

        let item = $(this);
        let targetParts = targetKey.split("/");
        let targetRoot = undefined;
        let targetCategory = undefined;
        let targetSubcategory = undefined;
        let targetWork = undefined;

        if (targetParts.length >= 1) {
            targetRoot = targetParts[rootIndex];

            if (targetParts.length >= 2) {
                targetCategory = targetParts[categoryIndex];

                if (targetParts.length >= 3) {
                    targetSubcategory = targetParts[subcategoryIndex];

                    if (targetParts.length === 4) {
                        targetWork = targetParts[workIndex];
                    }
                }
            }
        }

        return {
            "root" : targetRoot,
            "category" : targetCategory,
            "subcategory" : targetSubcategory,
            "work" : targetWork
        }
    }

    function updateNavtree(element, target, navKey, isCurrentTarget) {
        element.removeClass('navtree-current');

        if (navKey) {
            element.text(navKey);

            if (isCurrentTarget) {
                element.addClass('navtree-current');
            } else {
                element.attr("data-navigation-target", target);
            }

            element.show();
        } else {
            element.text("");
            element.attr("data-navigation-target", "");
            element.hide();
        }
    }

    function findTarget(target, container, foundCallback) {
        let result = container.find(subtarget => subtarget.key == target);

        if (result !== undefined) {
            foundCallback(result);
        }
    }

    function loadTarget(navIndex) {
        let targetKey = undefined;
        let target = undefined;
        let rootNavKey = undefined;
        let categoryNavKey = undefined;
        let subcategoryNavKey = undefined;
        let workNavKey = undefined;

        findTarget(navIndex.root, targets, (targetObj) => {
            target = targetObj;
            targetKey = navIndex.root;
            rootNavKey = target.navkey;

            findTarget(navIndex.category, target.content, (targetObj) => {
                target = targetObj;
                targetKey = navIndex.category;
                categoryNavKey = target.navkey;

                findTarget(navIndex.subcategory, target.content, (targetObj) => {
                    target = targetObj;
                    targetKey = navIndex.subcategory;
                    subcategoryNavKey = target.navkey;

                    findTarget(navIndex.work, target.content, (targetObj) => {
                        target = targetObj;
                        targetKey = navIndex.work;
                        workNavKey = target.navkey;
                    });
                });
            });
        });

        let content = $("#content");
        let navbar = $("nav");
        let navtree = $("#navtree");

        content.load(target.view, function(response, status, xhr) {
            if ("init" in target) {
                target.init();
            }

            if ("shownavbar" in target && target.shownavbar) {
                navbar.show();
            } else {
                navbar.hide();
            }

            let navtreeRoot = navtree.children("#navtree-root");
            let navtreeCategory = navtree.children("#navtree-category");
            let navtreeSubcategory = navtree.children("#navtree-subcategory");
            let navtreeWork = navtree.children("#navtree-work");

            updateNavtree(navtreeRoot, navIndex.root, rootNavKey, navIndex.root == targetKey);
            updateNavtree(navtreeCategory, navIndex.root + "/" + navIndex.category, categoryNavKey, navIndex.category == targetKey);
            updateNavtree(navtreeSubcategory, navIndex.root + "/" + navIndex.category + "/" + navIndex.subcategory, subcategoryNavKey, navIndex.subcategory == targetKey);
            updateNavtree(navtreeWork, navIndex.root + "/" + navIndex.category + "/" + navIndex.subcategory + "/" + navIndex.work, workNavKey, navIndex.work == targetKey);
        });
    }

    function addNavigationHandler(element) {
        element.click(function() {
            let targetKey = element.data("navigation-target");
            let target = parseTarget(targetKey);

            loadTarget(target);
        });
    }


    $(document).ready(function() {
        $("[data-navigation-target]").each(function() {
            addNavigationHandler($(this));
        });

        $("#navtree > span").each(function() {
            $(this).hide();

            addNavigationHandler($(this));
        });

        const defaultTarget = "home";
        let target = parseTarget(defaultTarget);

        loadTarget(target);
    });
}
