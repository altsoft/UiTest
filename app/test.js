/**
 * 
 * @author jskonst
 */
function test() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    self.show = function () {
        form.show();
    };
    
    model.requery(/*function(){}*/);
    
    // TODO : place your code here
    form.button.onActionPerformed = function(event) {
        var anotherForm = new textFieldForm();
        form.panel.add(anotherForm.getView());
    };
}
