/**
 * 
 * @author user
 */
function AddComponentContainer(aGetPosition, aDelete, aPlaceElement) {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    var counter = 1;
    var getElPosition = aGetPosition;
    var placeElement = aPlaceElement;
    var deleteCallback = aDelete;
    var elementsList = [];

    form.mcmbElList.displayField = "itemname";
    form.mcmbElList.displayList = elementsList;

    var componentSize = {'width': 0,
        'height': 0};
    form.mdlWidth.data = componentSize;
    form.mdlWidth.field = 'width';
    form.mdlHeight.data = componentSize;
    form.mdlHeight.field = 'height';

    self.show = function () {
        form.show();
    };

    model.requery(function () {
    });

    self.showOnPanel = function (aPanel) {
        aPanel.add(form.view);
    };


    self.addComponentTolist = function (element) {
        elementsList.push(element);
        form.mcmbElList.value = element;
    };

    form.btnAddComponent.onActionPerformed = function (event) {
        var pnlSubject = new P.BorderPane();
        pnlSubject.width = componentSize.width;
        pnlSubject.height = componentSize.height;
        var colorIndex = Math.floor(Math.random() * colorsArray.length);
        pnlSubject.background = new P.Color(colorsArray[colorIndex]);
        var label = new P.Label();
        label.width = 50;
        pnlSubject.add(label);
        pnlSubject.onMousePressed = function (event) {
            componentSize.width = pnlSubject.width;
            componentSize.height = pnlSubject.height;
            form.mcmbElList.value = pnlSubject;
        };
        placeElement(pnlSubject, counter);
        pnlSubject.itemname = pnlSubject.toolTipText;
        if (pnlSubject.itemname) {
            self.addComponentTolist(pnlSubject);
            if (!label.text) {
                label.text = "Click to select";
            }
            counter += 1;
        }
    };

    self.delete = function(event){
        deleteCallback(form.mcmbElList.value);
        elementsList.splice(elementsList.indexOf(form.mcmbElList.value), 1);
        form.mcmbElList.value = elementsList[0];
    };

    self.deleteAll= function(event){
        elementsList =[];
        form.mcmbElList.displayList = elementsList;
        form.mcmbElList.data = elementsList;
    };

    form.btnDelete.onActionPerformed = self.delete;
    

    form.mdlHeight.onValueChange = function (event) {
        if (form.mcmbElList.value) {
            form.mcmbElList.value.height = componentSize.height;
        }
    };

    form.mdlWidth.onValueChange = function (event) {
        if (form.mcmbElList.value) {
            form.mcmbElList.value.width = componentSize.width;
        }
    };

    form.mcmbElList.onValueChange = function (event) {
        if (form.mcmbElList.value) {
            if (form.mcmbElList.value.height) {
                componentSize.height = form.mcmbElList.value.height;
            }
            if (form.mcmbElList.value.width) {
                componentSize.width = form.mcmbElList.value.width;
            }
            getElPosition(form.mcmbElList.value);
//            getElement(form.modelCombo.value);
        }
    };



}
