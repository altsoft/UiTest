/**
 * 
 * @author jskonst
 */
function TextFieldForm(aDemoComponent) {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    var demoComponent = aDemoComponent;

    function initWidget() {
        form.txtText.text = demoComponent.text;
        demoComponent.emptyText = form.txtEmptyText.text;
    }

    self.setDemoComponent = function (aDemoComponent) {
        demoComponent = aDemoComponent;
        demoComponent.onActionPerformed = demoOnActionPerformed;
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

    function demoOnActionPerformed () {
        form.txtText.text = demoComponent.text;
    };
    
    if (demoComponent) {
        demoComponent.onActionPerformed = demoOnActionPerformed;
        demoComponent.onValueChange = demoOnActionPerformed;
    }
    
    form.txtEmptyText.onActionPerformed = function (event) {
        demoComponent.emptyText = form.txtEmptyText.text;
    };


}
