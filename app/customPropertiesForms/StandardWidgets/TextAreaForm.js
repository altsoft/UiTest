/**
 * 
 * @author jskonst
 */
function TextAreaForm(aDemoComponent) {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    var demoComponent = new P.TextArea("Text Area");
    demoComponent.height = 80;
    demoComponent.width = 800;

    function initWidget() {
        form.txtText.text = demoComponent.text;
        demoComponent.emptyText = form.txtEmptyText.text;
    }

    self.getDemoComponent = function () {
        return demoComponent;
    };

    self.getViewComponent = function () {
        return demoComponent;
    };

    self.show = function () {
        form.show();
    };

    self.showOnPanel = function (aPanel) {
        initWidget();
        aPanel.add(form.view);
    };

    form.txtText.onActionPerformed = function () {
        demoComponent.text = form.txtText.text;
    };

    demoComponent.onValueChange = function () {
        form.txtText.text = demoComponent.text;
    };
    
    demoComponent.demoOnActionPerformed = demoComponent.onValueChange;

    form.txtEmptyText.onActionPerformed = function (event) {
        demoComponent.emptyText = form.txtEmptyText.text;
    };


}